<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserThemeState extends Model
{
    protected $table = 'user_theme_states';

    protected $fillable = [
        'user_id',
        'theme',
        'draft',
        'published',
        'draft_version',
        'published_version',
    ];

    protected $casts = [
        'draft_version' => 'integer',
        'published_version' => 'integer',
    ];
}
