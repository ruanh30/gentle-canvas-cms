import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { themePresets } from '@/data/theme-presets';
import { EditorSection, SectionDivider } from '../EditorControls';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function PresetsPanel() {
  const { applyPreset } = useTheme();

  return (
    <EditorSection icon={Sparkles} title="Temas Prontos" description="Comece com um preset e personalize">
      <div className="space-y-2">
        {themePresets.map(preset => (
          <button
            key={preset.id}
            onClick={() => {
              applyPreset(preset.config);
              toast.success(`Preset "${preset.name}" aplicado ao rascunho!`);
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-foreground/30 transition-all text-left group"
          >
            <span className="text-2xl">{preset.thumbnail}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium group-hover:text-foreground">{preset.name}</p>
              <p className="text-[11px] text-muted-foreground truncate">{preset.description}</p>
            </div>
            {preset.config.colors && (
              <div className="flex gap-0.5 shrink-0">
                <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: preset.config.colors.primary }} />
                <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: preset.config.colors.accent }} />
                <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: preset.config.colors.buyNow }} />
              </div>
            )}
          </button>
        ))}
      </div>
    </EditorSection>
  );
}
