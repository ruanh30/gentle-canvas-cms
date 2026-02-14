import React, { useState, useEffect, useCallback } from 'react';
import { Head } from '@inertiajs/react';

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  status: number;
}

function getCsrfToken(): string {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', slug: '', image: '', status: true });

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch('/user/cms/api/categories');
      setCategories(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const selectCategory = (c: Category) => {
    setSelected(c);
    setForm({ name: c.name, slug: c.slug, image: c.image || '', status: c.status === 1 });
  };

  const handleSave = async () => {
    const url = selected ? '/user/cms/api/categories/update' : '/user/cms/api/categories/store';
    const body: any = { ...form, status: form.status ? 1 : 0 };
    if (selected) body.id = selected.id;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Erro ao salvar');
      await fetchCategories();
      if (!selected) setForm({ name: '', slug: '', image: '', status: true });
    } catch (e: any) { alert(e.message); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Excluir categoria?')) return;
    try {
      await fetch('/user/cms/api/categories/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
        body: JSON.stringify({ id }),
      });
      await fetchCategories();
      if (selected?.id === id) setSelected(null);
    } catch (e: any) { alert(e.message); }
  };

  const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Head title="Categorias" />
      <div style={{ display: 'flex', height: 'calc(100vh - 120px)', gap: 0 }}>
        {/* Lista */}
        <div style={{ width: 280, borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ padding: 12, borderBottom: '1px solid #e5e7eb' }}>
            <input
              type="text" placeholder="Buscar categorias..." value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13 }}
            />
          </div>
          <div style={{ padding: 8 }}>
            <button
              onClick={() => { setSelected(null); setForm({ name: '', slug: '', image: '', status: true }); }}
              style={{ width: '100%', padding: '8px 12px', background: '#0f172a', color: '#fff', borderRadius: 6, border: 'none', fontSize: 13, cursor: 'pointer' }}
            >
              + Nova Categoria
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {loading && <p style={{ padding: 12, color: '#999', fontSize: 13 }}>Carregando...</p>}
            {filtered.map(c => (
              <div
                key={c.id} onClick={() => selectCategory(c)}
                style={{ padding: '10px 12px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6', background: selected?.id === c.id ? '#f1f5f9' : 'transparent' }}
              >
                <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>/{c.slug}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulário */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: '#fff' }}>
          <div style={{ maxWidth: 500 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
              {selected ? `Editar: ${selected.name}` : 'Nova Categoria'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <label style={{ fontSize: 13 }}>
                Nome
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
              </label>
              <label style={{ fontSize: 13 }}>
                Slug
                <input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="auto-gerado" style={inputStyle} />
              </label>
              <label style={{ fontSize: 13 }}>
                Imagem URL
                <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} style={inputStyle} />
              </label>
              <label style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" checked={form.status} onChange={e => setForm({ ...form, status: e.target.checked })} />
                Ativa
              </label>
            </div>
            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              <button onClick={handleSave} style={{ padding: '8px 20px', background: '#0f172a', color: '#fff', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13 }}>
                Salvar
              </button>
              {selected && (
                <button onClick={() => handleDelete(selected.id)} style={{ padding: '8px 20px', background: '#ef4444', color: '#fff', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13 }}>
                  Excluir
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  display: 'block', width: '100%', marginTop: 4, padding: '6px 10px',
  border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13,
};
