<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::withCount('allItems')->paginate(20);
        return view('menus.index', compact('menus'));
    }

    public function create()
    {
        return view('menus.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:50',
            'is_active' => 'boolean',
        ]);

        $data['is_active'] = $request->boolean('is_active');
        $menu = Menu::create($data);

        if ($request->has('items')) {
            foreach ($request->items as $item) {
                $menu->allItems()->create($item);
            }
        }

        return redirect()->route('admin.menus.index')->with('success', 'Menu criado!');
    }

    public function edit(Menu $menu)
    {
        $menu->load('items.children');
        return view('menus.edit', compact('menu'));
    }

    public function update(Request $request, Menu $menu)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:50',
            'is_active' => 'boolean',
        ]);

        $data['is_active'] = $request->boolean('is_active');
        $menu->update($data);

        return redirect()->route('admin.menus.index')->with('success', 'Menu atualizado!');
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();
        return redirect()->route('admin.menus.index')->with('success', 'Menu excluído!');
    }
}
