<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    //

    public function user(){
        return $this->belongsTo(User::class,"user_id");

    }

    public function course(){
        return $this->belongsTo(Course::class,'course_id');
    }

    public function progress(){
        return $this->belongsTo(Progress::class,'progress_id');
    }

    public function tracking(){
        return $this->belongsTo(Tracking::class,'tracking_id');
    }
}
