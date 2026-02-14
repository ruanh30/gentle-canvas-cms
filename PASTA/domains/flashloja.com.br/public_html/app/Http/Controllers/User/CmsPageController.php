<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CmsPageController extends Controller
{
    public function products(Request $request)
    {
        return Inertia::render('User/Cms/AdminProducts');
    }

    public function categories(Request $request)
    {
        return Inertia::render('User/Cms/AdminCategories');
    }

    public function menus(Request $request)
    {
        return Inertia::render('User/Cms/AdminMenus');
    }

    public function media(Request $request)
    {
        return Inertia::render('User/Cms/AdminMedia');
    }
}
