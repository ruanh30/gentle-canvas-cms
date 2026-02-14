<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserAppearanceSetting extends Model
{
    protected $table = 'user_appearance_settings';

    protected $fillable = [
        'user_id',
        'theme',
        'settings',
        'custom_css',
    ];

    protected $casts = [
        'settings' => 'array',
    ];
}
