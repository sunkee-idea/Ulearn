<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tracking extends Model
{
    //

    protected $fillable = ['feedback','videoname','user_id','course_id'];
    public function course(){
        return $this->belongsTo(Course::class,'course_id');
    }

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
