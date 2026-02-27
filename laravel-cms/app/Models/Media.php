<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = ['filename', 'original_name', 'path', 'mime_type', 'size', 'user_id', 'alt_text'];

    public function user() { return $this->belongsTo(User::class); }

    public function url(): string
    {
        return asset('storage/' . $this->path);
    }
}
