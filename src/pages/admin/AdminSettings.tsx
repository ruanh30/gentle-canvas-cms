import React, { useState } from 'react';
import { mockStoreSettings } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminSettings = () => {
  const [settings, setSettings] = useState(mockStoreSettings);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Configurações salvas!');
  };

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general" className="font-body">Geral</TabsTrigger>
        <TabsTrigger value="shipping" className="font-body">Frete</TabsTrigger>
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
          <CardHeader><CardTitle className="text-base">Configurações de Frete</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div><Label>Taxa fixa de frete (R$)</Label><Input type="number" step="0.01" value={settings.shippingFlatRate} onChange={e => setSettings(s => ({ ...s, shippingFlatRate: Number(e.target.value) }))} className="mt-1" /></div>
              <div><Label>Frete grátis acima de (R$)</Label><Input type="number" step="0.01" value={settings.freeShippingThreshold} onChange={e => setSettings(s => ({ ...s, freeShippingThreshold: Number(e.target.value) }))} className="mt-1" /></div>
              <Button type="submit" className="font-body">Salvar</Button>
            </form>
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
