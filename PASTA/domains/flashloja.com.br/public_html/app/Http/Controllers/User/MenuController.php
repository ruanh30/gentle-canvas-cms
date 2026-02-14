<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User\BasicSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class MenuController extends Controller
{
    public function index()
    {
        $user = Auth::guard('web')->user();
        $bs = BasicSetting::where('user_id', $user->id)->first();

        $headerMenus = [];
        $footerMenus = [];

        if ($bs) {
            $headerMenus = json_decode($bs->header_menu_json ?? '[]', true) ?: [];
            $footerMenus = json_decode($bs->footer_menu_json ?? '[]', true) ?: [];
        }

        return view('user.menus.index', compact('headerMenus', 'footerMenus'));
    }

    public function save(Request $request)
    {
        $user = Auth::guard('web')->user();
        $bs = BasicSetting::where('user_id', $user->id)->first();

        if (!$bs) {
            Session::flash('warning', 'Configurações não encontradas.');
            return redirect()->back();
        }

        $headerItems = [];
        if ($request->has('header')) {
            foreach ($request->header as $item) {
                if (!empty($item['label'])) {
                    $headerItems[] = [
                        'label' => $item['label'],
                        'url' => $item['url'] ?? '#',
                        'type' => $item['type'] ?? 'link',
                    ];
                }
            }
        }

        $footerItems = [];
        if ($request->has('footer')) {
            foreach ($request->footer as $item) {
                if (!empty($item['label'])) {
                    $footerItems[] = [
                        'label' => $item['label'],
                        'url' => $item['url'] ?? '#',
                        'type' => $item['type'] ?? 'link',
                    ];
                }
            }
        }

        $bs->header_menu_json = json_encode($headerItems);
        $bs->footer_menu_json = json_encode($footerItems);
        $bs->save();

        Session::flash('success', 'Menus salvos com sucesso!');
        return redirect()->back();
    }
}
