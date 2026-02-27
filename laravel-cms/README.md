# Laravel CMS - Gentle Canvas

Migração completa do Gentle Canvas CMS de Next.js/React para Laravel 11 + Blade puro.

## Requisitos

- PHP 8.2+
- Composer
- SQLite (padrão) ou MySQL/PostgreSQL

## Instalação

```bash
# 1. Criar projeto Laravel (se ainda não criou)
composer create-project laravel/laravel laravel-cms
cd laravel-cms

# 2. Copiar os arquivos deste diretório para o projeto Laravel
# (sobrescrever app/, database/, resources/views/, routes/)

# 3. Configurar .env para SQLite
# DB_CONNECTION=sqlite
# DB_DATABASE=/caminho/absoluto/database/database.sqlite

# 4. Criar banco SQLite
touch database/database.sqlite

# 5. Rodar migrations
php artisan migrate

# 6. Rodar seeder (cria admin + dados de exemplo)
php artisan db:seed

# 7. Criar symlink para storage (uploads de mídia)
php artisan storage:link

# 8. Iniciar servidor
php artisan serve
```

## Acesso

- **Admin:** http://localhost:8000/login
  - Email: `admin@example.com`
  - Senha: `password`
- **Loja:** http://localhost:8000/store

## Estrutura

### Admin Panel
- Dashboard com estatísticas
- CRUD: Produtos, Categorias, Coleções, Pedidos, Clientes, Cupons, Marcas
- CMS: Blog, Páginas Estáticas, FAQ, Depoimentos, Mídia, Menus
- Personalização de tema e Configurações

### Storefront
- Home com hero, categorias, destaques, novidades
- Listagem de produtos com filtros e busca
- Página de produto com relacionados
- Carrinho (session-based)
- Checkout completo
- Área do cliente: conta, pedidos, endereços, dados pessoais, favoritos

### Tech Stack
- Laravel 11
- Blade puro (sem React/Vue/Livewire)
- Tailwind CSS via CDN
- SQLite
- Session-based auth
