import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { themePresets } from '@/data/theme-presets';
import { EditorSection } from '../EditorControls';
import { Palette, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

function ColorBar({ colors }: { colors: { primary: string; accent: string; buyNow: string; background: string; foreground: string } }) {
  const swatches = [
    colors.primary,
    colors.accent,
    colors.buyNow,
    colors.background,
    colors.foreground,
  ].filter(Boolean) as string[];

  return (
    <div className="flex h-8 w-12 rounded-md overflow-hidden border border-border/30 shadow-sm shrink-0">
      {swatches.map((c, i) => (
        <div key={i} className="flex-1" style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}

export function PresetsPanel() {
  const { applyPreset, draft } = useTheme();

  return (
    <EditorSection icon={Palette} title="Temas Prontos" description="Selecione um tema base e personalize cada detalhe ao seu gosto">
      <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
        Cada preset aplica cores, fontes e estilos ao rascunho. Você pode personalizar tudo depois.
      </p>
      <div className="space-y-1">
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
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all text-left group',
                isActive
                  ? 'border-foreground/20 bg-foreground/[0.04] ring-1 ring-foreground/10'
                  : 'border-transparent hover:border-border/60 hover:bg-secondary/30'
              )}
            >
              {colors ? (
                <ColorBar colors={colors} />
              ) : (
                <div className="h-8 w-12 rounded-md bg-secondary border border-border/30 shrink-0" />
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-medium text-foreground/90 group-hover:text-foreground truncate">
                    {preset.name}
                  </span>
                  {isActive && (
                    <span className="shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-foreground/10">
                      <Check className="h-2.5 w-2.5 text-foreground/70" />
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground/60 leading-snug mt-0.5 truncate">
                  {preset.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </EditorSection>
  );
}
