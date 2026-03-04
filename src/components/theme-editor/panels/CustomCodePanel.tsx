import React, { useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, SectionDivider } from '../EditorControls';
import { Code, ShieldAlert } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

/* ------------------------------------------------------------------ */
/*  CSS Sanitization — blocks dangerous patterns                       */
/* ------------------------------------------------------------------ */

const DANGEROUS_CSS_PATTERNS = [
  /expression\s*\(/gi,           // IE CSS expression (JS execution)
  /javascript\s*:/gi,            // javascript: protocol
  /vbscript\s*:/gi,              // vbscript: protocol
  /-moz-binding/gi,              // Firefox XBL binding
  /behavior\s*:/gi,              // IE behaviors (.htc)
  /@import\s+url/gi,             // External CSS import (data exfiltration)
  /url\s*\(\s*['"]?\s*data\s*:/gi,  // data: URI in url() 
  /url\s*\(\s*['"]?\s*javascript/gi, // javascript in url()
  /<\s*script/gi,                // <script> tags
  /<\s*\/\s*script/gi,           // </script> tags
  /<\s*style/gi,                 // nested <style> tags
  /<\s*link/gi,                  // <link> tags
  /<\s*iframe/gi,                // <iframe> injection
  /<\s*object/gi,                // <object> injection
  /<\s*embed/gi,                 // <embed> injection
  /<\s*form/gi,                  // <form> injection
  /<\s*input/gi,                 // <input> injection
  /<\s*img/gi,                   // <img> with onerror
  /on\w+\s*=/gi,                 // inline event handlers (onclick=, onerror=, etc.)
];

function validateCSS(css: string): string[] {
  const warnings: string[] = [];
  for (const pattern of DANGEROUS_CSS_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(css)) {
      warnings.push(`Padrão bloqueado detectado: ${pattern.source.replace(/\\/g, '')}`);
    }
  }
  return warnings;
}

function sanitizeCSS(css: string): string {
  let safe = css;
  for (const pattern of DANGEROUS_CSS_PATTERNS) {
    safe = safe.replace(pattern, '/* [BLOQUEADO] */');
  }
  return safe;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CustomCodePanel() {
  const { draft, updateDraftSection } = useTheme();
  const c = draft.customCode;
  const set = (u: Partial<typeof c>) => updateDraftSection('customCode', u);

  const cssWarnings = useMemo(() => validateCSS(c.css), [c.css]);

  const handleCSSChange = (raw: string) => {
    // Sanitize on save — strip dangerous patterns
    const sanitized = sanitizeCSS(raw);
    set({ css: sanitized });
  };

  return (
    <EditorSection icon={Code} title="Código Custom" description="Adicione CSS personalizado para ajustes visuais avançados da loja">
      <SectionDivider label="CSS Personalizado" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Estilos CSS adicionais aplicados na loja. Padrões perigosos (scripts, imports externos, expressões) são bloqueados automaticamente.
      </p>
      <div className="space-y-1">
        <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">CSS</Label>
        <Textarea
          value={c.css}
          onChange={e => handleCSSChange(e.target.value)}
          placeholder="/* Seu CSS aqui */&#10;.minha-classe { color: red; }"
          className="font-mono text-xs min-h-[120px] bg-secondary/30 border-border/50"
        />
      </div>

      {cssWarnings.length > 0 && (
        <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <ShieldAlert className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="text-xs font-medium text-destructive">Conteúdo perigoso bloqueado</p>
            {cssWarnings.map((w, i) => (
              <p key={i} className="text-[10px] text-destructive/80">{w}</p>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 p-3 bg-muted/30 border border-border/30 rounded-lg">
        <ShieldAlert className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
        <div className="space-y-1">
          <p className="text-xs font-medium text-foreground">Proteções de segurança ativas</p>
          <ul className="text-[10px] text-muted-foreground space-y-0.5 list-disc pl-3">
            <li>Tags HTML e scripts são removidos automaticamente</li>
            <li>Expressões JavaScript em CSS são bloqueadas</li>
            <li>Imports externos e data URIs são bloqueados</li>
            <li>Handlers de eventos inline são removidos</li>
          </ul>
        </div>
      </div>
    </EditorSection>
  );
}
