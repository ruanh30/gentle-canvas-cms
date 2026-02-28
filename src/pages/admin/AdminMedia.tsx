import React from 'react';
import { ImageIcon, Upload, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const mockMedia = [
  { id: 1, name: 'hero-banner.jpg', size: '245 KB', date: '28/02/2026' },
  { id: 2, name: 'product-01.png', size: '128 KB', date: '27/02/2026' },
  { id: 3, name: 'product-02.png', size: '156 KB', date: '27/02/2026' },
  { id: 4, name: 'logo.svg', size: '12 KB', date: '25/02/2026' },
  { id: 5, name: 'banner-promo.jpg', size: '310 KB', date: '24/02/2026' },
  { id: 6, name: 'category-shoes.jpg', size: '198 KB', date: '23/02/2026' },
];

export default function AdminMedia() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Mídia</h1>
          <p className="text-sm text-muted-foreground">Gerencie imagens e arquivos da sua loja</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => navigate('/admin/customization')}>
            <Palette className="h-4 w-4" />
            Editor de Tema
          </Button>
          <Button size="sm" className="gap-1.5">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {mockMedia.map(file => (
          <div key={file.id} className="group border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors cursor-pointer">
            <div className="aspect-square bg-muted/50 flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
            </div>
            <div className="p-2.5">
              <p className="text-xs font-medium text-foreground truncate">{file.name}</p>
              <p className="text-[10px] text-muted-foreground">{file.size} · {file.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
