<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = ['author_name', 'author_role', 'author_avatar', 'content', 'rating', 'is_featured', 'is_active', 'sort_order'];
    protected $casts = ['is_featured' => 'boolean', 'is_active' => 'boolean'];
}
