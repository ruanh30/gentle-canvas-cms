import os, json, time, re
import requests
import mysql.connector

DB_HOST=os.environ.get('DB_HOST','127.0.0.1')
DB_PORT=int(os.environ.get('DB_PORT','3306'))
DB_NAME=os.environ['DB_NAME']
DB_USER=os.environ['DB_USER']
DB_PASS=os.environ['DB_PASS']
DEEPL_KEY=os.environ['DEEPL_KEY']
DEEPL_URL='https://api-free.deepl.com/v2/translate'

KEEP_VALUES=set([
 'Flutterwave','Razorpay','Paytm','Paystack','Instamojo','Stripe','Paypal','Mollie','Mercadopago','Authorize.net',
 'Midtrans','Iyzico','Toyyibpay','Phonepe','Yoco','Xendit','Myfatoorah','Paytabs','Perfect money','SKU','OFF','OR','USD','BRL','R$'
])

PLAIN_OVERRIDES={
 'Cart':'Carrinho',
 'Wishlist':'Lista de desejos',
 'Compare':'Comparar',
 'Dashboard':'Painel',
 'Home':'Início',
 'Shop':'Loja',
 'Pages':'Páginas',
 'Search':'Pesquisar',
}

session=requests.Session()
headers={'Authorization': f'DeepL-Auth-Key {DEEPL_KEY}'}


def deepl_translate(texts, html=False):
    if not texts:
        return []
    payload=[('target_lang','PT-BR')]
    if html:
        payload.append(('tag_handling','html'))
    for t in texts:
        payload.append(('text', t))
    r=session.post(DEEPL_URL, headers=headers, data=payload, timeout=90)
    r.raise_for_status()
    j=r.json()
    return [tr['text'] for tr in j.get('translations',[])]


def connect():
    return mysql.connector.connect(
        host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASS, database=DB_NAME,
        charset='utf8mb4', use_unicode=True
    )


def fetchall(cur, q, params=None):
    cur.execute(q, params or ())
    return cur.fetchall()


def execq(cur, q, params=None):
    cur.execute(q, params or ())


def translate_keywords(en_json, pt_json):
    # en_json, pt_json: dict
    keys=list(en_json.keys())
    src_texts=[]
    out_keys=[]
    for k in keys:
        en_val=en_json.get(k)
        if en_val is None:
            continue
        pt_val=pt_json.get(k)
        # preserve existing pt that differs from en and seems non-empty
        if pt_val and pt_val.strip() and pt_val != en_val:
            continue
        if en_val in KEEP_VALUES or (isinstance(en_val,str) and en_val.strip() in KEEP_VALUES):
            pt_json[k]=en_val
            continue
        if not isinstance(en_val,str) or not en_val.strip():
            pt_json[k]=en_val
            continue
        src_texts.append(en_val)
        out_keys.append(k)

    BATCH=40
    for i in range(0,len(src_texts),BATCH):
        batch=src_texts[i:i+BATCH]
        outs=deepl_translate(batch, html=False)
        for k, out in zip(out_keys[i:i+BATCH], outs):
            pt_json[k]=out
        time.sleep(0.2)

    # force overrides
    for k,v in PLAIN_OVERRIDES.items():
        if k in pt_json:
            pt_json[k]=v
    return pt_json


def translate_table_columns(cur, table, user_id, src_lang_id, tgt_lang_id, key_cols, text_cols, html_cols=()):
    # key_cols: list of columns used to match rows across languages (e.g., ['page_id'] or ['id'] not used)
    # We'll build mapping from src rows by key tuple -> row
    kc=', '.join(key_cols)
    cols=key_cols + list(set(text_cols) | set(html_cols))
    colsel=', '.join(cols)

    src_rows=fetchall(cur, f"SELECT {colsel} FROM {table} WHERE user_id=%s AND language_id=%s", (user_id, src_lang_id))
    if not src_rows:
        return 0
    tgt_rows=fetchall(cur, f"SELECT {colsel} FROM {table} WHERE user_id=%s AND language_id=%s", (user_id, tgt_lang_id))

    def key_of(row):
        return tuple(row[i] for i in range(len(key_cols)))

    src_map={key_of(r): r for r in src_rows}
    updated=0

    # Build update list for target rows existing
    for tr in tgt_rows:
        k=key_of(tr)
        sr=src_map.get(k)
        if not sr:
            continue
        # indexes
        row_changed=False
        updates={}
        # plain columns
        for col in text_cols:
            ti=cols.index(col)
            val=tr[ti]
            src_val=sr[ti]
            if (val is None or str(val).strip()=='' or val==src_val) and src_val and str(src_val).strip():
                updates[col]=('PLAIN', str(src_val))
        for col in html_cols:
            ti=cols.index(col)
            val=tr[ti]
            src_val=sr[ti]
            if (val is None or str(val).strip()=='' or val==src_val) and src_val and str(src_val).strip():
                updates[col]=('HTML', str(src_val))

        if not updates:
            continue

        # translate in batches per type
        plain_cols=[c for c,(t,_) in updates.items() if t=='PLAIN']
        html_cols2=[c for c,(t,_) in updates.items() if t=='HTML']

        if plain_cols:
            src_texts=[updates[c][1] for c in plain_cols]
            outs=deepl_translate(src_texts, html=False)
            for c,o in zip(plain_cols, outs):
                updates[c]=('PLAIN_DONE', o)
        if html_cols2:
            src_texts=[updates[c][1] for c in html_cols2]
            outs=deepl_translate(src_texts, html=True)
            for c,o in zip(html_cols2, outs):
                updates[c]=('HTML_DONE', o)

        set_parts=[]
        params=[]
        for c,(t,val2) in updates.items():
            if t.endswith('DONE'):
                set_parts.append(f"{c}=%s")
                params.append(val2)
        if set_parts:
            where_parts=[f"{c}=%s" for c in key_cols] + ["user_id=%s","language_id=%s"]
            params.extend(list(k))
            params.extend([user_id, tgt_lang_id])
            execq(cur, f"UPDATE {table} SET {', '.join(set_parts)} WHERE {' AND '.join(where_parts)}", tuple(params))
            updated += 1
            time.sleep(0.15)

    return updated


def translate_user_menus(cur, user_id, src_lang_id, tgt_lang_id):
    # menus is JSON array of objects
    src=fetchall(cur, "SELECT menus FROM user_menus WHERE user_id=%s AND language_id=%s", (user_id, src_lang_id))
    tgt=fetchall(cur, "SELECT menus FROM user_menus WHERE user_id=%s AND language_id=%s", (user_id, tgt_lang_id))
    if not src or not tgt:
        return 0
    src_json=src[0][0]
    tgt_json=tgt[0][0]
    if not src_json:
        return 0
    try:
        src_arr=json.loads(src_json)
    except Exception:
        return 0
    try:
        tgt_arr=json.loads(tgt_json) if tgt_json else json.loads(src_json)
    except Exception:
        tgt_arr=json.loads(src_json)

    # translate only items where target text/title is missing or equals source
    changed=False
    for i,item in enumerate(src_arr):
        if not isinstance(item, dict):
            continue
        if i >= len(tgt_arr) or not isinstance(tgt_arr[i], dict):
            # align
            while len(tgt_arr) <= i:
                tgt_arr.append({})
            tgt_arr[i] = dict(item)
            changed=True
        for field in ['text','title']:
            s=item.get(field)
            t=tgt_arr[i].get(field)
            if not s or not isinstance(s,str):
                continue
            if t and isinstance(t,str) and t.strip() and t != s:
                continue
            if s in KEEP_VALUES:
                tgt_arr[i][field]=s
                continue
            out=deepl_translate([s], html=False)[0]
            tgt_arr[i][field]=out
            changed=True
            time.sleep(0.1)

    if changed:
        out_json=json.dumps(tgt_arr, ensure_ascii=False, separators=(',',':'))
        execq(cur, "UPDATE user_menus SET menus=%s WHERE user_id=%s AND language_id=%s", (out_json, user_id, tgt_lang_id))
        return 1
    return 0


def main():
    cn=connect()
    cn.autocommit=False
    cur=cn.cursor()

    users=fetchall(cur, "SELECT id,username FROM users ORDER BY id")
    # map lang ids
    langs=fetchall(cur, "SELECT user_id, code, id FROM user_languages")
    lang_map={}
    for user_id, code, lid in langs:
        lang_map.setdefault(user_id,{})[code]=lid

    print(f"users={len(users)}")

    total_kw=0
    total_pages=0
    total_sections=0
    total_headers=0
    total_footers=0
    total_menus=0

    for user_id, username in users:
        lm=lang_map.get(user_id,{})
        pt_id=lm.get('pt-BR')
        if not pt_id:
            # skip, but should not happen
            print(f"user {user_id}: missing pt-BR, skip")
            continue
        en_id=lm.get('en')

        # set pt-BR defaults
        execq(cur, "UPDATE user_languages SET is_default=0, dashboard_default=0 WHERE user_id=%s", (user_id,))
        execq(cur, "UPDATE user_languages SET is_default=1, dashboard_default=1 WHERE user_id=%s AND code='pt-BR'", (user_id,))

        if not en_id:
            cn.commit()
            print(f"user {user_id} ({username}): no en, defaults set")
            continue

        # keywords
        cur.execute("SELECT keywords FROM user_languages WHERE user_id=%s AND code='en'", (user_id,))
        en_kw=cur.fetchone()[0]
        cur.execute("SELECT keywords FROM user_languages WHERE user_id=%s AND code='pt-BR'", (user_id,))
        pt_kw=cur.fetchone()[0]

        try:
            en_json=json.loads(en_kw) if en_kw else {}
        except Exception:
            en_json={}
        try:
            pt_json=json.loads(pt_kw) if pt_kw else {}
        except Exception:
            pt_json={}

        if en_json:
            pt_json=translate_keywords(en_json, pt_json)
            out=json.dumps(pt_json, ensure_ascii=False, separators=(',',':'))
            execq(cur, "UPDATE user_languages SET keywords=%s WHERE user_id=%s AND code='pt-BR'", (out, user_id))
            total_kw += 1

        # translate content tables (preserve existing ptbr)
        total_pages += translate_table_columns(cur, 'user_page_contents', user_id, en_id, pt_id, key_cols=['page_id'], text_cols=['title','slug'], html_cols=['body'])
        total_headers += translate_table_columns(cur, 'user_headers', user_id, en_id, pt_id, key_cols=['id'], text_cols=['header_text','header_middle_text','useful_links_title'], html_cols=['copyright_text'])
        total_footers += translate_table_columns(cur, 'user_footers', user_id, en_id, pt_id, key_cols=['id'], text_cols=['footer_text','useful_links_title','subscriber_title','subscriber_text'], html_cols=['copyright_text'])
        total_sections += translate_table_columns(cur, 'user_sections', user_id, en_id, pt_id, key_cols=['id'], text_cols=[
            'category_section_title','featured_section_title','category_section_subtitle','flash_section_title','flash_section_subtitle',
            'tab_section_title','tab_section_subtitle','bottom_section_title','bottom_section_subtitle','testimonial_section_title','testimonial_section_subtitle',
            'top_selling_product_section_title','top_rated_product_section_title','top_rated_product_section_subtitle','latest_product_section_title',
            'video_section_subtitle','video_section_button_name','video_section_text','features_section_title','call_to_action_section_title',
            'video_section_title','call_to_action_section_text','call_to_action_section_button_text'
        ], html_cols=[])
        total_menus += translate_user_menus(cur, user_id, en_id, pt_id)

        cn.commit()
        print(f"user {user_id} ({username}): translated keywords/content")

    # currencies: set USD->BRL, symbol R$, value 0; set default
    # update any USD occurrences
    execq(cur, "UPDATE user_currencies SET text='BRL' WHERE text='USD'")
    execq(cur, "UPDATE user_currencies SET symbol='R$' WHERE symbol='$' OR symbol='USD' OR symbol='US$'")
    execq(cur, "UPDATE user_currencies SET value=0 WHERE text='BRL'")
    # ensure exactly one default per user: pick min(id)
    users_ids=[u[0] for u in users]
    for uid in users_ids:
        execq(cur, "UPDATE user_currencies SET is_default=0 WHERE user_id=%s", (uid,))
        cur.execute("SELECT id FROM user_currencies WHERE user_id=%s ORDER BY id LIMIT 1", (uid,))
        row=cur.fetchone()
        if row:
            execq(cur, "UPDATE user_currencies SET is_default=1, text='BRL', symbol='R$', value=0 WHERE id=%s", (row[0],))

    cn.commit()

    # delete EN language + EN content rows
    # refresh lang map
    langs=fetchall(cur, "SELECT user_id, code, id FROM user_languages")
    lang_map={}
    for user_id, code, lid in langs:
        lang_map.setdefault(user_id,{})[code]=lid

    for user_id, username in users:
        lm=lang_map.get(user_id,{})
        en_id=lm.get('en')
        if not en_id:
            continue
        # delete per-table rows for en language
        for table in ['user_page_contents','user_headers','user_footers','user_menus','user_sections','user_tabs','user_banners','user_hero_sliders','user_seos','user_contacts','user_blog_categories','user_blog_contents','user_faqs','user_call_to_actions','user_counter_sections','user_counter_information','user_shipping_charges','user_ulinks','labels','user_item_categories','user_item_sub_categories','user_item_contents','user_howit_work_sections','user_additional_sections','user_additional_section_contents','user_product_hero_sliders','user_tabs']:
            try:
                execq(cur, f"DELETE FROM {table} WHERE user_id=%s AND language_id=%s", (user_id, en_id))
            except Exception:
                # table might not exist
                cn.rollback()
                cn.autocommit=True
                cn.autocommit=False
                continue
        # delete language row
        execq(cur, "DELETE FROM user_languages WHERE user_id=%s AND code='en'", (user_id,))
        cn.commit()
        print(f"user {user_id} ({username}): deleted en")

    print('DONE', {
        'users_keywords_translated': total_kw,
        'page_contents_updated': total_pages,
        'headers_updated': total_headers,
        'footers_updated': total_footers,
        'sections_updated': total_sections,
        'menus_updated': total_menus,
    })

if __name__=='__main__':
    main()
