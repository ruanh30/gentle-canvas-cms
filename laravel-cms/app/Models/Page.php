<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Page extends Model
{
    protected $fillable = ['title', 'slug', 'content', 'is_published', 'sort_order'];
    protected $casts = ['is_published' => 'boolean'];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($p) {
            if (empty($p->slug)) $p->slug = Str::slug($p->title);
        });
    }
}
