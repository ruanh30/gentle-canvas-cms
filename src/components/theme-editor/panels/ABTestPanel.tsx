import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, TextField, SectionDivider } from '../EditorControls';
import { FlaskConical, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ABTestPanel() {
  const { draft, updateDraftSection } = useTheme();
  const ab = draft.abTest ?? { enabled: false, tests: [] };
  const set = (u: Partial<typeof ab>) => updateDraftSection('abTest', u as any);

  const addTest = () => {
    set({
      tests: [...ab.tests, {
        id: `test-${Date.now()}`,
        name: 'Novo teste',
        sectionId: '',
        variantA: { title: 'Variante A' },
        variantB: { title: 'Variante B' },
        activeVariant: 'random' as const,
        clicksA: 0,
        clicksB: 0,
      }],
    });
  };

  const updateTest = (id: string, updates: any) => {
    set({ tests: ab.tests.map(t => t.id === id ? { ...t, ...updates } : t) });
  };

  const removeTest = (id: string) => {
    set({ tests: ab.tests.filter(t => t.id !== id) });
  };

  const sections = draft.homepageSections?.filter(s => s.type === 'banner' || s.type === 'hero') || [];

  return (
    <EditorSection icon={FlaskConical} title="Teste A/B" description="Configure testes A/B simples para banners e seções da home com métrica de cliques">
      <ToggleRow label="Ativar testes A/B" hint="Permite testar variações de banners para otimizar conversão" checked={ab.enabled} onChange={v => set({ enabled: v })} />
      {ab.enabled && (
        <>
          <SectionDivider label="Testes Ativos" />
          <div className="space-y-3">
            {ab.tests.map(test => {
              const total = test.clicksA + test.clicksB;
              const pctA = total > 0 ? Math.round((test.clicksA / total) * 100) : 50;
              const pctB = total > 0 ? Math.round((test.clicksB / total) * 100) : 50;

              return (
                <div key={test.id} className="border border-border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Input value={test.name} onChange={e => updateTest(test.id, { name: e.target.value })} className="h-7 text-xs flex-1 mr-2" />
                    <button onClick={() => removeTest(test.id)} className="p-1 text-destructive hover:bg-destructive/10 rounded">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>

                  <Select value={test.sectionId} onValueChange={v => updateTest(test.id, { sectionId: v })}>
                    <SelectTrigger className="h-7 text-xs"><SelectValue placeholder="Selecionar seção" /></SelectTrigger>
                    <SelectContent>
                      {sections.map(s => <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>)}
                    </SelectContent>
                  </Select>

                  <Select value={test.activeVariant} onValueChange={v => updateTest(test.id, { activeVariant: v })}>
                    <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="random">Aleatório (50/50)</SelectItem>
                      <SelectItem value="A">Forçar Variante A</SelectItem>
                      <SelectItem value="B">Forçar Variante B</SelectItem>
                    </SelectContent>
                  </Select>

                  {total > 0 && (
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground">Resultados ({total} cliques):</p>
                      <div className="flex gap-2 h-4">
                        <div className="bg-blue-500 rounded-sm transition-all" style={{ width: `${pctA}%` }} />
                        <div className="bg-orange-500 rounded-sm transition-all" style={{ width: `${pctB}%` }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>A: {test.clicksA} ({pctA}%)</span>
                        <span>B: {test.clicksB} ({pctB}%)</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <Button size="sm" variant="outline" className="w-full h-8 text-xs" onClick={addTest}>
            <Plus className="h-3.5 w-3.5 mr-1" /> Criar teste A/B
          </Button>
        </>
      )}
    </EditorSection>
  );
}
