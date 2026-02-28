import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, TextField, OptionPicker, SectionDivider } from '../EditorControls';
import { TrendingUp, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ConversionPanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.conversion ?? {} as any;
  const set = (u: Partial<typeof c>) => updateDraftSection('conversion', u as any);

  const updateDiff = (idx: number, key: string, val: string) => {
    const diffs = [...(c.trustDifferentials || [])];
    diffs[idx] = { ...diffs[idx], [key]: val };
    set({ trustDifferentials: diffs });
  };

  const addDiff = () => {
    set({ trustDifferentials: [...(c.trustDifferentials || []), { icon: 'ShieldCheck', title: 'Novo diferencial', description: 'Descrição' }] });
  };

  const removeDiff = (idx: number) => {
    set({ trustDifferentials: (c.trustDifferentials || []).filter((_: any, i: number) => i !== idx) });
  };

  return (
    <EditorSection icon={TrendingUp} title="Conversão" description="Ferramentas de conversão: WhatsApp no PDP, prova social, avaliações e diferenciais premium">
      <SectionDivider label="WhatsApp na Página do Produto" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Adiciona um botão "Comprar pelo WhatsApp" na página de detalhes do produto.
      </p>
      <ToggleRow label="WhatsApp no PDP" hint="Exibe botão de compra via WhatsApp na página do produto" checked={c.whatsappOnPDP ?? false} onChange={v => set({ whatsappOnPDP: v })} />
      {c.whatsappOnPDP && (
        <>
          <TextField label="Texto do botão" value={c.whatsappPDPText || ''} onChange={v => set({ whatsappPDPText: v })} placeholder="Comprar pelo WhatsApp" />
          <TextField label="Mensagem (use {product})" value={c.whatsappPDPMessage || ''} onChange={v => set({ whatsappPDPMessage: v })} placeholder="Olá! Tenho interesse no produto: {product}" />
        </>
      )}

      <SectionDivider label="Prova Social" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Exibe contadores de atividade para gerar urgência e confiança.
      </p>
      <ToggleRow label="Ativar prova social" hint="Mostra contadores como 'X pessoas estão vendo' ou 'X vendidos'" checked={c.socialProofEnabled ?? false} onChange={v => set({ socialProofEnabled: v })} />
      {c.socialProofEnabled && (
        <>
          <OptionPicker label="Tipo" value={c.socialProofType || 'viewing-now'} onChange={v => set({ socialProofType: v })} options={[
            { value: 'viewing-now', label: 'Vendo agora', description: 'X pessoas estão vendo este produto' },
            { value: 'sold-count', label: 'Vendidos', description: 'X vendidos nas últimas 24h' },
            { value: 'recent-purchase', label: 'Compra recente', description: 'Alguém comprou este produto há X min' },
          ]} />
          <TextField label="Texto (use {count})" value={c.socialProofText || ''} onChange={v => set({ socialProofText: v })} placeholder="{count} pessoas estão vendo agora" />
        </>
      )}

      <SectionDivider label="Avaliações" />
      <ToggleRow label="Ativar avaliações" hint="Exibe sistema de avaliações nos produtos" checked={c.reviewsEnabled ?? false} onChange={v => set({ reviewsEnabled: v })} />
      {c.reviewsEnabled && (
        <OptionPicker label="Estilo" value={c.reviewsStyle || 'stars'} onChange={v => set({ reviewsStyle: v })} options={[
          { value: 'stars', label: 'Estrelas', description: 'Sistema de 1 a 5 estrelas' },
          { value: 'thumbs', label: 'Polegares', description: 'Curtiu / Não curtiu' },
        ]} />
      )}

      <SectionDivider label="Diferenciais Premium" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Blocos de diferencial exibidos na página do produto (ex: Compra Segura, Entrega Rápida).
      </p>
      <ToggleRow label="Exibir diferenciais" hint="Mostra ícones com título e descrição abaixo do botão de compra" checked={c.showTrustDifferentials ?? false} onChange={v => set({ showTrustDifferentials: v })} />
      {c.showTrustDifferentials && (
        <>
          <div className="space-y-2">
            {(c.trustDifferentials || []).map((diff: any, idx: number) => (
              <div key={idx} className="border border-border rounded-lg p-2 space-y-1">
                <div className="flex items-center gap-2">
                  <Input value={diff.icon} onChange={e => updateDiff(idx, 'icon', e.target.value)} className="h-6 text-xs w-24" placeholder="Ícone" />
                  <Input value={diff.title} onChange={e => updateDiff(idx, 'title', e.target.value)} className="h-6 text-xs flex-1" placeholder="Título" />
                  <button onClick={() => removeDiff(idx)} className="p-1 text-destructive hover:bg-destructive/10 rounded">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
                <Input value={diff.description} onChange={e => updateDiff(idx, 'description', e.target.value)} className="h-6 text-xs" placeholder="Descrição" />
              </div>
            ))}
          </div>
          <Button size="sm" variant="outline" className="w-full h-7 text-xs" onClick={addDiff}>
            <Plus className="h-3 w-3 mr-1" /> Adicionar diferencial
          </Button>
        </>
      )}
    </EditorSection>
  );
}
