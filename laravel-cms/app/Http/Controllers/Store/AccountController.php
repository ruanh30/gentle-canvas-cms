<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index()
    {
        return view('store.account');
    }

    public function orders()
    {
        $orders = auth()->user()->orders()->with('items')->latest()->paginate(10);
        return view('store.orders', compact('orders'));
    }

    public function addresses()
    {
        $addresses = auth()->user()->addresses()->orderByDesc('is_default')->get();
        return view('store.addresses', compact('addresses'));
    }

    public function storeAddress(Request $request)
    {
        $data = $request->validate([
            'label' => 'nullable|string|max:50',
            'street' => 'required|string|max:255',
            'number' => 'required|string|max:20',
            'complement' => 'nullable|string|max:100',
            'neighborhood' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:2',
            'zip_code' => 'required|string|max:10',
            'is_default' => 'boolean',
        ]);

        $data['user_id'] = auth()->id();
        $data['is_default'] = $request->boolean('is_default');

        if ($data['is_default']) {
            auth()->user()->addresses()->update(['is_default' => false]);
        }

        Address::create($data);
        return redirect()->route('store.addresses')->with('success', 'Endereço adicionado!');
    }

    public function destroyAddress(Address $address)
    {
        if ($address->user_id !== auth()->id()) abort(403);
        $address->delete();
        return redirect()->route('store.addresses')->with('success', 'Endereço removido!');
    }

    public function personalData()
    {
        return view('store.personal-data');
    }

    public function updatePersonalData(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . auth()->id(),
            'phone' => 'nullable|string|max:20',
        ]);

        auth()->user()->update($data);
        return redirect()->route('store.personal-data')->with('success', 'Dados atualizados!');
    }
}
