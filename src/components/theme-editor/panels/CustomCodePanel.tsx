import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, SectionDivider } from '../EditorControls';
import { Code } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function CustomCodePanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.customCode;
  const set = (u: Partial<typeof c>) => updateDraftSection('customCode', u);

  return (
    <EditorSection icon={Code} title="Código Custom" description="CSS e scripts personalizados (avançado)">
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">CSS personalizado</Label>
        <Textarea
          value={c.css}
          onChange={e => set({ css: e.target.value })}
          placeholder="/* Seu CSS aqui */"
          className="font-mono text-xs min-h-[120px]"
        />
        <p className="text-[10px] text-muted-foreground">Adicionado ao final do &lt;head&gt;</p>
      </div>
      <SectionDivider />
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">Scripts (head)</Label>
        <Textarea
          value={c.headScripts}
          onChange={e => set({ headScripts: e.target.value })}
          placeholder="<!-- Scripts aqui -->"
          className="font-mono text-xs min-h-[120px]"
        />
        <p className="text-[10px] text-muted-foreground">⚠️ Use com cuidado. Scripts maliciosos podem comprometer sua loja.</p>
      </div>
    </EditorSection>
  );
}
