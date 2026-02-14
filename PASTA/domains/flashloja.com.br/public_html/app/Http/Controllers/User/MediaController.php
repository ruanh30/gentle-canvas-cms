<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use App\Http\Helpers\Uploader;

class MediaController extends Controller
{
    public function index()
    {
        $user = Auth::guard('web')->user();
        $medias = DB::table('user_media')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        // Convert to objects with created_at as Carbon
        $medias = $medias->map(function($m) {
            $m->created_at = $m->created_at ? \Carbon\Carbon::parse($m->created_at) : null;
            return $m;
        });

        return view('user.media.index', compact('medias'));
    }

    public function store(Request $request)
    {
        $user = Auth::guard('web')->user();
        $url = null;
        $name = $request->name;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $directory = public_path('assets/front/img/user/media/');
            if (!is_dir($directory)) {
                mkdir($directory, 0755, true);
            }
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move($directory, $filename);
            $url = asset('assets/front/img/user/media/' . $filename);
            if (empty($name)) {
                $name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            }
        } elseif ($request->filled('image_url')) {
            $url = $request->image_url;
            if (empty($name)) {
                $name = basename(parse_url($url, PHP_URL_PATH));
            }
        }

        if ($url) {
            DB::table('user_media')->insert([
                'user_id' => $user->id,
                'name' => $name ?? 'Sem nome',
                'url' => $url,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            Session::flash('success', 'Mídia adicionada com sucesso!');
        } else {
            Session::flash('warning', 'Forneça uma imagem ou URL.');
        }

        return redirect()->back();
    }

    public function delete(Request $request)
    {
        $user = Auth::guard('web')->user();
        DB::table('user_media')
            ->where('id', $request->media_id)
            ->where('user_id', $user->id)
            ->delete();

        Session::flash('success', 'Mídia excluída com sucesso!');
        return redirect()->back();
    }
}
