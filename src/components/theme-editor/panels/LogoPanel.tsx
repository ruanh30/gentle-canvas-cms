import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, TextField, ToggleRow, NumberSlider, OptionPicker, SectionDivider, AdminLink } from '../EditorControls';
import { Image, ImageIcon } from 'lucide-react';

export function LogoPanel() {
  const { draft, updateDraftSection } = useTheme();
  const l = draft.logo;
  const set = (u: Partial<typeof l>) => updateDraftSection('logo', u);

  return (
    <EditorSection icon={Image} title="Logo" description="Configure o logo exibido no cabeçalho e em toda a identidade da sua loja">
      <SectionDivider label="Identidade" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Nome da loja e imagem do logo. Se ambos estiverem preenchidos, você pode exibir os dois ou apenas um.
      </p>
      <TextField label="Nome da loja" value={l.text} onChange={v => set({ text: v })} placeholder="Minha Loja" />
      <TextField label="URL da imagem do logo" value={l.imageUrl} onChange={v => set({ imageUrl: v })} placeholder="https://..." />
      <ToggleRow label="Mostrar nome como texto" hint="Exibe o nome da loja como texto ao lado ou no lugar do logo. Útil quando não há imagem" checked={l.showText} onChange={v => set({ showText: v })} />

      <SectionDivider label="Dimensão e Posição" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Controla a altura máxima do logo e sua posição no cabeçalho.
      </p>
      <NumberSlider label="Altura máx. do logo" value={l.maxHeight} onChange={v => set({ maxHeight: v })} min={24} max={80} suffix="px" />
      <OptionPicker label="Posição no cabeçalho" value={l.position} onChange={v => set({ position: v })} options={[
        { value: 'left', label: 'Esquerda', description: 'Logo alinhado à esquerda do cabeçalho' },
        { value: 'center', label: 'Centro', description: 'Logo centralizado no cabeçalho' },
      ]} />

      <SectionDivider label="Preview" />
      <div className="p-4 bg-secondary/30 rounded-lg border border-border/30 flex items-center gap-2">
        {l.imageUrl && <img src={l.imageUrl} alt="Logo" style={{ maxHeight: l.maxHeight }} className="object-contain" />}
        {l.showText && <span className="text-lg font-bold" style={{ fontFamily: draft.typography.headingFont }}>{l.text}</span>}
        {!l.imageUrl && !l.showText && <span className="text-sm text-muted-foreground">Nenhum logo configurado</span>}
      </div>

      <SectionDivider label="Atalhos" />
      <AdminLink to="/admin/media" label="Abrir Biblioteca de Mídia" icon={ImageIcon} />
    </EditorSection>
  );
}
