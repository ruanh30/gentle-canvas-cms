<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Collection extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'image', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];

    public function products() { return $this->belongsToMany(Product::class); }

    public static function boot()
    {
        parent::boot();
        static::creating(function ($c) {
            if (empty($c->slug)) $c->slug = Str::slug($c->name);
        });
    }
}
