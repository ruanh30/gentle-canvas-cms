<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'order_number', 'user_id', 'customer_name', 'customer_email', 'customer_phone',
        'status', 'subtotal', 'shipping', 'discount', 'total',
        'payment_method', 'payment_status', 'shipping_address', 'billing_address',
        'notes', 'coupon_code', 'paid_at', 'shipped_at', 'delivered_at',
    ];

    protected $casts = [
        'shipping_address' => 'array', 'billing_address' => 'array',
        'subtotal' => 'decimal:2', 'shipping' => 'decimal:2',
        'discount' => 'decimal:2', 'total' => 'decimal:2',
        'paid_at' => 'datetime', 'shipped_at' => 'datetime', 'delivered_at' => 'datetime',
    ];

    public function user() { return $this->belongsTo(User::class); }
    public function items() { return $this->hasMany(OrderItem::class); }

    public static function generateOrderNumber(): string
    {
        return 'ORD-' . strtoupper(uniqid());
    }
}
