<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class Course extends Model
{
    //
protected $fillable = ['courseName','courseCode','courseBanner','courseDescription'];
    public function user(){
        return $this->hasMany(User::class,'user_id');
    }


}
