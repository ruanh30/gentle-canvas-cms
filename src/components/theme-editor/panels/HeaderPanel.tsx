import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, TextField, ToggleRow, NumberSlider, OptionPicker, SelectField, ColorInput, SectionDivider } from '../EditorControls';
import { PanelTop } from 'lucide-react';

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

          <SectionDivider label="Regras Avançadas" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Controle em quais páginas, horários e para quais públicos a barra aparece.
          </p>
          <OptionPicker label="Exibir em" value={a.pageRules || 'all'} onChange={v => setAnn({ pageRules: v })} options={[
            { value: 'all', label: 'Todas as páginas', description: 'Barra visível em toda a loja' },
            { value: 'home-only', label: 'Só na Home', description: 'Exibe apenas na página inicial' },
            { value: 'checkout-only', label: 'Só no Checkout', description: 'Exibe apenas no checkout' },
            { value: 'mobile-only', label: 'Só no Mobile', description: 'Visível apenas em dispositivos móveis' },
          ]} />
          <OptionPicker label="Segmentação" value={a.segmentation || 'all'} onChange={v => setAnn({ segmentation: v })} options={[
            { value: 'all', label: 'Todos', description: 'Todos os visitantes' },
            { value: 'first-visit', label: 'Primeira visita', description: 'Apenas novos visitantes' },
            { value: 'logged-in', label: 'Logados', description: 'Apenas clientes autenticados' },
            { value: 'campaign', label: 'Campanha UTM', description: 'Visitantes de campanhas específicas' },
          ]} />
          <ToggleRow label="Agendar exibição" hint="Define data/hora de início e fim para a barra de anúncio" checked={a.scheduleEnabled ?? false} onChange={v => setAnn({ scheduleEnabled: v })} />
          {a.scheduleEnabled && (
            <>
              <TextField label="Início (data/hora)" value={a.scheduleStart || ''} onChange={v => setAnn({ scheduleStart: v })} placeholder="2025-01-01T00:00" />
              <TextField label="Fim (data/hora)" value={a.scheduleEnd || ''} onChange={v => setAnn({ scheduleEnd: v })} placeholder="2025-01-31T23:59" />
            </>
          )}

          <SectionDivider label="CTA e UTM" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Adicione um botão/link no anúncio e parâmetros UTM para rastreamento.
          </p>
          <TextField label="Texto do CTA" value={a.ctaText || ''} onChange={v => setAnn({ ctaText: v })} placeholder="Ver ofertas" />
          <TextField label="Link do CTA" value={a.ctaLink || ''} onChange={v => setAnn({ ctaLink: v })} placeholder="/products?promo=true" />
          <TextField label="UTM Source" value={a.utmSource || ''} onChange={v => setAnn({ utmSource: v })} placeholder="announcement_bar" />
          <TextField label="UTM Medium" value={a.utmMedium || ''} onChange={v => setAnn({ utmMedium: v })} placeholder="banner" />
          <TextField label="UTM Campaign" value={a.utmCampaign || ''} onChange={v => setAnn({ utmCampaign: v })} placeholder="black_friday_2025" />
        </>
      )}

      <SectionDivider label="Banner abaixo do Cabeçalho" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Banner com imagem exibido logo abaixo do cabeçalho. Ideal para promoções sazonais.
      </p>
      <ToggleRow label="Ativar banner" hint="Exibe um banner com imagem logo abaixo do cabeçalho" checked={bb.enabled} onChange={v => setBanner({ enabled: v })} />
      {bb.enabled && (
        <>
          <TextField label="URL da imagem principal" value={bb.imageUrl} onChange={v => setBanner({ imageUrl: v })} placeholder="https://..." />
          <ToggleRow label="Carrossel de imagens" hint="Ativa rotação automática entre múltiplas imagens no banner" checked={bb.carousel} onChange={v => setBanner({ carousel: v })} />
          {bb.carousel && (
            <>
              <TextField label="Imagem 2" value={bb.images[0] || ''} onChange={v => {
                const imgs = [...(bb.images || [])]; while (imgs.length < 1) imgs.push(''); imgs[0] = v; setBanner({ images: imgs });
              }} placeholder="https://..." />
              <TextField label="Imagem 3" value={bb.images[1] || ''} onChange={v => {
                const imgs = [...(bb.images || [])]; while (imgs.length < 2) imgs.push(''); imgs[1] = v; setBanner({ images: imgs });
              }} placeholder="https://..." />
              <NumberSlider label="Velocidade do carrossel" value={bb.carouselSpeed} onChange={v => setBanner({ carouselSpeed: v })} min={2} max={10} suffix="s" />
            </>
          )}
          <TextField label="Link" value={bb.link} onChange={v => setBanner({ link: v })} placeholder="/products" />
          <NumberSlider label="Altura" value={bb.height} onChange={v => setBanner({ height: v })} min={40} max={200} suffix="px" />
          <ToggleRow label="Largura total" hint="Banner ocupa toda a largura da tela, sem margens laterais" checked={bb.fullWidth} onChange={v => setBanner({ fullWidth: v })} />
        </>
      )}
    </EditorSection>
  );
}
