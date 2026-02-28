import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, TextField, ToggleRow, SectionDivider } from '../EditorControls';
import { Globe } from 'lucide-react';

export function SEOPanel() {
  const { draft, updateDraftSection } = useTheme();
  const s = draft.seo;
  const set = (u: Partial<typeof s>) => updateDraftSection('seo', u);

  return (
    <EditorSection icon={Globe} title="SEO" description="Otimização para mecanismos de busca como Google, Bing e redes sociais">
      <SectionDivider label="Título e Descrição" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Define o título e descrição que aparecem nos resultados de busca do Google.
      </p>
      <TextField label="Template do título" value={s.titleTemplate} onChange={v => set({ titleTemplate: v })} placeholder="{page} | {storeName}" />
      <p className="text-[10px] text-muted-foreground/50 -mt-1">
        Use {'{page}'} para o nome da página e {'{storeName}'} para o nome da loja.
      </p>
      <TextField label="Descrição padrão" value={s.defaultDescription} onChange={v => set({ defaultDescription: v })} multiline />

      <SectionDivider label="Redes Sociais (Open Graph)" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Imagem exibida quando a loja é compartilhada no WhatsApp, Facebook, Twitter, etc.
      </p>
      <TextField label="URL da imagem OG" value={s.ogImage} onChange={v => set({ ogImage: v })} placeholder="https://..." />

      <SectionDivider label="Navegação" />
      <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
        Breadcrumbs ajudam tanto o usuário quanto o Google a entender a estrutura do site.
      </p>
      <ToggleRow label="Exibir breadcrumbs" hint="Mostra o caminho de navegação em todas as páginas (ex: Home > Camisetas > Produto XYZ)" checked={s.showBreadcrumbs} onChange={v => set({ showBreadcrumbs: v })} />
    </EditorSection>
  );
}
