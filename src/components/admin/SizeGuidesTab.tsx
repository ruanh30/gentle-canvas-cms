import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Search, ChevronLeft, Trash2, Save, Star, Pencil, X, Grid3X3, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockSizeGuides } from '@/data/mock';
import type { SizeGuide } from '@/types';
import SecureFileUpload from '@/components/admin/SecureFileUpload';

export default function SizeGuidesTab() {
  const [guides, setGuides] = useState<SizeGuide[]>(mockSizeGuides);
  const [editing, setEditing] = useState<SizeGuide | null>(null);
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<SizeGuide | null>(null);

  const filtered = guides.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

  if (editing) {
    return (
      <SizeGuideForm
        guide={editing}
        allGuides={guides}
        onSave={g => {
          setGuides(prev => prev.find(x => x.id === g.id) ? prev.map(x => x.id === g.id ? g : x) : [...prev, g]);
          setEditing(null);
          toast({ title: 'Tabela salva', description: `"${g.name}" foi salva com sucesso.` });
        }}
        onBack={() => setEditing(null)}
        onDelete={guides.find(x => x.id === editing.id) ? () => setConfirmDelete(editing) : undefined}
        onSetDefault={id => {
          setGuides(prev => prev.map(g => ({ ...g, isDefault: g.id === id })));
        }}
      />
    );
  }

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filtered.length} tabela(s) de medidas</p>
        <Button onClick={() => setEditing({
          id: `sg-${Date.now()}`, name: '', columns: ['Busto (cm)', 'Cintura (cm)', 'Quadril (cm)'],
          rows: [
            { label: 'P', values: ['', '', ''] },
            { label: 'M', values: ['', '', ''] },
            { label: 'G', values: ['', '', ''] },
          ],
          isDefault: guides.length === 0,
          createdAt: new Date().toISOString(),
        })} className="gap-2">
          <Plus className="h-4 w-4" /> Nova Tabela
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar tabela..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card divide-y divide-border">
        {filtered.map(g => (
          <button
            key={g.id}
            onClick={() => setEditing(g)}
            className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-muted/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-muted grid place-items-center shrink-0">
              <Grid3X3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground truncate">{g.name}</p>
                {g.isDefault && (
                  <Badge variant="secondary" className="text-[10px] gap-0.5 h-5">
                    <Star className="h-2.5 w-2.5 fill-current" /> Padrão
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {g.columns.length} colunas · {g.rows.length} tamanhos
                {g.image && ' · Com imagem'}
              </p>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-muted-foreground">Nenhuma tabela encontrada.</div>
        )}
      </div>

      <AlertDialog open={!!confirmDelete} onOpenChange={o => { if (!o) setConfirmDelete(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir tabela de medidas</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir "{confirmDelete?.name}"? Produtos vinculados perderão a referência.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => {
              if (confirmDelete) {
                setGuides(prev => prev.filter(x => x.id !== confirmDelete.id));
                setEditing(null);
                toast({ title: 'Tabela excluída', description: `"${confirmDelete.name}" foi removida.` });
                setConfirmDelete(null);
              }
            }}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Size Guide Form                                                    */
/* ------------------------------------------------------------------ */

function SizeGuideForm({ guide, allGuides, onSave, onBack, onDelete, onSetDefault }: {
  guide: SizeGuide; allGuides: SizeGuide[];
  onSave: (g: SizeGuide) => void; onBack: () => void;
  onDelete?: () => void; onSetDefault: (id: string) => void;
}) {
  const [form, setForm] = useState(guide);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const addColumn = () => {
    setForm(prev => ({
      ...prev,
      columns: [...prev.columns, `Coluna ${prev.columns.length + 1}`],
      rows: prev.rows.map(r => ({ ...r, values: [...r.values, ''] })),
    }));
  };

  const removeColumn = (idx: number) => {
    if (form.columns.length <= 1) return;
    setForm(prev => ({
      ...prev,
      columns: prev.columns.filter((_, i) => i !== idx),
      rows: prev.rows.map(r => ({ ...r, values: r.values.filter((_, i) => i !== idx) })),
    }));
  };

  const updateColumn = (idx: number, val: string) => {
    setForm(prev => ({
      ...prev,
      columns: prev.columns.map((c, i) => i === idx ? val : c),
    }));
  };

  const addRow = () => {
    setForm(prev => ({
      ...prev,
      rows: [...prev.rows, { label: '', values: new Array(prev.columns.length).fill('') }],
    }));
  };

  const removeRow = (idx: number) => {
    setForm(prev => ({
      ...prev,
      rows: prev.rows.filter((_, i) => i !== idx),
    }));
  };

  const updateRowLabel = (idx: number, val: string) => {
    setForm(prev => ({
      ...prev,
      rows: prev.rows.map((r, i) => i === idx ? { ...r, label: val } : r),
    }));
  };

  const updateCell = (rowIdx: number, colIdx: number, val: string) => {
    setForm(prev => ({
      ...prev,
      rows: prev.rows.map((r, ri) =>
        ri === rowIdx ? { ...r, values: r.values.map((v, ci) => ci === colIdx ? val : v) } : r
      ),
    }));
  };

  return (
    <div className="pt-2">
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          {form.name || 'Nova Tabela'}
        </button>
        <div className="flex items-center gap-2">
          {!form.isDefault && (
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => {
              onSetDefault(form.id);
              setForm(prev => ({ ...prev, isDefault: true }));
              toast({ title: 'Tabela padrão definida', description: `"${form.name}" agora é a tabela padrão.` });
            }}>
              <Star className="h-3.5 w-3.5" /> Definir como Padrão
            </Button>
          )}
          {onDelete && (
            <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive" onClick={() => setConfirmDelete(true)}>
              <Trash2 className="h-3.5 w-3.5" /> Excluir
            </Button>
          )}
          <Button onClick={() => {
            if (!form.name.trim()) {
              toast({ title: 'Nome obrigatório', description: 'Insira um nome para a tabela de medidas.', variant: 'destructive' });
              return;
            }
            onSave(form);
          }} className="gap-2">
            <Save className="h-4 w-4" /> Salvar
          </Button>
        </div>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-foreground">Nome da tabela</label>
          <Input className="mt-1.5 max-w-sm" placeholder="Ex: Roupas Femininas" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>

        {form.isDefault && (
          <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-lg px-4 py-2.5">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <p className="text-sm text-foreground">Esta é a tabela padrão. Produtos com "Usar padrão" exibirão esta tabela.</p>
          </div>
        )}

        {/* Table editor */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-foreground flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" /> Tabela de medidas
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1 text-xs" onClick={addColumn}>
                <Plus className="h-3 w-3" /> Coluna
              </Button>
              <Button variant="outline" size="sm" className="gap-1 text-xs" onClick={addRow}>
                <Plus className="h-3 w-3" /> Linha
              </Button>
            </div>
          </div>

          <div className="border border-border rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-3 py-2 text-left text-xs font-semibold text-foreground border-r border-border w-24">
                    Tamanho
                  </th>
                  {form.columns.map((col, ci) => (
                    <th key={ci} className="px-1 py-1 text-center border-r border-border last:border-r-0 min-w-[100px]">
                      <div className="flex items-center gap-1">
                        <Input
                          className="h-7 text-xs text-center font-medium border-0 bg-transparent focus:bg-background"
                          value={col}
                          onChange={e => updateColumn(ci, e.target.value)}
                        />
                        {form.columns.length > 1 && (
                          <button onClick={() => removeColumn(ci)} className="shrink-0 p-0.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {form.rows.map((row, ri) => (
                  <tr key={ri} className="hover:bg-muted/20">
                    <td className="px-1 py-1 border-r border-border">
                      <Input
                        className="h-7 text-xs font-semibold border-0 bg-transparent focus:bg-background"
                        value={row.label}
                        onChange={e => updateRowLabel(ri, e.target.value)}
                        placeholder="Ex: M"
                      />
                    </td>
                    {row.values.map((val, ci) => (
                      <td key={ci} className="px-1 py-1 border-r border-border last:border-r-0">
                        <Input
                          className="h-7 text-xs text-center border-0 bg-transparent focus:bg-background"
                          value={val}
                          onChange={e => updateCell(ri, ci, e.target.value)}
                          placeholder="—"
                        />
                      </td>
                    ))}
                    <td className="px-1">
                      <button onClick={() => removeRow(ri)} className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                        <X className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Image fallback */}
        <div>
          <p className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
            <ImageIcon className="h-4 w-4" /> Imagem alternativa <span className="text-xs text-muted-foreground font-normal">(opcional)</span>
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            Se preferir, faça upload de uma imagem pronta da tabela. A tabela editável tem prioridade quando ambas existem.
          </p>
          {form.image ? (
            <div className="relative w-fit">
              <img src={form.image} alt="Tabela de medidas" className="max-w-md rounded-lg border border-border" />
              <button
                onClick={() => setForm({ ...form, image: undefined })}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground grid place-items-center"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <SecureFileUpload
              accept="image/jpeg,image/png,image/webp"
              onFileAccepted={(dataUrl) => setForm({ ...form, image: dataUrl })}
              compact
            />
          )}
        </div>
      </div>

      {onDelete && (
        <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir tabela</AlertDialogTitle>
              <AlertDialogDescription>Tem certeza que deseja excluir "{form.name}"?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={onDelete}>
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
