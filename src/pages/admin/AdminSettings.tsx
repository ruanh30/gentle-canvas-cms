import React, { useState } from 'react';
import { mockStoreSettings } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2 } from 'lucide-react';

interface ShippingRule {
  id: string;
  region: string;
  minDays: number;
  maxDays: number;
  price: number;
  freeAbove?: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  enabled: boolean;
  instructions?: string;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState(mockStoreSettings);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 'pm-1', name: 'Cartão de Crédito', enabled: true, instructions: 'Até 12x sem juros' },
    { id: 'pm-2', name: 'PIX', enabled: true, instructions: '5% de desconto' },
    { id: 'pm-3', name: 'Boleto Bancário', enabled: true, instructions: 'Vencimento em 3 dias' },
    { id: 'pm-4', name: 'Transferência', enabled: false },
  ]);

  const [shippingRules, setShippingRules] = useState<ShippingRule[]>([
    { id: 'sr-1', region: 'Sudeste', minDays: 3, maxDays: 5, price: 15.90, freeAbove: 299 },
    { id: 'sr-2', region: 'Sul', minDays: 4, maxDays: 7, price: 19.90, freeAbove: 299 },
    { id: 'sr-3', region: 'Nordeste', minDays: 5, maxDays: 10, price: 24.90, freeAbove: 399 },
    { id: 'sr-4', region: 'Norte', minDays: 7, maxDays: 12, price: 29.90 },
    { id: 'sr-5', region: 'Centro-Oeste', minDays: 5, maxDays: 8, price: 19.90, freeAbove: 349 },
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Configurações salvas!');
  };

  const togglePayment = (id: string) => {
    setPaymentMethods(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const addShippingRule = () => {
    setShippingRules(prev => [...prev, { id: `sr-${Date.now()}`, region: '', minDays: 3, maxDays: 7, price: 0 }]);
  };

  const removeShippingRule = (id: string) => {
    setShippingRules(prev => prev.filter(r => r.id !== id));
  };

  const updateShippingRule = (id: string, field: keyof ShippingRule, value: string | number) => {
    setShippingRules(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList className="flex-wrap h-auto">
        <TabsTrigger value="general" className="font-body">Geral</TabsTrigger>
        <TabsTrigger value="shipping" className="font-body">Frete</TabsTrigger>
        <TabsTrigger value="payments" className="font-body">Pagamentos</TabsTrigger>
        <TabsTrigger value="social" className="font-body">Redes Sociais</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader><CardTitle className="text-base">Informações da Loja</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div><Label>Nome da loja</Label><Input value={settings.storeName} onChange={e => setSettings(s => ({ ...s, storeName: e.target.value }))} className="mt-1" /></div>
              <div><Label>Descrição</Label><Textarea value={settings.description} onChange={e => setSettings(s => ({ ...s, description: e.target.value }))} className="mt-1" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>E-mail de contato</Label><Input value={settings.contactEmail} onChange={e => setSettings(s => ({ ...s, contactEmail: e.target.value }))} className="mt-1" /></div>
                <div><Label>Telefone</Label><Input value={settings.contactPhone} onChange={e => setSettings(s => ({ ...s, contactPhone: e.target.value }))} className="mt-1" /></div>
              </div>
              <Button type="submit" className="font-body">Salvar</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="shipping">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Regras de Frete por Região</CardTitle>
              <Button variant="outline" size="sm" onClick={addShippingRule}>
                <Plus className="h-4 w-4 mr-1" /> Adicionar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {shippingRules.map(rule => (
              <div key={rule.id} className="flex items-end gap-3 p-3 border rounded-lg bg-secondary/20">
                <div className="flex-1">
                  <Label className="text-xs">Região</Label>
                  <Input value={rule.region} onChange={e => updateShippingRule(rule.id, 'region', e.target.value)} className="mt-1" />
                </div>
                <div className="w-20">
                  <Label className="text-xs">Min dias</Label>
                  <Input type="number" value={rule.minDays} onChange={e => updateShippingRule(rule.id, 'minDays', Number(e.target.value))} className="mt-1" />
                </div>
                <div className="w-20">
                  <Label className="text-xs">Max dias</Label>
                  <Input type="number" value={rule.maxDays} onChange={e => updateShippingRule(rule.id, 'maxDays', Number(e.target.value))} className="mt-1" />
                </div>
                <div className="w-24">
                  <Label className="text-xs">Preço (R$)</Label>
                  <Input type="number" step="0.01" value={rule.price} onChange={e => updateShippingRule(rule.id, 'price', Number(e.target.value))} className="mt-1" />
                </div>
                <div className="w-28">
                  <Label className="text-xs">Grátis acima</Label>
                  <Input type="number" step="0.01" value={rule.freeAbove || ''} onChange={e => updateShippingRule(rule.id, 'freeAbove', Number(e.target.value) || undefined as any)} placeholder="—" className="mt-1" />
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeShippingRule(rule.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button onClick={handleSave} className="font-body">Salvar Frete</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="payments">
        <Card>
          <CardHeader><CardTitle className="text-base">Métodos de Pagamento</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map(pm => (
              <div key={pm.id} className="flex items-center gap-4 p-3 border rounded-lg bg-secondary/20">
                <Switch checked={pm.enabled} onCheckedChange={() => togglePayment(pm.id)} />
                <div className="flex-1">
                  <p className="font-medium text-sm">{pm.name}</p>
                  {pm.instructions && <p className="text-xs text-muted-foreground">{pm.instructions}</p>}
                </div>
              </div>
            ))}
            <Button onClick={handleSave} className="font-body">Salvar Pagamentos</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="social">
        <Card>
          <CardHeader><CardTitle className="text-base">Redes Sociais</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div><Label>Instagram</Label><Input value={settings.socialLinks.instagram || ''} onChange={e => setSettings(s => ({ ...s, socialLinks: { ...s.socialLinks, instagram: e.target.value } }))} className="mt-1" /></div>
              <div><Label>WhatsApp</Label><Input value={settings.socialLinks.whatsapp || ''} onChange={e => setSettings(s => ({ ...s, socialLinks: { ...s.socialLinks, whatsapp: e.target.value } }))} className="mt-1" /></div>
              <div><Label>Facebook</Label><Input value={settings.socialLinks.facebook || ''} onChange={e => setSettings(s => ({ ...s, socialLinks: { ...s.socialLinks, facebook: e.target.value } }))} className="mt-1" /></div>
              <Button type="submit" className="font-body">Salvar</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AdminSettings;
