import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, OptionPicker, ToggleRow, SelectField, NumberSlider, SectionDivider, TextField, AdminLink } from '../EditorControls';
import { Package, Zap, CreditCard, Sparkles, ArrowRight, Rocket, BadgeCheck, Tag, ShoppingBag, ShoppingCart, Plus, Heart, Store, PackagePlus, Flame, Send, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const buyNowIcons: { value: string; label: string; Icon: LucideIcon }[] = [
  { value: 'Zap', label: 'Raio', Icon: Zap },
  { value: 'CreditCard', label: 'Cartão', Icon: CreditCard },
  { value: 'Sparkles', label: 'Brilho', Icon: Sparkles },
  { value: 'Rocket', label: 'Foguete', Icon: Rocket },
  { value: 'Flame', label: 'Fogo', Icon: Flame },
  { value: 'ArrowRight', label: 'Seta', Icon: ArrowRight },
  { value: 'BadgeCheck', label: 'Selo', Icon: BadgeCheck },
  { value: 'Send', label: 'Enviar', Icon: Send },
  { value: 'Tag', label: 'Etiqueta', Icon: Tag },
];


function IconPicker({ label, value, onChange, icons }: { label: string; value: string; onChange: (v: string) => void; icons: { value: string; label: string; Icon: LucideIcon }[] }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
      <div className="grid grid-cols-5 gap-1.5">
        {icons.map(({ value: v, label: l, Icon }) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={cn(
              'flex flex-col items-center gap-1 p-2 rounded-lg border transition-all text-[9px]',
              value === v
                ? 'border-foreground bg-foreground/5 text-foreground'
                : 'border-border/40 text-muted-foreground hover:border-foreground/30 hover:bg-secondary/50'
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{l}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProductCardPanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.productCard;
  const set = (u: Partial<typeof c>) => updateDraftSection('productCard', u);

  return (
    <EditorSection icon={Package} title="Card de Produto" description="Visual e comportamento dos cards de produto nas listagens e destaques">
      <SectionDivider label="Imagem" />
      <SelectField label="Efeito ao passar o mouse" value={c.imageHover} onChange={v => set({ imageHover: v })} options={[
        { value: 'none', label: 'Nenhum — sem efeito na imagem' },
        { value: 'zoom', label: 'Zoom — amplia levemente a imagem' },
        { value: 'swap', label: 'Trocar — mostra a 2ª foto do produto' },
        { value: 'slide', label: 'Slide — desliza a imagem suavemente' },
      ]} />
      <SelectField label="Borda da imagem" value={c.imageBorderRadius} onChange={v => set({ imageBorderRadius: v })} options={[
        { value: 'none', label: 'Nenhuma — cantos totalmente retos' },
        { value: 'small', label: 'Pequena — cantos levemente arredondados (4px)' },
        { value: 'medium', label: 'Média — arredondamento moderado (8px)' },
        { value: 'large', label: 'Grande — cantos bem arredondados (12px)' },
      ]} />

      <SectionDivider label="Informações exibidas" />
      <ToggleRow label="Categoria" hint="Mostra a categoria do produto acima do nome (ex: Jeans, Acessórios)" checked={c.showCategory} onChange={v => set({ showCategory: v })} />
      

      <SectionDivider label="Preço" />
      <OptionPicker label="Tamanho do preço" value={c.priceSize} onChange={v => set({ priceSize: v })} options={[
        { value: 'small', label: 'Pequeno', description: 'Preço discreto e compacto' },
        { value: 'medium', label: 'Médio', description: 'Tamanho padrão equilibrado' },
        { value: 'large', label: 'Grande', description: 'Preço em destaque, bem visível' },
      ]} />
      <ToggleRow label="Preço comparativo" hint="Mostra o preço original riscado ao lado do preço com desconto (ex: de R$ 199 por R$ 149)" checked={c.showComparePrice} onChange={v => set({ showComparePrice: v })} />
      <ToggleRow label="Badge de desconto" hint="Exibe o selo/badge de desconto sobre a imagem do produto (ex: -30%)" checked={c.showDiscount} onChange={v => set({ showDiscount: v })} />
      {c.showDiscount && (
        <SelectField label="Formato do desconto" value={c.discountStyle} onChange={v => set({ discountStyle: v })} options={[
          { value: 'percentage', label: 'Porcentagem — ex: -30%' },
          { value: 'amount', label: 'Valor em reais — ex: -R$ 40,00' },
          { value: 'badge', label: 'Badge com texto — exibe "OFERTA"' },
        ]} />
      )}
      <ToggleRow label="Parcelas" hint="Mostra o valor parcelado abaixo do preço (ex: até 12x de R$ 16,58)" checked={c.showInstallments} onChange={v => set({ showInstallments: v })} />

      <SectionDivider label="Botões de Ação" />
      <ToggleRow label="Botão Comprar Agora" hint="Exibe o botão de compra rápida que leva direto ao carrinho. A cor é configurada em Cores > Ação de Compra" checked={c.showBuyNow} onChange={v => set({ showBuyNow: v })} />
      {c.showBuyNow && (
        <ToggleRow label="Revelar ao passar o mouse" hint="Quando ativo, o botão de compra só aparece ao passar o mouse sobre o card. Quando desativado, fica sempre visível." checked={c.buyNowHoverReveal !== false} onChange={v => set({ buyNowHoverReveal: v })} />
      )}
      {c.showBuyNow && (
        <>
          <TextField label="Texto do botão Comprar" value={c.buyNowText || 'Comprar Agora'} onChange={v => set({ buyNowText: v })} placeholder="Comprar Agora" />
          <IconPicker label="Ícone do Comprar Agora" value={c.buyNowIcon || 'Zap'} onChange={v => set({ buyNowIcon: v })} icons={buyNowIcons} />
        </>
      )}
      {c.showBuyNow && (
        <>
          <OptionPicker label="Estilo visual do botão" value={c.buttonStyle || 'solid'} onChange={v => set({ buttonStyle: v })} options={[
            { value: 'solid', label: 'Sólido', description: 'Fundo preenchido padrão' },
            { value: 'outline', label: 'Contorno', description: 'Apenas borda, sem fundo' },
            { value: 'pill', label: 'Pílula', description: 'Totalmente arredondado' },
            { value: 'rounded', label: 'Arredondado', description: 'Cantos bem suaves' },
            { value: 'sharp', label: 'Reto', description: 'Cantos 100% retos' },
            { value: 'gradient', label: 'Gradiente', description: 'Degradê de cores' },
            { value: 'underline', label: 'Sublinhado', description: 'Apenas linha embaixo' },
          ]} />
        </>
      )}


      <SectionDivider label="Badges de Desconto" />
      <SelectField label="Posição do badge" value={c.badgePosition} onChange={v => set({ badgePosition: v })} options={[
        { value: 'top-left', label: 'Topo esquerdo — canto superior esquerdo da imagem' },
        { value: 'top-right', label: 'Topo direito — canto superior direito da imagem' },
        { value: 'bottom-left', label: 'Inferior esquerdo — canto inferior esquerdo' },
      ]} />
      <SelectField label="Formato do badge" value={c.badgeStyle} onChange={v => set({ badgeStyle: v })} options={[
        { value: 'square', label: 'Quadrado — cantos totalmente retos' },
        { value: 'rounded', label: 'Arredondado — cantos levemente suaves' },
        { value: 'pill', label: 'Pílula — formato totalmente arredondado' },
      ]} />

      <SectionDivider label="Aparência Geral" />
      <OptionPicker label="Espaçamento interno" value={c.spacing} onChange={v => set({ spacing: v })} options={[
        { value: 'compact', label: 'Compacto', description: 'Menos espaço entre elementos' },
        { value: 'normal', label: 'Normal', description: 'Espaçamento padrão equilibrado' },
        { value: 'spacious', label: 'Espaçoso', description: 'Mais ar entre os elementos' },
      ]} />
      
      
      <SectionDivider label="Atalhos" />
      <AdminLink to="/admin/products" label="Gerenciar Produtos" icon={Package} />
    </EditorSection>
  );
}
