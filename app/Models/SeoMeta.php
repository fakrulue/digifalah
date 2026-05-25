<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoMeta extends Model
{
    protected $fillable = ['page_slug', 'title', 'description', 'og_image', 'canonical_url', 'no_index'];
    protected $casts = ['no_index' => 'boolean'];
}
