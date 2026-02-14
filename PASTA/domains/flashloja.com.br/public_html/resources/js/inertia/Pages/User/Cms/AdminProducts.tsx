import React, { useState, useEffect, useCallback } from 'react';
import { Head } from '@inertiajs/react';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  stock: number;
  sku: string;
  categoryId: string;
  active: boolean;
  featured: boolean;
  images: string[];
}

interface Category {
  id: number;
  name: string;
}

type PanelSection = 'info' | 'pricing' | 'inventory' | 'status';

const panelSections: { id: PanelSection; label: string }[] = [
  { id: 'info', label: 'Informações' },
  { id: 'pricing', label: 'Preço' },
  { id: 'inventory', label: 'Estoque' },
  { id: 'status', label: 'Status' },
];

function getCsrfToken(): string {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [activePanel, setActivePanel] = useState<PanelSection>('info');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '', sku: '', description: '', price: 0, compareAtPrice: 0,
    stock: 0, categoryId: '', active: true, featured: false,
  });

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch('/user/cms/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch('/user/cms/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => { fetchProducts(); fetchCategories(); }, [fetchProducts, fetchCategories]);

  const selectProduct = (p: Product) => {
    setSelected(p);
    setForm({
      name: p.name, sku: p.sku, description: p.description,
      price: p.price, compareAtPrice: p.compareAtPrice || 0,
      stock: p.stock, categoryId: p.categoryId, active: p.active, featured: p.featured,
    });
    setActivePanel('info');
  };

  const handleSave = async () => {
    const body: any = { ...form, price: Number(form.price), compareAtPrice: Number(form.compareAtPrice) || null, stock: Number(form.stock), categoryId: Number(form.categoryId) || null };
    const url = selected ? '/user/cms/api/products/update' : '/user/cms/api/products/store';
    if (selected) body.id = Number(selected.id);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Erro ao salvar');
      await fetchProducts();
      if (!selected) { setForm({ name: '', sku: '', description: '', price: 0, compareAtPrice: 0, stock: 0, categoryId: '', active: true, featured: false }); }
    } catch (e: any) { alert(e.message); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir produto?')) return;
    try {
      await fetch('/user/cms/api/products/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
        body: JSON.stringify({ id: Number(id) }),
      });
      await fetchProducts();
      if (selected?.id === id) setSelected(null);
    } catch (e: any) { alert(e.message); }
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Head title="Produtos" />
      <div style={{ display: 'flex', height: 'calc(100vh - 120px)', gap: 0 }}>
        {/* Col 1: Lista */}
        <div style={{ width: 280, borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ padding: 12, borderBottom: '1px solid #e5e7eb' }}>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13 }}
            />
          </div>
          <div style={{ padding: 8 }}>
            <button
              onClick={() => { setSelected(null); setForm({ name: '', sku: '', description: '', price: 0, compareAtPrice: 0, stock: 0, categoryId: '', active: true, featured: false }); }}
              style={{ width: '100%', padding: '8px 12px', background: '#0f172a', color: '#fff', borderRadius: 6, border: 'none', fontSize: 13, cursor: 'pointer' }}
            >
              + Novo Produto
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {loading && <p style={{ padding: 12, color: '#999', fontSize: 13 }}>Carregando...</p>}
            {filtered.map(p => (
              <div
                key={p.id}
                onClick={() => selectProduct(p)}
                style={{
                  padding: '10px 12px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6',
                  background: selected?.id === p.id ? '#f1f5f9' : 'transparent',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>R$ {p.price.toFixed(2)} · SKU: {p.sku}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Seções */}
        <div style={{ width: 160, borderRight: '1px solid #e5e7eb', padding: 8, background: '#fafafa' }}>
          {panelSections.map(s => (
            <button
              key={s.id}
              onClick={() => setActivePanel(s.id)}
              style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px',
                borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, marginBottom: 4,
                background: activePanel === s.id ? '#0f172a' : 'transparent',
                color: activePanel === s.id ? '#fff' : '#374151',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Col 3: Formulário */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: '#fff' }}>
          <div style={{ maxWidth: 600 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
              {selected ? `Editar: ${selected.name}` : 'Novo Produto'}
            </h2>

            {activePanel === 'info' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <label style={{ fontSize: 13 }}>
                  Nome
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                </label>
                <label style={{ fontSize: 13 }}>
                  SKU
                  <input type="text" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} style={inputStyle} />
                </label>
                <label style={{ fontSize: 13 }}>
                  Descrição
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                </label>
                <label style={{ fontSize: 13 }}>
                  Categoria
                  <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} style={inputStyle}>
                    <option value="">Sem categoria</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </label>
              </div>
            )}

            {activePanel === 'pricing' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <label style={{ fontSize: 13 }}>
                  Preço (R$)
                  <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                </label>
                <label style={{ fontSize: 13 }}>
                  Preço anterior (R$)
                  <input type="number" step="0.01" value={form.compareAtPrice} onChange={e => setForm({ ...form, compareAtPrice: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                </label>
              </div>
            )}

            {activePanel === 'inventory' && (
              <label style={{ fontSize: 13 }}>
                Estoque
                <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: parseInt(e.target.value) || 0 })} style={inputStyle} />
              </label>
            )}

            {activePanel === 'status' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <label style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                  Ativo
                </label>
                <label style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                  Destaque
                </label>
              </div>
            )}

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
