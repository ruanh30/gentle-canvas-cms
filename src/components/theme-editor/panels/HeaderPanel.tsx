import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, TextField, ToggleRow, NumberSlider, OptionPicker, SelectField, ColorInput, SectionDivider, HintTooltip } from '../EditorControls';
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
      <ToggleRow label="Header fixo (sticky)" hint="Mantém o cabeçalho visível ao rolar a página" checked={h.sticky} onChange={v => set({ sticky: v })} />
      <ToggleRow label="Encolher ao rolar" hint="O cabeçalho diminui de tamanho ao rolar para baixo" checked={h.shrinkOnScroll} onChange={v => set({ shrinkOnScroll: v })} />
      <ToggleRow label="Sombra ao rolar" hint="Adiciona sombra ao cabeçalho quando a página é rolada" checked={h.shadowOnScroll} onChange={v => set({ shadowOnScroll: v })} />
      <ToggleRow label="Borda inferior" hint="Linha sutil na parte inferior do cabeçalho" checked={h.borderBottom} onChange={v => set({ borderBottom: v })} />
      <NumberSlider label="Altura" value={h.height} onChange={v => set({ height: v })} min={48} max={96} suffix="px" />

      <SectionDivider label="Menu" />
      <SelectField label="Estilo do menu" value={h.menuStyle} onChange={v => set({ menuStyle: v })} options={[
        { value: 'horizontal', label: 'Horizontal' }, { value: 'dropdown', label: 'Dropdown' }, { value: 'mega-menu', label: 'Mega Menu' },
      ]} />
      <NumberSlider label="Tamanho da fonte" value={h.menuFontSize} onChange={v => set({ menuFontSize: v })} min={10} max={18} suffix="px" />
      <ToggleRow label="Maiúsculas" hint="Transforma o texto do menu em letras maiúsculas" checked={h.menuUppercase} onChange={v => set({ menuUppercase: v })} />

      <SectionDivider label="Ícones e Ações" />
      <NumberSlider label="Tamanho dos ícones" value={h.iconSize} onChange={v => set({ iconSize: v })} min={16} max={28} suffix="px" />
      <ToggleRow label="Busca" hint="Exibe o ícone de busca no cabeçalho" checked={h.showSearch} onChange={v => set({ showSearch: v })} />
      {h.showSearch && (
        <SelectField label="Estilo da busca" value={h.searchStyle} onChange={v => set({ searchStyle: v })} options={[
          { value: 'inline', label: 'Inline' }, { value: 'modal', label: 'Modal' }, { value: 'drawer', label: 'Drawer' },
        ]} />
      )}
      <ToggleRow label="Conta" hint="Exibe ícone de login/conta do usuário" checked={h.showAccount} onChange={v => set({ showAccount: v })} />
      <ToggleRow label="Wishlist" hint="Exibe ícone de lista de desejos" checked={h.showWishlist} onChange={v => set({ showWishlist: v })} />
      <ToggleRow label="Carrinho" hint="Exibe ícone do carrinho de compras" checked={h.showCart} onChange={v => set({ showCart: v })} />
      <SelectField label="Badge do carrinho" value={h.cartBadgeStyle} onChange={v => set({ cartBadgeStyle: v })} options={[
        { value: 'count', label: 'Contador' }, { value: 'dot', label: 'Ponto' }, { value: 'none', label: 'Nenhum' },
      ]} />

      <SectionDivider label="Barra de Anúncio (Topo)" />
      <ToggleRow label="Ativar barra" hint="Barra no topo do site com mensagens promocionais (ex: Frete Grátis)" checked={a.enabled} onChange={v => setAnn({ enabled: v })} />
      {a.enabled && (
        <>
          <OptionPicker label="Estilo" value={a.style} onChange={v => setAnn({ style: v })} options={[
            { value: 'static', label: 'Estático', description: 'Mensagem fixa' },
            { value: 'carousel', label: 'Carrossel', description: 'Rotação de msgs' },
            { value: 'ticker', label: 'Ticker', description: 'Texto corrido' },
          ]} />
          {(a.style === 'ticker' || a.style === 'carousel') && (
            <OptionPicker label="Direção" value={a.direction} onChange={v => setAnn({ direction: v })} options={[
              { value: 'rtl', label: '← Esq.', description: 'Direita para esquerda' },
              { value: 'ltr', label: 'Dir. →', description: 'Esquerda para direita' },
            ]} />
          )}
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
          <ToggleRow label="Pausar no hover" hint="Pausa a animação quando o mouse está sobre a barra" checked={a.pauseOnHover} onChange={v => setAnn({ pauseOnHover: v })} />
        </>
      )}

      <SectionDivider label="Banner abaixo do Cabeçalho" />
      <ToggleRow label="Ativar banner" hint="Exibe um banner com imagem logo abaixo do cabeçalho" checked={bb.enabled} onChange={v => setBanner({ enabled: v })} />
      {bb.enabled && (
        <>
          <TextField label="URL da imagem principal" value={bb.imageUrl} onChange={v => setBanner({ imageUrl: v })} placeholder="https://..." />
          <ToggleRow label="Carrossel de imagens" hint="Ativa rotação automática entre múltiplas imagens no banner" checked={bb.carousel} onChange={v => setBanner({ carousel: v })} />
          {bb.carousel && (
            <>
              <TextField label="Imagem 2" value={bb.images[0] || ''} onChange={v => {
                const imgs = [...(bb.images || [])]; imgs[0] = v; setBanner({ images: imgs.filter(Boolean) });
              }} placeholder="https://..." />
              <TextField label="Imagem 3" value={bb.images[1] || ''} onChange={v => {
                const imgs = [...(bb.images || [])]; imgs[1] = v; setBanner({ images: imgs.filter(Boolean) });
              }} placeholder="https://..." />
              <NumberSlider label="Velocidade do carrossel" value={bb.carouselSpeed} onChange={v => setBanner({ carouselSpeed: v })} min={2} max={10} suffix="s" />
            </>
          )}
          <TextField label="Link" value={bb.link} onChange={v => setBanner({ link: v })} placeholder="/products" />
          <NumberSlider label="Altura" value={bb.height} onChange={v => setBanner({ height: v })} min={40} max={200} suffix="px" />
          <ToggleRow label="Largura total" hint="Banner ocupa toda a largura da tela" checked={bb.fullWidth} onChange={v => setBanner({ fullWidth: v })} />
        </>
      )}
    </EditorSection>
  );
}
