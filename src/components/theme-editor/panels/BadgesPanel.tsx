import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSection, ToggleRow, TextField, NumberSlider, OptionPicker, SectionDivider, ColorInput } from '../EditorControls';
import { Award, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ThemeBadgeRule } from '@/types/theme';

export function BadgesPanel() {
  const { draft, updateDraftSection } = useTheme();
  const b = draft.badges ?? { enabled: true, rules: [], position: 'top-left', maxVisible: 2 };
  const set = (u: Partial<typeof b>) => updateDraftSection('badges', u as any);

  const updateRule = (id: string, updates: Partial<ThemeBadgeRule>) => {
    set({ rules: b.rules.map(r => r.id === id ? { ...r, ...updates } : r) });
  };

  const addRule = () => {
    const newRule: ThemeBadgeRule = {
      id: `b-${Date.now()}`,
      label: 'Nova Badge',
      condition: 'manual',
      color: '#6b7280',
      textColor: '#ffffff',
      style: 'pill',
      enabled: true,
      daysNew: 30,
      stockThreshold: 5,
    };
    set({ rules: [...b.rules, newRule] });
  };

  const removeRule = (id: string) => {
    set({ rules: b.rules.filter(r => r.id !== id) });
  };

  return (
    <EditorSection icon={Award} title="Badges / Etiquetas" description="Configure etiquetas automáticas e manuais que aparecem nos cards de produto">
      <ToggleRow label="Ativar badges" hint="Exibe etiquetas como 'Novo', 'Oferta', 'Frete Grátis' nos produtos" checked={b.enabled} onChange={v => set({ enabled: v })} />
      {b.enabled && (
        <>
          <OptionPicker label="Posição nos cards" value={b.position} onChange={v => set({ position: v })} options={[
            { value: 'top-left', label: 'Topo Esquerdo' },
            { value: 'top-right', label: 'Topo Direito' },
            { value: 'bottom-left', label: 'Inferior Esquerdo' },
          ]} />
          <NumberSlider label="Máximo visível por produto" value={b.maxVisible} onChange={v => set({ maxVisible: v })} min={1} max={4} />

          <SectionDivider label="Regras de Badges" />
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed -mt-2">
            Configure condições automáticas ou manuais para exibir etiquetas nos produtos.
          </p>

          <div className="space-y-2">
            {b.rules.map(rule => (
              <div key={rule.id} className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: rule.color, color: rule.textColor }}>
                      {rule.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={rule.enabled} onCheckedChange={v => updateRule(rule.id, { enabled: v })} />
                    <button onClick={() => removeRule(rule.id)} className="p-1 hover:bg-destructive/10 rounded text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                {rule.enabled && (
                  <>
                    <Input value={rule.label} onChange={e => updateRule(rule.id, { label: e.target.value })} className="h-7 text-xs" placeholder="Texto da badge" />
                    <Select value={rule.condition} onValueChange={v => updateRule(rule.id, { condition: v as any })}>
                      <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="new">Novo (por data de criação)</SelectItem>
                        <SelectItem value="bestseller">Mais Vendido</SelectItem>
                        <SelectItem value="free-shipping">Frete Grátis</SelectItem>
                        <SelectItem value="low-stock">Estoque Baixo</SelectItem>
                        <SelectItem value="on-sale">Em Promoção</SelectItem>
                      </SelectContent>
                    </Select>
                    {rule.condition === 'new' && (
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] text-muted-foreground">Dias como "novo":</label>
                        <Input type="number" value={rule.daysNew} onChange={e => updateRule(rule.id, { daysNew: Number(e.target.value) })} className="h-6 text-xs w-16" />
                      </div>
                    )}
                    {rule.condition === 'low-stock' && (
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] text-muted-foreground">Limiar de estoque:</label>
                        <Input type="number" value={rule.stockThreshold} onChange={e => updateRule(rule.id, { stockThreshold: Number(e.target.value) })} className="h-6 text-xs w-16" />
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-muted-foreground">Cor fundo</label>
                        <input type="color" value={rule.color} onChange={e => updateRule(rule.id, { color: e.target.value })} className="h-6 w-full rounded border cursor-pointer" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-muted-foreground">Cor texto</label>
                        <input type="color" value={rule.textColor} onChange={e => updateRule(rule.id, { textColor: e.target.value })} className="h-6 w-full rounded border cursor-pointer" />
                      </div>
                    </div>
                    <Select value={rule.style} onValueChange={v => updateRule(rule.id, { style: v as any })}>
                      <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pill">Pílula</SelectItem>
                        <SelectItem value="corner">Canto</SelectItem>
                        <SelectItem value="ribbon">Faixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                )}
              </div>
            ))}
          </div>

          <Button size="sm" variant="outline" className="w-full h-8 text-xs" onClick={addRule}>
            <Plus className="h-3.5 w-3.5 mr-1" /> Adicionar regra
          </Button>
        </>
      )}
    </EditorSection>
  );
}
