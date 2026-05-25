<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class PageBlock extends Model {
    protected $fillable = ['page_slug','block_type','content','position','is_visible'];
    protected $casts = ['content' => 'array', 'is_visible' => 'boolean'];
}
