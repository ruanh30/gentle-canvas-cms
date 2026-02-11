import React, { useState } from 'react';
import { useTheme, defaultTheme, ThemeConfig } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import {
  Palette, Type, Image, Layout, Monitor, PanelTop, PanelBottom,
  RotateCcw, Eye, Columns3, Square, RectangleHorizontal, Circle,
  AlignLeft, AlignCenter, AlignRight, Grid3X3, Grid2X2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const headingFonts = [
  'Playfair Display', 'Poppins', 'Montserrat', 'Lora', 'Merriweather',
  'Raleway', 'Oswald', 'Cormorant Garamond', 'DM Serif Display', 'Libre Baskerville',
];

const bodyFonts = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Nunito', 'Work Sans',
  'DM Sans', 'Source Sans 3', 'Rubik', 'Manrope',
];

const colorPresets = [
  { name: 'Minimalista', primary: '#1a1a1a', accent: '#f5f5f5', buyNow: '#dc2626', bg: '#ffffff', fg: '#1a1a1a' },
  { name: 'Elegante', primary: '#2d2d2d', accent: '#f0ebe3', buyNow: '#b91c1c', bg: '#faf8f5', fg: '#1a1a1a' },
  { name: 'Moderno', primary: '#0f172a', accent: '#e2e8f0', buyNow: '#e11d48', bg: '#ffffff', fg: '#0f172a' },
  { name: 'Rosa', primary: '#831843', accent: '#fce7f3', buyNow: '#be123c', bg: '#fff1f2', fg: '#1a1a1a' },
  { name: 'Luxo', primary: '#78350f', accent: '#fef3c7', buyNow: '#b91c1c', bg: '#fffbeb', fg: '#1a1a1a' },
  { name: 'Oceano', primary: '#164e63', accent: '#e0f2fe', buyNow: '#dc2626', bg: '#f0f9ff', fg: '#0c4a6e' },
];

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-10 h-10 rounded-lg border border-input cursor-pointer appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-none"
          />
        </div>
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          className="font-mono text-xs h-10 w-28 uppercase"
          maxLength={7}
        />
      </div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <CardHeader className="pb-4">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-secondary">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
  );
}

const AdminCustomization = () => {
  const { theme, updateSection, resetTheme } = useTheme();

  const handleReset = () => {
    resetTheme();
    toast.success('Tema restaurado ao padrão!');
  };

  const applyPreset = (preset: typeof colorPresets[0]) => {
    updateSection('colors', {
      primary: preset.primary,
      primaryForeground: '#fafafa',
      accent: preset.accent,
      buyNow: preset.buyNow,
      background: preset.bg,
      foreground: preset.fg,
    });
    toast.success(`Preset "${preset.name}" aplicado!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Personalização</h1>
          <p className="text-sm text-muted-foreground mt-1">Customize a aparência da sua loja em tempo real</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-1" /> Restaurar padrão
          </Button>
          <a href="/" target="_blank" rel="noopener">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" /> Ver loja
            </Button>
          </a>
        </div>
      </div>

      <Tabs defaultValue="colors" className="space-y-4">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0">
          {[
            { value: 'colors', icon: Palette, label: 'Cores' },
            { value: 'typography', icon: Type, label: 'Tipografia' },
            { value: 'logo', icon: Image, label: 'Logo' },
            { value: 'header', icon: PanelTop, label: 'Cabeçalho' },
            { value: 'hero', icon: Monitor, label: 'Hero/Banner' },
            { value: 'homepage', icon: Layout, label: 'Página Inicial' },
            { value: 'footer', icon: PanelBottom, label: 'Rodapé' },
            { value: 'layout', icon: Columns3, label: 'Layout' },
          ].map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-foreground data-[state=active]:text-background rounded-full px-4 py-2 text-sm border border-border"
            >
              <tab.icon className="h-3.5 w-3.5 mr-1.5" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* COLORS */}
        <TabsContent value="colors" className="space-y-4">
          <Card>
            <SectionHeader icon={Palette} title="Paleta de Cores" description="Defina as cores principais da sua loja" />
            <CardContent className="space-y-6">
              {/* Presets */}
              <div>
                <Label className="text-xs font-medium text-muted-foreground mb-2 block">Presets rápidos</Label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {colorPresets.map(preset => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border hover:border-foreground/30 transition-colors group"
                    >
                      <div className="flex gap-0.5">
                        <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: preset.primary }} />
                        <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: preset.accent }} />
                        <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: preset.buyNow }} />
                      </div>
                      <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <ColorInput label="Cor principal" value={theme.colors.primary} onChange={v => updateSection('colors', { primary: v })} />
                <ColorInput label="Texto sobre principal" value={theme.colors.primaryForeground} onChange={v => updateSection('colors', { primaryForeground: v })} />
                <ColorInput label="Cor de destaque" value={theme.colors.accent} onChange={v => updateSection('colors', { accent: v })} />
                <ColorInput label="Fundo" value={theme.colors.background} onChange={v => updateSection('colors', { background: v })} />
                <ColorInput label="Texto" value={theme.colors.foreground} onChange={v => updateSection('colors', { foreground: v })} />
                <ColorInput label="Botão Comprar" value={theme.colors.buyNow} onChange={v => updateSection('colors', { buyNow: v })} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TYPOGRAPHY */}
        <TabsContent value="typography" className="space-y-4">
          <Card>
            <SectionHeader icon={Type} title="Tipografia" description="Escolha as fontes que representam sua marca" />
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label>Fonte dos títulos</Label>
                  <Select value={theme.typography.headingFont} onValueChange={v => updateSection('typography', { headingFont: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {headingFonts.map(f => (
                        <SelectItem key={f} value={f}>
                          <span style={{ fontFamily: f }}>{f}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-2xl font-bold" style={{ fontFamily: theme.typography.headingFont }}>Título de exemplo</p>
                    <p className="text-sm text-muted-foreground mt-1">Preview do estilo de título</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Fonte do corpo</Label>
                  <Select value={theme.typography.bodyFont} onValueChange={v => updateSection('typography', { bodyFont: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {bodyFonts.map(f => (
                        <SelectItem key={f} value={f}>
                          <span style={{ fontFamily: f }}>{f}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm" style={{ fontFamily: theme.typography.bodyFont }}>Este é um texto de exemplo usando a fonte do corpo selecionada. Verifique como fica a legibilidade.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LOGO */}
        <TabsContent value="logo" className="space-y-4">
          <Card>
            <SectionHeader icon={Image} title="Logo da Loja" description="Configure o logo que aparece no cabeçalho" />
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nome da loja (texto do logo)</Label>
                <Input
                  value={theme.logo.text}
                  onChange={e => updateSection('logo', { text: e.target.value })}
                  placeholder="Minha Loja"
                />
              </div>
              <div className="space-y-2">
                <Label>URL da imagem do logo</Label>
                <Input
                  value={theme.logo.imageUrl}
                  onChange={e => updateSection('logo', { imageUrl: e.target.value })}
                  placeholder="https://exemplo.com/logo.png"
                />
                <p className="text-xs text-muted-foreground">Cole a URL de uma imagem para usar como logo</p>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={theme.logo.showText}
                  onCheckedChange={v => updateSection('logo', { showText: v })}
                />
                <Label>Mostrar nome da loja no cabeçalho</Label>
              </div>
              <div className="p-6 bg-secondary rounded-xl">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <div className="flex items-center gap-3">
                  {theme.logo.imageUrl && (
                    <img src={theme.logo.imageUrl} alt="Logo" className="h-10 object-contain" />
                  )}
                  {theme.logo.showText && (
                    <span className="text-xl font-bold" style={{ fontFamily: theme.typography.headingFont }}>{theme.logo.text}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* HEADER */}
        <TabsContent value="header" className="space-y-4">
          <Card>
            <SectionHeader icon={PanelTop} title="Cabeçalho" description="Configure a barra de anúncio e estilo do cabeçalho" />
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Barra de anúncio</Label>
                  <Switch
                    checked={theme.header.announcementEnabled}
                    onCheckedChange={v => updateSection('header', { announcementEnabled: v })}
                  />
                </div>
                <Input
                  value={theme.header.announcementBar}
                  onChange={e => updateSection('header', { announcementBar: e.target.value })}
                  placeholder="Frete grátis acima de R$ 299"
                  disabled={!theme.header.announcementEnabled}
                />
              </div>
              <div className="space-y-3">
                <Label>Estilo do cabeçalho</Label>
                <div className="grid grid-cols-3 gap-3">
                  {(['classic', 'minimal', 'centered'] as const).map(style => (
                    <button
                      key={style}
                      onClick={() => updateSection('header', { style })}
                      className={cn(
                        'p-4 rounded-xl border-2 transition-all text-center',
                        theme.header.style === style ? 'border-foreground bg-secondary' : 'border-border hover:border-foreground/30'
                      )}
                    >
                      <div className="text-xs font-medium capitalize">{style === 'classic' ? 'Clássico' : style === 'minimal' ? 'Minimalista' : 'Centralizado'}</div>
                      <div className="text-[10px] text-muted-foreground mt-1">
                        {style === 'classic' ? 'Logo à esquerda, nav à direita' : style === 'minimal' ? 'Sem barra de anúncio' : 'Logo centralizado'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={theme.header.sticky}
                  onCheckedChange={v => updateSection('header', { sticky: v })}
                />
                <Label>Cabeçalho fixo (sticky)</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* HERO */}
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <SectionHeader icon={Monitor} title="Banner Hero" description="Configure o banner principal da página inicial" />
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <Switch
                  checked={theme.hero.enabled}
                  onCheckedChange={v => updateSection('hero', { enabled: v })}
                />
                <Label>Exibir banner hero</Label>
              </div>

              {theme.hero.enabled && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Subtítulo (acima do título)</Label>
                      <Input
                        value={theme.hero.subtitle}
                        onChange={e => updateSection('hero', { subtitle: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Texto do botão</Label>
                      <Input
                        value={theme.hero.ctaText}
                        onChange={e => updateSection('hero', { ctaText: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Título principal</Label>
                    <Textarea
                      value={theme.hero.title}
                      onChange={e => updateSection('hero', { title: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Descrição</Label>
                    <Textarea
                      value={theme.hero.description}
                      onChange={e => updateSection('hero', { description: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Link do botão</Label>
                      <Input
                        value={theme.hero.ctaLink}
                        onChange={e => updateSection('hero', { ctaLink: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Imagem de fundo (URL)</Label>
                      <Input
                        value={theme.hero.backgroundImage}
                        onChange={e => updateSection('hero', { backgroundImage: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  {theme.hero.backgroundImage && (
                    <div className="space-y-2">
                      <Label>Opacidade do overlay: {Math.round(theme.hero.overlayOpacity * 100)}%</Label>
                      <Slider
                        value={[theme.hero.overlayOpacity]}
                        onValueChange={([v]) => updateSection('hero', { overlayOpacity: v })}
                        min={0}
                        max={1}
                        step={0.05}
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    <Label>Alinhamento do conteúdo</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {([
                        { value: 'left' as const, icon: AlignLeft, label: 'Esquerda' },
                        { value: 'center' as const, icon: AlignCenter, label: 'Centro' },
                        { value: 'right' as const, icon: AlignRight, label: 'Direita' },
                      ]).map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => updateSection('hero', { style: opt.value })}
                          className={cn(
                            'p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1',
                            theme.hero.style === opt.value ? 'border-foreground bg-secondary' : 'border-border hover:border-foreground/30'
                          )}
                        >
                          <opt.icon className="h-4 w-4" />
                          <span className="text-xs">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* HOMEPAGE */}
        <TabsContent value="homepage" className="space-y-4">
          <Card>
            <SectionHeader icon={Layout} title="Seções da Página Inicial" description="Ative/desative e configure seções da home" />
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                  <div>
                    <p className="text-sm font-medium">Categorias</p>
                    <p className="text-xs text-muted-foreground">Grade de categorias disponíveis</p>
                  </div>
                  <Switch
                    checked={theme.homepage.showCategories}
                    onCheckedChange={v => updateSection('homepage', { showCategories: v })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                  <div>
                    <p className="text-sm font-medium">Produtos em Destaque</p>
                    <p className="text-xs text-muted-foreground">Produtos marcados como destaque</p>
                  </div>
                  <Switch
                    checked={theme.homepage.showFeatured}
                    onCheckedChange={v => updateSection('homepage', { showFeatured: v })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                  <div>
                    <p className="text-sm font-medium">Banner Promocional</p>
                    <p className="text-xs text-muted-foreground">Seção de destaque com CTA</p>
                  </div>
                  <Switch
                    checked={theme.homepage.showBanner}
                    onCheckedChange={v => updateSection('homepage', { showBanner: v })}
                  />
                </div>
              </div>

              {theme.homepage.showBanner && (
                <div className="space-y-3 pl-4 border-l-2 border-border">
                  <div className="space-y-2">
                    <Label>Título do banner</Label>
                    <Input
                      value={theme.homepage.bannerTitle}
                      onChange={e => updateSection('homepage', { bannerTitle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Descrição do banner</Label>
                    <Input
                      value={theme.homepage.bannerDescription}
                      onChange={e => updateSection('homepage', { bannerDescription: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Label>Produtos por linha na grade</Label>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { value: 2 as const, icon: Grid2X2, label: '2 colunas' },
                    { value: 3 as const, icon: Columns3, label: '3 colunas' },
                    { value: 4 as const, icon: Grid3X3, label: '4 colunas' },
                  ]).map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => updateSection('homepage', { productsPerRow: opt.value })}
                      className={cn(
                        'p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1',
                        theme.homepage.productsPerRow === opt.value ? 'border-foreground bg-secondary' : 'border-border hover:border-foreground/30'
                      )}
                    >
                      <opt.icon className="h-4 w-4" />
                      <span className="text-xs">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FOOTER */}
        <TabsContent value="footer" className="space-y-4">
          <Card>
            <SectionHeader icon={PanelBottom} title="Rodapé" description="Configure quais seções exibir no rodapé" />
            <CardContent className="space-y-4">
              {[
                { key: 'showInstitutional' as const, label: 'Institucional', desc: 'Links: Sobre nós, Contato, FAQ' },
                { key: 'showHelp' as const, label: 'Ajuda', desc: 'Links: Entregas, Trocas, Privacidade' },
                { key: 'showContact' as const, label: 'Contato', desc: 'E-mail e telefone de contato' },
                { key: 'showSocial' as const, label: 'Redes sociais', desc: 'Ícones das redes sociais' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={theme.footer[item.key]}
                    onCheckedChange={v => updateSection('footer', { [item.key]: v })}
                  />
                </div>
              ))}
              <div className="space-y-2">
                <Label>Texto de copyright</Label>
                <Input
                  value={theme.footer.copyrightText}
                  onChange={e => updateSection('footer', { copyrightText: e.target.value })}
                  placeholder="© 2024 {storeName}. Todos os direitos reservados."
                />
                <p className="text-xs text-muted-foreground">Use {'{storeName}'} para inserir o nome da loja automaticamente</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LAYOUT */}
        <TabsContent value="layout" className="space-y-4">
          <Card>
            <SectionHeader icon={Columns3} title="Layout e Estilo" description="Ajuste o estilo global de botões e bordas" />
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Arredondamento de bordas</Label>
                <div className="grid grid-cols-5 gap-2">
                  {([
                    { value: 'none' as const, label: 'Nenhum', preview: 'rounded-none' },
                    { value: 'small' as const, label: 'Pequeno', preview: 'rounded-sm' },
                    { value: 'medium' as const, label: 'Médio', preview: 'rounded-md' },
                    { value: 'large' as const, label: 'Grande', preview: 'rounded-lg' },
                    { value: 'full' as const, label: 'Máximo', preview: 'rounded-full' },
                  ]).map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => updateSection('layout', { borderRadius: opt.value })}
                      className={cn(
                        'p-3 border-2 transition-all flex flex-col items-center gap-2 rounded-lg',
                        theme.layout.borderRadius === opt.value ? 'border-foreground bg-secondary' : 'border-border hover:border-foreground/30'
                      )}
                    >
                      <div className={cn('w-8 h-8 bg-foreground', opt.preview)} />
                      <span className="text-[10px]">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Largura máxima do conteúdo</Label>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { value: 'narrow' as const, label: 'Estreito', desc: '1200px' },
                    { value: 'default' as const, label: 'Padrão', desc: '1400px' },
                    { value: 'wide' as const, label: 'Largo', desc: '1600px' },
                  ]).map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => updateSection('layout', { maxWidth: opt.value })}
                      className={cn(
                        'p-3 rounded-xl border-2 transition-all text-center',
                        theme.layout.maxWidth === opt.value ? 'border-foreground bg-secondary' : 'border-border hover:border-foreground/30'
                      )}
                    >
                      <p className="text-xs font-medium">{opt.label}</p>
                      <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCustomization;
