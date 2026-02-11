import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, TextField, ToggleRow, NumberSlider, OptionPicker, SelectField, ColorInput, SectionDivider } from '../EditorControls';
import { PanelTop } from 'lucide-react';

export function HeaderPanel() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header;
  const a = h.announcement;
  const bb = h.bannerBelow;
  const set = (u: Partial<typeof h>) => updateDraftSection('header', u);
  const setAnn = (u: Partial<typeof a>) => updateDraftSection('header', { announcement: { ...a, ...u } });
  const setBanner = (u: Partial<typeof bb>) => updateDraftSection('header', { bannerBelow: { ...bb, ...u } });

  return (
    <EditorSection icon={PanelTop} title="Cabeçalho" description="Layout, menu, busca e barra de anúncio">
      <OptionPicker label="Layout" value={h.layout} onChange={v => set({ layout: v })} options={[
        { value: 'classic', label: 'Clássico', description: 'Logo esq., nav dir.' },
        { value: 'centered', label: 'Centralizado', description: 'Logo centro' },
        { value: 'minimal', label: 'Minimalista', description: 'Sem topbar' },
        { value: 'logo-center-nav-left', label: 'Nav Esq.', description: 'Nav esq., logo centro' },
        { value: 'hamburger-only', label: 'Hambúrguer', description: 'Menu recolhido' },
      ]} />
      <SectionDivider label="Comportamento" />
      <ToggleRow label="Header fixo (sticky)" checked={h.sticky} onChange={v => set({ sticky: v })} />
      <ToggleRow label="Encolher ao rolar" checked={h.shrinkOnScroll} onChange={v => set({ shrinkOnScroll: v })} />
      <ToggleRow label="Sombra ao rolar" checked={h.shadowOnScroll} onChange={v => set({ shadowOnScroll: v })} />
      <ToggleRow label="Borda inferior" checked={h.borderBottom} onChange={v => set({ borderBottom: v })} />
      <NumberSlider label="Altura" value={h.height} onChange={v => set({ height: v })} min={48} max={96} suffix="px" />

      <SectionDivider label="Menu" />
      <SelectField label="Estilo do menu" value={h.menuStyle} onChange={v => set({ menuStyle: v })} options={[
        { value: 'horizontal', label: 'Horizontal' }, { value: 'dropdown', label: 'Dropdown' }, { value: 'mega-menu', label: 'Mega Menu' },
      ]} />
      <NumberSlider label="Tamanho da fonte" value={h.menuFontSize} onChange={v => set({ menuFontSize: v })} min={10} max={18} suffix="px" />
      <ToggleRow label="Maiúsculas" checked={h.menuUppercase} onChange={v => set({ menuUppercase: v })} />

      <SectionDivider label="Ícones e Ações" />
      <NumberSlider label="Tamanho dos ícones" value={h.iconSize} onChange={v => set({ iconSize: v })} min={16} max={28} suffix="px" />
      <ToggleRow label="Busca" checked={h.showSearch} onChange={v => set({ showSearch: v })} />
      {h.showSearch && (
        <SelectField label="Estilo da busca" value={h.searchStyle} onChange={v => set({ searchStyle: v })} options={[
          { value: 'inline', label: 'Inline' }, { value: 'modal', label: 'Modal' }, { value: 'drawer', label: 'Drawer' },
        ]} />
      )}
      <ToggleRow label="Conta" checked={h.showAccount} onChange={v => set({ showAccount: v })} />
      <ToggleRow label="Wishlist" checked={h.showWishlist} onChange={v => set({ showWishlist: v })} />
      <ToggleRow label="Carrinho" checked={h.showCart} onChange={v => set({ showCart: v })} />
      <SelectField label="Badge do carrinho" value={h.cartBadgeStyle} onChange={v => set({ cartBadgeStyle: v })} options={[
        { value: 'count', label: 'Contador' }, { value: 'dot', label: 'Ponto' }, { value: 'none', label: 'Nenhum' },
      ]} />

      <SectionDivider label="Barra de Anúncio (Topo)" />
      <ToggleRow label="Ativar barra" checked={a.enabled} onChange={v => setAnn({ enabled: v })} />
      {a.enabled && (
        <>
          <OptionPicker label="Estilo" value={a.style} onChange={v => setAnn({ style: v })} options={[
            { value: 'static', label: 'Estático', description: 'Mensagem fixa' },
            { value: 'carousel', label: 'Carrossel', description: 'Rotação de msgs' },
            { value: 'ticker', label: 'Ticker', description: 'Texto corrido' },
          ]} />
          <TextField label="Mensagem 1" value={a.messages[0] || ''} onChange={v => {
            const msgs = [...a.messages]; msgs[0] = v; setAnn({ messages: msgs });
          }} placeholder="Frete grátis acima de R$ 299" />
          {(a.style === 'carousel' || a.style === 'ticker') && (
            <>
              <TextField label="Mensagem 2" value={a.messages[1] || ''} onChange={v => {
                const msgs = [...a.messages]; msgs[1] = v; setAnn({ messages: msgs.filter(Boolean) });
              }} placeholder="Parcele em até 12x" />
              <TextField label="Mensagem 3" value={a.messages[2] || ''} onChange={v => {
                const msgs = [...a.messages]; msgs[2] = v; setAnn({ messages: msgs.filter(Boolean) });
              }} placeholder="Troca grátis em 30 dias" />
              <NumberSlider label="Velocidade" value={a.speed} onChange={v => setAnn({ speed: v })} min={2} max={10} suffix="s" />
            </>
          )}
          <div className="grid grid-cols-2 gap-3">
            <ColorInput label="Fundo" value={a.backgroundColor} onChange={v => setAnn({ backgroundColor: v })} />
            <ColorInput label="Texto" value={a.textColor} onChange={v => setAnn({ textColor: v })} />
          </div>
          <ToggleRow label="Pausar no hover" checked={a.pauseOnHover} onChange={v => setAnn({ pauseOnHover: v })} />
        </>
      )}

      <SectionDivider label="Banner abaixo do Cabeçalho" />
      <ToggleRow label="Ativar banner" checked={bb.enabled} onChange={v => setBanner({ enabled: v })} />
      {bb.enabled && (
        <>
          <TextField label="URL da imagem" value={bb.imageUrl} onChange={v => setBanner({ imageUrl: v })} placeholder="https://..." />
          <TextField label="Link" value={bb.link} onChange={v => setBanner({ link: v })} placeholder="/products" />
          <NumberSlider label="Altura" value={bb.height} onChange={v => setBanner({ height: v })} min={40} max={200} suffix="px" />
          <ToggleRow label="Largura total" checked={bb.fullWidth} onChange={v => setBanner({ fullWidth: v })} />
        </>
      )}
    </EditorSection>
  );
}
