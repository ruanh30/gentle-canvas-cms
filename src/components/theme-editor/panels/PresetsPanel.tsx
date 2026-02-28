import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { themePresets } from '@/data/theme-presets';
import { EditorSection } from '../EditorControls';
import { Palette, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface MiniColors {
  primary: string;
  background: string;
  foreground: string;
  accent: string;
  buyNow: string;
  border?: string;
}

function StoreMiniPreview({ colors }: { colors: MiniColors }) {
  const bg = colors.background;
  const fg = colors.foreground;
  const pr = colors.primary;
  const ac = colors.accent;
  const bn = colors.buyNow;
  const bd = colors.border || '#e5e5e5';

  return (
    <svg
      viewBox="0 0 64 48"
      className="w-14 h-10 rounded-md border border-border/30 shadow-sm shrink-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="64" height="48" fill={bg} />

      {/* Header bar */}
      <rect width="64" height="8" fill={pr} />
      {/* Logo placeholder */}
      <rect x="3" y="2.5" width="10" height="3" rx="0.5" fill={bg} opacity="0.9" />
      {/* Nav dots */}
      <circle cx="30" cy="4" r="1" fill={bg} opacity="0.5" />
      <circle cx="34" cy="4" r="1" fill={bg} opacity="0.5" />
      <circle cx="38" cy="4" r="1" fill={bg} opacity="0.5" />
      {/* Cart icon */}
      <rect x="56" y="2.5" width="5" height="3" rx="0.5" fill={bg} opacity="0.6" />

      {/* Hero section */}
      <rect x="0" y="8" width="64" height="14" fill={ac} />
      <rect x="6" y="12" width="20" height="2" rx="0.5" fill={fg} opacity="0.7" />
      <rect x="6" y="15.5" width="14" height="1.5" rx="0.5" fill={fg} opacity="0.3" />
      <rect x="6" y="18" width="12" height="3" rx="1" fill={bn} />

      {/* Product cards */}
      <rect x="3" y="24" width="13" height="18" rx="1" fill={bg} stroke={bd} strokeWidth="0.5" />
      <rect x="3" y="24" width="13" height="10" rx="1" fill={ac} opacity="0.5" />
      <rect x="5" y="35.5" width="9" height="1" rx="0.3" fill={fg} opacity="0.4" />
      <rect x="5" y="37.5" width="6" height="1.5" rx="0.3" fill={fg} opacity="0.6" />
      <rect x="5" y="40" width="9" height="1.5" rx="0.5" fill={bn} opacity="0.8" />

      <rect x="19" y="24" width="13" height="18" rx="1" fill={bg} stroke={bd} strokeWidth="0.5" />
      <rect x="19" y="24" width="13" height="10" rx="1" fill={ac} opacity="0.5" />
      <rect x="21" y="35.5" width="9" height="1" rx="0.3" fill={fg} opacity="0.4" />
      <rect x="21" y="37.5" width="6" height="1.5" rx="0.3" fill={fg} opacity="0.6" />
      <rect x="21" y="40" width="9" height="1.5" rx="0.5" fill={bn} opacity="0.8" />

      <rect x="35" y="24" width="13" height="18" rx="1" fill={bg} stroke={bd} strokeWidth="0.5" />
      <rect x="35" y="24" width="13" height="10" rx="1" fill={ac} opacity="0.5" />
      <rect x="37" y="35.5" width="9" height="1" rx="0.3" fill={fg} opacity="0.4" />
      <rect x="37" y="37.5" width="6" height="1.5" rx="0.3" fill={fg} opacity="0.6" />
      <rect x="37" y="40" width="9" height="1.5" rx="0.5" fill={bn} opacity="0.8" />

      <rect x="51" y="24" width="13" height="18" rx="1" fill={bg} stroke={bd} strokeWidth="0.5" />
      <rect x="51" y="24" width="13" height="10" rx="1" fill={ac} opacity="0.5" />
      <rect x="53" y="35.5" width="9" height="1" rx="0.3" fill={fg} opacity="0.4" />
      <rect x="53" y="37.5" width="6" height="1.5" rx="0.3" fill={fg} opacity="0.6" />
      <rect x="53" y="40" width="9" height="1.5" rx="0.5" fill={bn} opacity="0.8" />
    </svg>
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
                <StoreMiniPreview colors={colors} />
              ) : (
                <div className="w-14 h-10 rounded-md bg-secondary border border-border/30 shrink-0" />
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
