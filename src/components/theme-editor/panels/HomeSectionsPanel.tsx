import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, SectionDivider } from '../EditorControls';
import { Grid3X3, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HomeSectionsPanel() {
  const { draft, toggleSection, reorderSections } = useTheme();
  const sections = draft.homepageSections;

  return (
    <EditorSection icon={Grid3X3} title="Seções da Home" description="Ative, desative e reordene as seções">
      <p className="text-[11px] text-muted-foreground">Arraste ou use as setas para reordenar.</p>
      <div className="space-y-1">
        {sections.map((section, idx) => (
          <div
            key={section.id}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors',
              section.enabled ? 'bg-secondary border-border' : 'bg-muted/30 border-transparent opacity-60'
            )}
          >
            <GripVertical className="h-3.5 w-3.5 text-muted-foreground shrink-0 cursor-grab" />
            <span className="text-sm font-medium flex-1">{section.title}</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => idx > 0 && reorderSections(idx, idx - 1)}
                className="p-0.5 hover:bg-background rounded"
                disabled={idx === 0}
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => idx < sections.length - 1 && reorderSections(idx, idx + 1)}
                className="p-0.5 hover:bg-background rounded"
                disabled={idx === sections.length - 1}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
            <input
              type="checkbox"
              checked={section.enabled}
              onChange={() => toggleSection(section.id)}
              className="rounded"
            />
          </div>
        ))}
      </div>
    </EditorSection>
  );
}
