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
    <EditorSection icon={Code} title="Código Custom" description="Adicione CSS e scripts personalizados para customizações avançadas da loja">
      <SectionDivider label="CSS Personalizado" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Estilos CSS adicionais que serão injetados no final do &lt;head&gt;. Útil para ajustes finos que não estão disponíveis no editor visual.
      </p>
      <div className="space-y-1">
        <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">CSS</Label>
        <Textarea
          value={c.css}
          onChange={e => set({ css: e.target.value })}
          placeholder="/* Seu CSS aqui */&#10;.minha-classe { color: red; }"
          className="font-mono text-xs min-h-[120px] bg-secondary/30 border-border/50"
        />
      </div>

      <SectionDivider label="Scripts no Head" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Scripts JavaScript ou tags HTML injetados no &lt;head&gt;. Ideal para Google Analytics, Facebook Pixel, chat widgets, etc.
      </p>
      <div className="space-y-1">
        <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Scripts</Label>
        <Textarea
          value={c.headScripts}
          onChange={e => set({ headScripts: e.target.value })}
          placeholder="<!-- Google Analytics, Facebook Pixel, etc -->"
          className="font-mono text-xs min-h-[120px] bg-secondary/30 border-border/50"
        />
        <p className="text-[10px] text-warning">⚠️ Use com cuidado. Scripts maliciosos podem comprometer a segurança e desempenho da sua loja.</p>
      </div>
    </EditorSection>
  );
}
