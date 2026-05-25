<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlogPost extends Model {
    protected $fillable = ['title','slug','excerpt','content','cover_image','status','ai_generated','seo_title','seo_description','published_at','author_id','category_id'];
    protected $casts = ['ai_generated' => 'boolean', 'published_at' => 'datetime'];
    public function author(): BelongsTo { return $this->belongsTo(\App\Models\User::class, 'author_id'); }
    public function category(): BelongsTo { return $this->belongsTo(BlogCategory::class, 'category_id'); }
    public function comments() { return $this->hasMany(BlogComment::class, 'post_id'); }
}
