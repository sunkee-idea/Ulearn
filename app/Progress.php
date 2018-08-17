<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    //

    protected $fillable = ['level','user_id'];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
