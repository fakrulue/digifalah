<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricingPlan extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'period',
        'features',
        'highlight',
        'position',
        'is_active',
    ];

    protected $casts = [
        'features' => 'array',
        'highlight' => 'boolean',
        'is_active' => 'boolean',
    ];
}
