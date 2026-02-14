import React, { useState, useEffect, useCallback } from 'react';
import { Head } from '@inertiajs/react';

interface MenuItem {
  id: string;
  label: string;
  url: string;
  type: string;
}

function getCsrfToken(): string {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
}

let nextId = 100;

export default function AdminMenus() {
  const [headerMenu, setHeaderMenu] = useState<MenuItem[]>([]);
  const [footerMenu, setFooterMenu] = useState<MenuItem[]>([]);
  const [activeTab, setActiveTab] = useState<'header' | 'footer'>('header');
  const [loading, setLoading] = useState(true);

  const fetchMenus = useCallback(async () => {
    try {
      const res = await fetch('/user/cms/api/menus');
      const data = await res.json();
      setHeaderMenu(data.header || []);
      setFooterMenu(data.footer || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchMenus(); }, [fetchMenus]);

  const save = async () => {
    try {
      const res = await fetch('/user/cms/api/menus/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
        body: JSON.stringify({ header: headerMenu, footer: footerMenu }),
      });
      if (!res.ok) throw new Error('Erro ao salvar');
      alert('Menus salvos!');
    } catch (e: any) { alert(e.message); }
  };

  const menu = activeTab === 'header' ? headerMenu : footerMenu;
  const setMenu = activeTab === 'header' ? setHeaderMenu : setFooterMenu;

  const addItem = () => {
    setMenu([...menu, { id: `new-${nextId++}`, label: '', url: '', type: 'link' }]);
  };

  const updateItem = (idx: number, field: string, value: string) => {
    setMenu(menu.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  };

  const removeItem = (idx: number) => {
    setMenu(menu.filter((_, i) => i !== idx));
  };

  return (
    <>
      <Head title="Menus" />
      <div style={{ padding: 24, maxWidth: 700 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {(['header', 'footer'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 20px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13,
                background: activeTab === tab ? '#0f172a' : '#e5e7eb',
                color: activeTab === tab ? '#fff' : '#374151',
              }}
            >
              {tab === 'header' ? 'Menu Principal' : 'Menu Rodapé'}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: '#999' }}>Carregando...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {menu.map((item, idx) => (
              <div key={item.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  type="text" placeholder="Label" value={item.label}
                  onChange={e => updateItem(idx, 'label', e.target.value)}
                  style={{ flex: 1, padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13 }}
                />
                <input
                  type="text" placeholder="URL" value={item.url}
                  onChange={e => updateItem(idx, 'url', e.target.value)}
                  style={{ flex: 1, padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13 }}
                />
                <select
                  value={item.type}
                  onChange={e => updateItem(idx, 'type', e.target.value)}
                  style={{ padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13 }}
                >
                  <option value="link">Link</option>
                  <option value="category">Categoria</option>
                  <option value="page">Página</option>
                  <option value="custom">Custom</option>
                </select>
                <button
                  onClick={() => removeItem(idx)}
                  style={{ padding: '6px 10px', background: '#ef4444', color: '#fff', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13 }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
          <button onClick={addItem} style={{ padding: '8px 20px', background: '#e5e7eb', color: '#374151', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13 }}>
            + Adicionar Item
          </button>
          <button onClick={save} style={{ padding: '8px 20px', background: '#0f172a', color: '#fff', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13 }}>
            Salvar Menus
          </button>
        </div>
      </div>
    </>
  );
}
