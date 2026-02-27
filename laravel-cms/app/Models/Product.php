<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $fillable = [
        'name', 'slug', 'description', 'short_description', 'price', 'compare_price',
        'sku', 'stock', 'track_stock', 'weight', 'category_id', 'brand_id',
        'images', 'featured_image', 'is_published', 'is_featured', 'variants', 'tags',
    ];

    protected $casts = [
        'images' => 'array', 'variants' => 'array', 'tags' => 'array',
        'is_published' => 'boolean', 'is_featured' => 'boolean', 'track_stock' => 'boolean',
        'price' => 'decimal:2', 'compare_price' => 'decimal:2',
    ];

    public function category() { return $this->belongsTo(Category::class); }
    public function brand() { return $this->belongsTo(Brand::class); }
    public function collections() { return $this->belongsToMany(Collection::class); }
    public function orderItems() { return $this->hasMany(OrderItem::class); }

    public static function boot()
    {
        parent::boot();
        static::creating(function ($p) {
            if (empty($p->slug)) $p->slug = Str::slug($p->name);
        });
    }
}
