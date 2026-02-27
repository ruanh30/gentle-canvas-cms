<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $fillable = ['code', 'type', 'value', 'min_purchase', 'max_uses', 'used_count', 'starts_at', 'expires_at', 'is_active'];
    protected $casts = ['is_active' => 'boolean', 'value' => 'decimal:2', 'min_purchase' => 'decimal:2', 'starts_at' => 'datetime', 'expires_at' => 'datetime'];

    public function isValid(): bool
    {
        if (!$this->is_active) return false;
        if ($this->max_uses && $this->used_count >= $this->max_uses) return false;
        if ($this->starts_at && now()->lt($this->starts_at)) return false;
        if ($this->expires_at && now()->gt($this->expires_at)) return false;
        return true;
    }
}
