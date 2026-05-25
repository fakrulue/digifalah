<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Keyword extends Model
{
    protected $fillable = [
        'keyword',
        'target_url',
        'current_rank',
        'previous_rank',
        'search_volume',
        'difficulty',
    ];
}
