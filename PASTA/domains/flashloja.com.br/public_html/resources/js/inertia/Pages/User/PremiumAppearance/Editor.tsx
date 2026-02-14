import React from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeEditorLayout } from '@/components/theme-editor/ThemeEditorLayout';

type Props = {
  theme: string;
  initialDraft: any;
  initialPublished: any;
  draftVersion: number;
  publishedVersion: number;
  previewUrl: string;
};

export default function Editor() {
  const { props } = usePage<{ props: Props }>() as any;
  const p = props as Props;

  return (
    <>
      <Head title="Editor Premium" />
      <style>{`
        /* Hide admin sidebar and expand editor to full viewport */
        .main-sidebar, .control-sidebar, .main-header { display: none !important; }
        .content-wrapper, .main-panel { margin-left: 0 !important; padding: 0 !important; min-height: 100vh !important; }
        .content, .container-fluid, .container-xl { padding: 0 !important; margin: 0 !important; max-width: 100% !important; }
        body { overflow: hidden; }
      `}</style>
      <ThemeProvider
        initialDraft={p.initialDraft}
        initialPublished={p.initialPublished}
        onSaveDraft={(config, label) => {
          router.post(
            '/user/site-settings/appearance-premium/save',
            { config, label },
            { preserveScroll: true }
          );
        }}
        onPublish={(label) => {
          router.post(
            '/user/site-settings/appearance-premium/publish',
            { label },
            { preserveScroll: true }
          );
        }}
      >
        <ThemeEditorLayout previewUrl={p.previewUrl} fullscreen={true} />
      </ThemeProvider>
    </>
  );
}
