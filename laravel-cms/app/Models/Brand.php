<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Brand extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'logo', 'website', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];

    public function products() { return $this->hasMany(Product::class); }

    public static function boot()
    {
        parent::boot();
        static::creating(function ($b) {
            if (empty($b->slug)) $b->slug = Str::slug($b->name);
        });
    }
}
