import React, { useState, useEffect, useCallback } from 'react';
import { Head } from '@inertiajs/react';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  addedAt: string;
}

function getCsrfToken(): string {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
}

export default function AdminMedia() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchMedia = useCallback(async () => {
    try {
      const res = await fetch('/user/cms/api/media');
      setMedia(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchMedia(); }, [fetchMedia]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('name', file.name);
      const res = await fetch('/user/cms/api/media/store', {
        method: 'POST',
        headers: { 'X-CSRF-TOKEN': getCsrfToken() },
        body: fd,
      });
      if (!res.ok) throw new Error('Erro no upload');
      await fetchMedia();
    } catch (e: any) { alert(e.message); }
    setUploading(false);
    e.target.value = '';
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir imagem?')) return;
    try {
      await fetch('/user/cms/api/media/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
        body: JSON.stringify({ id: Number(id) }),
      });
      await fetchMedia();
    } catch (e: any) { alert(e.message); }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copiada!');
  };

  const filtered = media.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Head title="Mídia" />
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
          <input
            type="text" placeholder="Buscar mídia..." value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, maxWidth: 300, padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13 }}
          />
          <label style={{ padding: '8px 20px', background: '#0f172a', color: '#fff', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
            {uploading ? 'Enviando...' : '+ Upload'}
            <input type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
          </label>
        </div>

        {loading ? (
          <p style={{ color: '#999' }}>Carregando...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: '#999' }}>Nenhuma mídia encontrada.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {filtered.map(m => (
              <div key={m.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
                <div style={{ height: 140, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {m.url ? (
                    <img src={m.url} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ color: '#999', fontSize: 12 }}>Sem preview</span>
                  )}
                </div>
                <div style={{ padding: 8 }}>
                  <p style={{ fontSize: 12, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.name}</p>
                  <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                    <button onClick={() => copyUrl(m.url)} style={{ fontSize: 11, padding: '2px 8px', background: '#e5e7eb', borderRadius: 4, border: 'none', cursor: 'pointer' }}>
                      Copiar URL
                    </button>
                    <button onClick={() => handleDelete(m.id)} style={{ fontSize: 11, padding: '2px 8px', background: '#fecaca', color: '#dc2626', borderRadius: 4, border: 'none', cursor: 'pointer' }}>
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
