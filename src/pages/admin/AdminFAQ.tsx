import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Edit, GripVertical, HelpCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const defaultFAQ: FAQItem[] = [
  { id: 'faq-1', question: 'Qual o prazo de entrega?', answer: 'O prazo de entrega varia de 3 a 10 dias úteis, dependendo da sua região.' },
  { id: 'faq-2', question: 'Como faço para trocar um produto?', answer: 'Você pode solicitar a troca em até 30 dias após o recebimento, entrando em contato conosco.' },
  { id: 'faq-3', question: 'Quais formas de pagamento são aceitas?', answer: 'Aceitamos cartão de crédito, PIX, boleto bancário e transferência.' },
  { id: 'faq-4', question: 'O frete é grátis?', answer: 'Sim! Para compras acima de R$ 299,00, o frete é gratuito para todo o Brasil.' },
];

const AdminFAQ = () => {
  const [items, setItems] = useState<FAQItem[]>(defaultFAQ);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<FAQItem | null>(null);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      question: form.get('question') as string,
      answer: form.get('answer') as string,
    };

    if (editItem) {
      setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...data } : i));
      toast.success('Pergunta atualizada');
    } else {
      setItems(prev => [...prev, { ...data, id: `faq-${Date.now()}` }]);
      toast.success('Pergunta adicionada');
    }
    setShowForm(false);
    setEditItem(null);
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    toast.success('Pergunta removida');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">Perguntas frequentes exibidas na loja.</p>
        <Button onClick={() => { setEditItem(null); setShowForm(true); }} className="font-body">
          <Plus className="h-4 w-4 mr-2" /> Nova Pergunta
        </Button>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <GripVertical className="h-4 w-4 text-muted-foreground mt-1 cursor-grab shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                    <h3 className="font-medium text-sm">{item.question}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">{item.answer}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => { setEditItem(item); setShowForm(true); }}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editItem ? 'Editar Pergunta' : 'Nova Pergunta'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div><Label>Pergunta</Label><Input name="question" required defaultValue={editItem?.question} className="mt-1" /></div>
            <div><Label>Resposta</Label><Textarea name="answer" required defaultValue={editItem?.answer} className="mt-1 min-h-[100px]" /></div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFAQ;
