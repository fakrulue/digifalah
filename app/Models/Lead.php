<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model {
    protected $fillable = ['name','email','phone','business_type','message','source','notes','status'];
}
