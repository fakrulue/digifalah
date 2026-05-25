<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class BlogComment extends Model {
    protected $fillable = ['post_id', 'name', 'email', 'comment', 'reply', 'is_approved'];

    public function post() {
        return $this->belongsTo(BlogPost::class, 'post_id');
    }
}
