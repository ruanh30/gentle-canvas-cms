import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, NumberSlider, ToggleRow, SectionDivider } from '../EditorControls';
import { MousePointer, ShoppingBag, Zap, Check, ArrowRight, Heart, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Style definitions ─────────────────────────────── */

const STYLES = [
  { value: 'filled', label: 'Sólido', cssClass: 'bg-foreground text-background' },
  { value: 'outline', label: 'Contorno', cssClass: 'border-2 border-foreground text-foreground bg-transparent' },
  { value: 'ghost', label: 'Fantasma', cssClass: 'text-foreground bg-transparent hover:bg-secondary' },
  { value: 'soft', label: 'Suave', cssClass: 'bg-foreground/10 text-foreground' },
  { value: 'gradient', label: 'Gradiente', cssClass: 'bg-gradient-to-r from-foreground to-foreground/60 text-background' },
  { value: '3d', label: '3D', cssClass: 'bg-foreground text-background shadow-[0_4px_0_0] shadow-foreground/40 -translate-y-px' },
  { value: 'neon', label: 'Neon', cssClass: 'border-2 border-foreground text-foreground shadow-[0_0_12px] shadow-foreground/40 bg-transparent' },
  { value: 'minimal', label: 'Minimal', cssClass: 'text-foreground underline underline-offset-4 bg-transparent' },
] as const;

const RADII = [
  { value: 'none', label: 'Reto', px: '0px', visual: 'rounded-none' },
  { value: 'small', label: 'Sutil', px: '4px', visual: 'rounded' },
  { value: 'medium', label: 'Médio', px: '8px', visual: 'rounded-lg' },
  { value: 'large', label: 'Grande', px: '16px', visual: 'rounded-2xl' },
  { value: 'full', label: 'Pílula', px: '9999px', visual: 'rounded-full' },
] as const;

/* ── Visual Style Card ──────────────────────────────── */

function StyleCard({ style, isActive, onClick }: {
  style: typeof STYLES[number]; isActive: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group/card relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200',
        isActive
          ? 'border-foreground bg-foreground/5 shadow-sm'
          : 'border-border/40 hover:border-foreground/30 hover:bg-secondary/30',
      )}
    >
      {/* Mini button preview */}
      <div className={cn(
        'px-4 py-1.5 text-[11px] font-semibold transition-all rounded-md whitespace-nowrap',
        style.cssClass,
      )}>
        Botão
      </div>
      {/* Label */}
      <span className={cn(
        'text-[10px] font-medium transition-colors',
        isActive ? 'text-foreground' : 'text-muted-foreground',
      )}>
        {style.label}
      </span>
      {/* Selected indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-foreground flex items-center justify-center"
          >
            <Check className="h-3 w-3 text-background" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

/* ── Visual Radius Picker ───────────────────────────── */

function RadiusPicker({ value, onChange }: {
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Arredondamento</Label>
      <div className="flex gap-2">
        {RADII.map(r => {
          const isActive = value === r.value;
          return (
            <button
              key={r.value}
              onClick={() => onChange(r.value)}
              className={cn(
                'flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-lg border-2 transition-all duration-200',
                isActive
                  ? 'border-foreground bg-foreground/5'
                  : 'border-border/30 hover:border-foreground/20',
              )}
            >
              {/* Visual shape preview */}
              <div className={cn(
                'w-8 h-5 border-2 transition-all',
                isActive ? 'border-foreground bg-foreground/10' : 'border-muted-foreground/30',
                r.visual,
              )} />
              <span className={cn(
                'text-[9px] font-medium',
                isActive ? 'text-foreground' : 'text-muted-foreground/70',
              )}>{r.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Live Preview ───────────────────────────────────── */

function LivePreview({ config }: { config: any }) {
  const radiusPx = RADII.find(r => r.value === config.radius)?.px || '8px';
  const styleObj = STYLES.find(s => s.value === config.style);

  const btnBase: React.CSSProperties = {
    borderRadius: radiusPx,
    fontWeight: config.fontWeight || 500,
    textTransform: config.uppercase ? 'uppercase' : 'none',
    letterSpacing: config.uppercase ? '0.06em' : 'normal',
    paddingLeft: `${config.paddingX ?? 16}px`,
    paddingRight: `${config.paddingX ?? 16}px`,
    paddingTop: `${config.paddingY ?? 10}px`,
    paddingBottom: `${config.paddingY ?? 10}px`,
    fontSize: `${config.fontSize ?? 14}px`,
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-px bg-border/60 flex-1" />
        <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 font-semibold">Preview ao vivo</span>
        <div className="h-px bg-border/60 flex-1" />
      </div>

      {/* Simulated storefront context */}
      <div className="relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-b from-secondary/20 to-secondary/50 p-5">
        {/* Decorative product card simulation */}
        <div className="flex flex-col items-center gap-4">
          {/* Fake product image */}
          <div className="w-full h-24 rounded-lg bg-gradient-to-br from-muted/60 to-muted flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-muted-foreground/30" />
          </div>

          {/* Fake product info */}
          <div className="text-center space-y-1">
            <div className="h-3 w-28 bg-foreground/10 rounded-full mx-auto" />
            <div className="h-2.5 w-16 bg-foreground/5 rounded-full mx-auto" />
          </div>

          {/* REAL buttons with live config */}
          <div className="w-full space-y-2">
            <button
              className={cn('w-full transition-all inline-flex items-center justify-center gap-1.5', styleObj?.cssClass, config.shadow && 'shadow-md')}
              style={btnBase}
            >
              <Zap className="h-3.5 w-3.5 shrink-0" />
              <span>Comprar Agora</span>
            </button>
            <button
              className={cn('w-full transition-all inline-flex items-center justify-center gap-1.5 border-2 border-foreground/20 text-foreground bg-transparent', config.shadow && 'shadow-sm')}
              style={btnBase}
            >
              <ShoppingBag className="h-3.5 w-3.5 shrink-0" />
              <span>Adicionar</span>
            </button>
          </div>
        </div>

        {/* Inline buttons row */}
        <div className="mt-4 pt-4 border-t border-border/30 flex items-center gap-2 justify-center flex-wrap">
          {[
            { icon: Heart, text: 'Favoritar' },
            { icon: Send, text: 'Compartilhar' },
            { icon: ArrowRight, text: 'Ver mais' },
          ].map(({ icon: Icon, text }) => (
            <button
              key={text}
              className={cn('transition-all inline-flex items-center gap-1.5 text-foreground border border-foreground/15 bg-foreground/5', config.shadow && 'shadow-sm')}
              style={{ ...btnBase, fontSize: '11px', paddingLeft: '10px', paddingRight: '10px', paddingTop: '6px', paddingBottom: '6px' }}
            >
              <Icon className="h-3 w-3 shrink-0" />
              <span>{text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main Panel ─────────────────────────────────────── */

export function ButtonsPanel() {
  const { draft, updateDraftSection } = useTheme();
  const b = draft.buttons;
  const set = (u: Partial<typeof b>) => updateDraftSection('buttons', u);

  return (
    <EditorSection icon={MousePointer} title="Botões" description="Personalize o estilo, dimensões e comportamento de todos os botões da loja">

      {/* ── Style grid ── */}
      <SectionDivider label="Estilo Visual" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Escolha a aparência base. Todos os botões da loja seguirão este estilo.
      </p>
      <div className="grid grid-cols-4 gap-2">
        {STYLES.map(s => (
          <StyleCard
            key={s.value}
            style={s}
            isActive={b.style === s.value}
            onClick={() => set({ style: s.value as any })}
          />
        ))}
      </div>

      {/* ── Radius visual picker ── */}
      <SectionDivider label="Formato" />
      <RadiusPicker value={b.radius} onChange={v => set({ radius: v as any })} />

      {/* ── Dimensions ── */}
      <SectionDivider label="Dimensões" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Ajuste o tamanho com precisão — o preview atualiza em tempo real.
      </p>
      <NumberSlider label="Padding horizontal" value={b.paddingX ?? 16} onChange={v => set({ paddingX: v })} min={4} max={48} step={2} suffix="px" />
      <NumberSlider label="Padding vertical" value={b.paddingY ?? 10} onChange={v => set({ paddingY: v })} min={2} max={24} step={1} suffix="px" />
      <NumberSlider label="Fonte" value={b.fontSize ?? 14} onChange={v => set({ fontSize: v })} min={10} max={22} step={1} suffix="px" />

      {/* ── Typography & effects ── */}
      <SectionDivider label="Tipografia & Efeitos" />
      <NumberSlider label="Peso da fonte" value={b.fontWeight} onChange={v => set({ fontWeight: v })} min={300} max={900} step={100} suffix="" />
      <ToggleRow label="Texto MAIÚSCULO" hint="Transforma todo texto dos botões em caixa alta" checked={b.uppercase} onChange={v => set({ uppercase: v })} />
      <ToggleRow label="Sombra" hint="Adiciona sombra sutil para dar profundidade" checked={b.shadow} onChange={v => set({ shadow: v })} />

      {/* ── Live preview ── */}
      <LivePreview config={b} />
    </EditorSection>
  );
}
