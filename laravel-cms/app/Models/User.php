<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = ['name', 'email', 'password', 'is_admin', 'phone', 'avatar'];
    protected $hidden = ['password', 'remember_token'];
    protected $casts = ['email_verified_at' => 'datetime', 'is_admin' => 'boolean'];

    public function posts() { return $this->hasMany(Post::class); }
    public function media() { return $this->hasMany(Media::class); }
    public function orders() { return $this->hasMany(Order::class); }
    public function addresses() { return $this->hasMany(Address::class); }
    public function wishlists() { return $this->hasMany(Wishlist::class); }

    public function wishlistProducts()
    {
        return $this->belongsToMany(Product::class, 'wishlists');
    }
}
