<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'image', 'parent_id', 'sort_order', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];

    public function products() { return $this->hasMany(Product::class); }
    public function parent() { return $this->belongsTo(Category::class, 'parent_id'); }
    public function children() { return $this->hasMany(Category::class, 'parent_id'); }

    public static function boot()
    {
        parent::boot();
        static::creating(function ($c) {
            if (empty($c->slug)) $c->slug = Str::slug($c->name);
        });
    }
}
