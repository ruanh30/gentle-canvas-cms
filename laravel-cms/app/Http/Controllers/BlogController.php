<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->latest()->paginate(20);
        return view('blog.index', compact('posts'));
    }

    public function create()
    {
        return view('blog.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'excerpt' => 'nullable|string|max:500',
            'featured_image' => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        $data['slug'] = Str::slug($data['title']);
        $data['user_id'] = auth()->id();
        $data['is_published'] = $request->boolean('is_published');
        if ($data['is_published']) $data['published_at'] = now();

        Post::create($data);
        return redirect()->route('admin.blog.index')->with('success', 'Post criado!');
    }

    public function edit(Post $blog)
    {
        return view('blog.edit', ['post' => $blog]);
    }

    public function update(Request $request, Post $blog)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'excerpt' => 'nullable|string|max:500',
            'featured_image' => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        $data['slug'] = Str::slug($data['title']);
        $data['is_published'] = $request->boolean('is_published');
        if ($data['is_published'] && !$blog->published_at) $data['published_at'] = now();

        $blog->update($data);
        return redirect()->route('admin.blog.index')->with('success', 'Post atualizado!');
    }

    public function destroy(Post $blog)
    {
        $blog->delete();
        return redirect()->route('admin.blog.index')->with('success', 'Post excluído!');
    }
}
