<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    const UPDATED_AT = null;

    protected $fillable = [
        'ip',
        'url',
        'referer',
        'user_agent',
        'device',
        'browser',
        'platform',
    ];
}
