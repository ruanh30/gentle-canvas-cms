<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    protected $fillable = ['title', 'slug', 'content', 'excerpt', 'featured_image', 'user_id', 'is_published', 'published_at', 'tags'];
    protected $casts = ['is_published' => 'boolean', 'published_at' => 'datetime', 'tags' => 'array'];

    public function user() { return $this->belongsTo(User::class); }

    public static function boot()
    {
        parent::boot();
        static::creating(function ($p) {
            if (empty($p->slug)) $p->slug = Str::slug($p->title);
        });
    }
}
