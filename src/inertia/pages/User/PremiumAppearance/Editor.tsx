/**
 * Inertia Page: User/PremiumAppearance/Editor
 * 
 * This is the theme editor page rendered inside the admin panel.
 * It receives draft/published theme configs from the server and uses
 * ThemeProvider in Inertia mode (with onSaveDraft/onPublish callbacks).
 * 
 * This file mirrors the one already deployed on the server at:
 * resources/js/inertia/Pages/User/PremiumAppearance/Editor.tsx
 */
import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeEditorLayout } from '@/components/theme-editor/ThemeEditorLayout';

// In Inertia mode, this uses usePage() and router:
//
// import { Head, usePage, router } from '@inertiajs/react';
//
// type Props = {
//   theme: string;
//   draft: any;
//   published: any;
//   draftVersion: number;
//   publishedVersion: number;
//   previewUrl: string;
// };
//
// export default function Editor() {
//   const { props } = usePage<{ props: Props }>() as any;
//   const p = props as Props;
//
//   return (
//     <>
//       <Head title="Editor Premium" />
//       <ThemeProvider
//         initialDraft={p.draft}
//         initialPublished={p.published}
//         onSaveDraft={(config, label) => {
//           router.post('/user/site-settings/appearance-premium/save', { config, label }, { preserveScroll: true });
//         }}
//         onPublish={(label) => {
//           router.post('/user/site-settings/appearance-premium/publish', { label }, { preserveScroll: true });
//         }}
//       >
//         <ThemeEditorLayout previewUrl={p.previewUrl} />
//       </ThemeProvider>
//     </>
//   );
// }

// Standalone Lovable preview — uses localStorage mode
export default function EditorStandalone() {
  return (
    <ThemeProvider>
      <ThemeEditorLayout />
    </ThemeProvider>
  );
}
