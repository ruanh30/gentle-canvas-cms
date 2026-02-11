import React from 'react';
import { Link } from 'react-router-dom';
import { mockStoreSettings } from '@/data/mock';
import { Instagram } from 'lucide-react';

export function StoreFooter() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-lg font-bold mb-4">{mockStoreSettings.storeName}</h3>
            <p className="text-sm text-primary-foreground/70">{mockStoreSettings.description}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">Sobre nós</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contato</Link></li>
              <li><Link to="/faq" className="hover:text-primary-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Ajuda</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/shipping" className="hover:text-primary-foreground transition-colors">Entregas</Link></li>
              <li><Link to="/returns" className="hover:text-primary-foreground transition-colors">Trocas e Devoluções</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacidade</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Contato</h4>
            <p className="text-sm text-primary-foreground/70 mb-2">{mockStoreSettings.contactEmail}</p>
            <p className="text-sm text-primary-foreground/70 mb-4">{mockStoreSettings.contactPhone}</p>
            <div className="flex gap-3">
              {mockStoreSettings.socialLinks.instagram && (
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-xs text-primary-foreground/50">
          © 2024 {mockStoreSettings.storeName}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
