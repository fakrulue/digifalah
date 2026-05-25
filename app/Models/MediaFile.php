<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaFile extends Model
{
    protected $fillable = ['filename', 'storage_path', 'url', 'mime_type', 'size_bytes', 'uploader_id'];
}
