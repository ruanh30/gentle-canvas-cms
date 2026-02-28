import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { themePresets } from '@/data/theme-presets';
import { EditorSection, SectionDivider } from '../EditorControls';
import { Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function PresetsPanel() {
  const { applyPreset, draft } = useTheme();

  return (
    <EditorSection icon={Sparkles} title="Temas Prontos" description="Selecione um tema base e personalize cada detalhe ao seu gosto">
      <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
        Cada preset aplica cores, fontes e estilos ao rascunho. Você pode personalizar tudo depois.
      </p>
      <div className="space-y-1.5">
        {themePresets.map(preset => {
          const colors = preset.config.colors;
          const isActive = colors && draft.colors.primary === colors.primary && draft.colors.background === colors.background;
          
          return (
            <button
              key={preset.id}
              onClick={() => {
                applyPreset(preset.config);
                toast.success(`Preset "${preset.name}" aplicado ao rascunho!`);
              }}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left group',
                isActive
                  ? 'border-foreground/20 bg-foreground/5 shadow-sm'
                  : 'border-border/50 hover:border-foreground/20 hover:bg-secondary/30'
              )}
            >
              {/* Color palette swatch */}
              {colors ? (
                <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden grid grid-cols-2 grid-rows-2 border border-border/30 shadow-sm">
                  <div style={{ backgroundColor: colors.primary }} />
                  <div style={{ backgroundColor: colors.background }} />
                  <div style={{ backgroundColor: colors.accent }} />
                  <div style={{ backgroundColor: colors.buyNow }} />
                </div>
              ) : (
                <div className="shrink-0 w-10 h-10 rounded-lg bg-secondary border border-border/30" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-[12px] font-semibold text-foreground/90 group-hover:text-foreground">{preset.name}</p>
                  {isActive && <Check className="h-3 w-3 text-foreground/60" />}
                </div>
                <p className="text-[10px] text-muted-foreground/70 leading-snug mt-0.5">{preset.description}</p>
              </div>
              {/* Full color strip */}
              {colors && (
                <div className="flex flex-col gap-0.5 shrink-0">
                  <div className="flex gap-px">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.primary }} title="Primária" />
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.accent }} title="Destaque" />
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.buyNow }} title="Comprar" />
                  </div>
                  <div className="flex gap-px">
                    <div className="w-3 h-3 rounded-sm border border-border/20" style={{ backgroundColor: colors.background }} title="Fundo" />
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.foreground }} title="Texto" />
                    <div className="w-3 h-3 rounded-sm border border-border/20" style={{ backgroundColor: colors.border || '#e5e5e5' }} title="Borda" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </EditorSection>
  );
}
