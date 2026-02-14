<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserThemeVersion extends Model
{
    protected $table = 'user_theme_versions';

    protected $fillable = [
        'user_id',
        'theme',
        'channel',
        'version',
        'config',
        'label',
    ];

    protected $casts = [
        'version' => 'integer',
        'config' => 'array',
    ];
}
