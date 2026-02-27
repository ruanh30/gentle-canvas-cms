<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Post;
use App\Models\Page;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::create([
            'name' => 'Administrador',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);

        // Categories
        $cats = [];
        foreach (['Eletrônicos', 'Roupas', 'Acessórios', 'Casa & Decoração', 'Esportes'] as $name) {
            $cats[] = Category::create(['name' => $name, 'slug' => Str::slug($name), 'is_active' => true]);
        }

        // Products
        $products = [
            ['name' => 'Fone Bluetooth Premium', 'price' => 299.90, 'compare_price' => 399.90, 'stock' => 50, 'category_id' => $cats[0]->id, 'is_published' => true, 'is_featured' => true],
            ['name' => 'Camiseta Básica Algodão', 'price' => 79.90, 'stock' => 100, 'category_id' => $cats[1]->id, 'is_published' => true],
            ['name' => 'Relógio Digital Esportivo', 'price' => 189.90, 'compare_price' => 249.90, 'stock' => 30, 'category_id' => $cats[2]->id, 'is_published' => true, 'is_featured' => true],
            ['name' => 'Luminária LED Moderna', 'price' => 159.90, 'stock' => 25, 'category_id' => $cats[3]->id, 'is_published' => true],
            ['name' => 'Garrafa Térmica 1L', 'price' => 89.90, 'stock' => 80, 'category_id' => $cats[4]->id, 'is_published' => true, 'is_featured' => true],
            ['name' => 'Carregador Sem Fio', 'price' => 129.90, 'stock' => 45, 'category_id' => $cats[0]->id, 'is_published' => true],
            ['name' => 'Mochila Notebook 15"', 'price' => 199.90, 'compare_price' => 259.90, 'stock' => 35, 'category_id' => $cats[2]->id, 'is_published' => true],
            ['name' => 'Copo Stanley 473ml', 'price' => 249.90, 'stock' => 60, 'category_id' => $cats[3]->id, 'is_published' => true, 'is_featured' => true],
        ];

        foreach ($products as $p) {
            $p['slug'] = Str::slug($p['name']);
            $p['description'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
            $p['short_description'] = 'Produto de alta qualidade com garantia.';
            Product::create($p);
        }

        // Blog posts
        foreach (['Como escolher o produto ideal', 'Tendências 2024', 'Guia de compras inteligente', 'Novidades da semana', 'Dicas de organização'] as $title) {
            Post::create([
                'title' => $title,
                'slug' => Str::slug($title),
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.',
                'excerpt' => 'Resumo do artigo sobre ' . strtolower($title),
                'user_id' => 1,
                'is_published' => true,
                'published_at' => now(),
            ]);
        }

        // Pages
        Page::create(['title' => 'Sobre', 'slug' => 'sobre', 'content' => 'Somos uma loja online dedicada a oferecer os melhores produtos com qualidade e preço justo.', 'is_published' => true]);
        Page::create(['title' => 'Contato', 'slug' => 'contato', 'content' => 'Entre em contato conosco pelo e-mail contato@loja.com ou pelo telefone (11) 99999-9999.', 'is_published' => true]);
        Page::create(['title' => 'Política de Privacidade', 'slug' => 'privacidade', 'content' => 'Esta política descreve como tratamos seus dados pessoais.', 'is_published' => true]);

        // Settings
        Setting::set('store_name', 'Gentle Canvas', 'general');
        Setting::set('store_description', 'Os melhores produtos para você', 'general');
        Setting::set('hero_title', 'Bem-vindo à Gentle Canvas', 'theme');
        Setting::set('hero_subtitle', 'Encontre produtos incríveis com os melhores preços', 'theme');
        Setting::set('hero_cta_text', 'Ver Produtos', 'theme');
        Setting::set('hero_cta_link', '/store/products', 'theme');
        Setting::set('show_hero', '1', 'theme');
    }
}
