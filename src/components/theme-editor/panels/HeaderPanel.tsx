import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, TextField, ImageField, ToggleRow, NumberSlider, OptionPicker, SelectField, ColorInput, SectionDivider, AdminLink } from '../EditorControls';
import { PanelTop, Menu } from 'lucide-react';

export function HeaderPanel() {
  const { draft, updateDraftSection } = useTheme();
  const h = draft.header ?? {} as any;
  const a = h.announcement ?? { enabled: false, messages: [], speed: 5, backgroundColor: '#1a1a1a', textColor: '#fafafa', showIcon: false, icon: 'truck', link: '', pauseOnHover: true, style: 'static' as const, direction: 'rtl' as const };
  const bb = h.bannerBelow ?? { enabled: false, imageUrl: '', images: [], link: '', height: 60, fullWidth: true, carousel: false, carouselSpeed: 5 };
  const set = (u: Partial<typeof h>) => updateDraftSection('header', u);
  const setAnn = (u: Partial<typeof a>) => updateDraftSection('header', { announcement: { ...a, ...u } });
  const setBanner = (u: Partial<typeof bb>) => updateDraftSection('header', { bannerBelow: { ...bb, ...u } });

  return (
    <EditorSection icon={PanelTop} title="Cabeçalho" description="Configure o layout, navegação, busca, ícones e barra de anúncio do topo da loja">
      <SectionDivider label="Layout do Cabeçalho" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Define como logo, menu e ícones são organizados. Cada layout oferece uma experiência visual diferente.
      </p>
      <OptionPicker label="Layout" value={h.layout} onChange={v => set({ layout: v })} options={[
        { value: 'classic', label: 'Clássico', description: 'Logo à esquerda, menu e ícones à direita' },
        { value: 'centered', label: 'Centralizado', description: 'Logo no centro, navegação abaixo' },
        { value: 'minimal', label: 'Minimalista', description: 'Apenas logo e ícones essenciais' },
        { value: 'logo-center-nav-left', label: 'Logo Centro + Nav', description: 'Menu à esquerda, logo centralizada, ícones à direita' },
        { value: 'hamburger-only', label: 'Hambúrguer', description: 'Menu sempre recolhido em ícone hamburger' },
        { value: 'top-bar-split', label: 'Dividido', description: 'Navegação à esquerda, ações à direita' },
        { value: 'double-row', label: 'Duas Linhas', description: 'Linha 1: logo + busca. Linha 2: menu + ícones' },
        { value: 'sidebar-nav', label: 'Nav Lateral', description: 'Menu abre como painel lateral deslizante' },
        { value: 'transparent', label: 'Transparente', description: 'Sem fundo, sobrepõe o hero/banner' },
      ]} />

      <SectionDivider label="Comportamento" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Controla como o cabeçalho reage à rolagem da página.
      </p>
      <ToggleRow label="Header fixo (sticky)" hint="Mantém o cabeçalho visível no topo ao rolar a página" checked={h.sticky} onChange={v => set({ sticky: v })} />
      <ToggleRow label="Encolher ao rolar" hint="O cabeçalho diminui de tamanho ao rolar para baixo, economizando espaço" checked={h.shrinkOnScroll} onChange={v => set({ shrinkOnScroll: v })} />
      <ToggleRow label="Sombra ao rolar" hint="Adiciona uma sombra sutil quando a página é rolada, criando profundidade" checked={h.shadowOnScroll} onChange={v => set({ shadowOnScroll: v })} />
      <ToggleRow label="Borda inferior" hint="Exibe uma linha fina na parte inferior do cabeçalho" checked={h.borderBottom} onChange={v => set({ borderBottom: v })} />

      <SectionDivider label="Profundidade e Interação" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Controla a elevação visual do cabeçalho e a qualidade da interação com o menu.
      </p>
      <ToggleRow label="Superfície elevada" hint="Adiciona sombra e borda sutil permanentes, separando visualmente o cabeçalho do conteúdo" checked={h.headerSurface ?? true} onChange={v => set({ headerSurface: v })} />
      <ToggleRow label="Dropdown elevado" hint="Submenus com sombra forte, seta de ancoragem e cantos arredondados (estilo popover)" checked={h.dropdownElevated ?? true} onChange={v => set({ dropdownElevated: v })} />
      <ToggleRow label="Área clicável ampla" hint="Links do menu com padding maior e fundo no hover, facilitando a interação" checked={h.menuItemPadding ?? true} onChange={v => set({ menuItemPadding: v })} />

      <NumberSlider label="Altura" value={h.height} onChange={v => set({ height: v })} min={48} max={96} suffix="px" />

      <SectionDivider label="Menu de Navegação" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Estilo e aparência dos links de navegação no cabeçalho.
      </p>
      <SelectField label="Estilo do menu" value={h.menuStyle} onChange={v => set({ menuStyle: v })} options={[
        { value: 'horizontal', label: 'Horizontal (links lado a lado)' },
        { value: 'dropdown', label: 'Dropdown (abre ao clicar)' },
        { value: 'mega-menu', label: 'Mega Menu (painel expandido)' },
      ]} />
      <NumberSlider label="Tamanho da fonte do menu" value={h.menuFontSize} onChange={v => set({ menuFontSize: v })} min={10} max={18} suffix="px" />
      <ToggleRow label="Texto em maiúsculas" hint="Transforma os links do menu em letras maiúsculas (ex: HOME, PRODUTOS)" checked={h.menuUppercase} onChange={v => set({ menuUppercase: v })} />

      <SectionDivider label="Ícones e Ações" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Controle quais ícones aparecem no cabeçalho e seu tamanho.
      </p>
      <NumberSlider label="Tamanho dos ícones" value={h.iconSize} onChange={v => set({ iconSize: v })} min={16} max={28} suffix="px" />
      <ToggleRow label="Ícone de busca" hint="Exibe o ícone de lupa para buscar produtos. Pode abrir inline, modal ou drawer." checked={h.showSearch} onChange={v => set({ showSearch: v })} />
      {h.showSearch && (
        <OptionPicker label="Estilo da busca" value={h.searchStyle} onChange={v => set({ searchStyle: v })} options={[
          { value: 'inline', label: 'Inline', description: 'Barra de busca visível no cabeçalho' },
          { value: 'modal', label: 'Modal', description: 'Abre um popup centralizado ao clicar' },
          { value: 'drawer', label: 'Drawer', description: 'Painel desliza do topo da página' },
        ]} />
      )}
      <ToggleRow label="Ícone de conta" hint="Exibe ícone de perfil/login do usuário no cabeçalho" checked={h.showAccount} onChange={v => set({ showAccount: v })} />
      <ToggleRow label="Ícone de wishlist" hint="Exibe ícone de coração para lista de desejos" checked={h.showWishlist} onChange={v => set({ showWishlist: v })} />
      <ToggleRow label="Ícone do carrinho" hint="Exibe ícone da sacola/carrinho de compras" checked={h.showCart} onChange={v => set({ showCart: v })} />
      <OptionPicker label="Badge do carrinho" value={h.cartBadgeStyle} onChange={v => set({ cartBadgeStyle: v })} options={[
        { value: 'count', label: 'Contador', description: 'Exibe o número de itens no carrinho' },
        { value: 'dot', label: 'Ponto', description: 'Apenas um ponto indicativo' },
        { value: 'none', label: 'Nenhum', description: 'Sem indicador no ícone' },
      ]} />

      <SectionDivider label="Barra de Anúncio (Topo)" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Barra fina acima do cabeçalho com mensagens promocionais (ex: "Frete Grátis", "Black Friday").
      </p>
      <ToggleRow label="Ativar barra de anúncio" hint="Exibe uma barra colorida no topo do site com mensagens promocionais" checked={a.enabled} onChange={v => setAnn({ enabled: v })} />
      {a.enabled && (
        <>
          <OptionPicker label="Estilo da barra" value={a.style} onChange={v => setAnn({ style: v })} options={[
            { value: 'static', label: 'Estático', description: 'Mensagem fixa, sem animação' },
            { value: 'carousel', label: 'Carrossel', description: 'Alterna entre mensagens automaticamente' },
            { value: 'ticker', label: 'Ticker', description: 'Texto desliza continuamente como letreiro' },
          ]} />
          {(a.style === 'ticker' || a.style === 'carousel') && (
            <OptionPicker label="Direção" value={a.direction} onChange={v => setAnn({ direction: v })} options={[
              { value: 'rtl', label: '← Esquerda', description: 'Move da direita para esquerda' },
              { value: 'ltr', label: 'Direita →', description: 'Move da esquerda para direita' },
            ]} />
          )}
          <TextField label="Mensagem 1" value={a.messages[0] || ''} onChange={v => {
            const msgs = [...a.messages]; msgs[0] = v; setAnn({ messages: msgs });
          }} placeholder="Frete grátis acima de R$ 299" />
          {(a.style === 'carousel' || a.style === 'ticker') && (
            <>
              <TextField label="Mensagem 2" value={a.messages[1] || ''} onChange={v => {
                const msgs = [...a.messages]; while (msgs.length < 2) msgs.push(''); msgs[1] = v; setAnn({ messages: msgs });
              }} placeholder="Parcele em até 12x" />
              <TextField label="Mensagem 3" value={a.messages[2] || ''} onChange={v => {
                const msgs = [...a.messages]; while (msgs.length < 3) msgs.push(''); msgs[2] = v; setAnn({ messages: msgs });
              }} placeholder="Troca grátis em 30 dias" />
              <NumberSlider label="Velocidade" value={a.speed} onChange={v => setAnn({ speed: v })} min={2} max={10} suffix="s" />
            </>
          )}
          <div className="grid grid-cols-2 gap-3">
            <ColorInput label="Cor do fundo" value={a.backgroundColor} onChange={v => setAnn({ backgroundColor: v })} />
            <ColorInput label="Cor do texto" value={a.textColor} onChange={v => setAnn({ textColor: v })} />
          </div>
          <ToggleRow label="Pausar no hover" hint="Pausa a animação quando o mouse está sobre a barra" checked={a.pauseOnHover} onChange={v => setAnn({ pauseOnHover: v })} />
        </>
      )}

      <SectionDivider label="Banner abaixo do Cabeçalho" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Banner com imagem exibido logo abaixo do cabeçalho. Ideal para promoções sazonais.
      </p>
      <ToggleRow label="Ativar banner" hint="Exibe um banner com imagem logo abaixo do cabeçalho" checked={bb.enabled} onChange={v => setBanner({ enabled: v })} />
      {bb.enabled && (
        <>
           <ImageField label="URL da imagem principal" value={bb.imageUrl} onChange={v => setBanner({ imageUrl: v })} />
          <ToggleRow label="Carrossel de imagens" hint="Ativa rotação automática entre múltiplas imagens no banner" checked={bb.carousel} onChange={v => setBanner({ carousel: v })} />
          {bb.carousel && (
            <>
              <ImageField label="Imagem 2" value={bb.images[0] || ''} onChange={v => {
                const imgs = [...(bb.images || [])]; while (imgs.length < 1) imgs.push(''); imgs[0] = v; setBanner({ images: imgs });
              }} />
              <ImageField label="Imagem 3" value={bb.images[1] || ''} onChange={v => {
                const imgs = [...(bb.images || [])]; while (imgs.length < 2) imgs.push(''); imgs[1] = v; setBanner({ images: imgs });
              }} />
              <NumberSlider label="Velocidade do carrossel" value={bb.carouselSpeed} onChange={v => setBanner({ carouselSpeed: v })} min={2} max={10} suffix="s" />
            </>
          )}
          <TextField label="Link" value={bb.link} onChange={v => setBanner({ link: v })} placeholder="/products" />
          <NumberSlider label="Altura" value={bb.height} onChange={v => setBanner({ height: v })} min={40} max={200} suffix="px" />
          <ToggleRow label="Largura total" hint="Banner ocupa toda a largura da tela, sem margens laterais" checked={bb.fullWidth} onChange={v => setBanner({ fullWidth: v })} />
        </>
      )}

      <SectionDivider label="Atalhos" />
      <AdminLink to="/admin/menu" label="Gerenciar Menu de Navegação" icon={Menu} />
    </EditorSection>
  );
}
