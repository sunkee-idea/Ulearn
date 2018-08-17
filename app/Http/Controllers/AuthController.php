<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterFormRequest;
use App\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use JWTAuth;
use File;
use Tymon\JWTAuth\Exceptions\JWTException;


class AuthController extends Controller
{
    private $path;
    public function __construct()
    {
        $this->path =  public_path('upload/users');
    }

    //
    public function register(RegisterFormRequest $request)
    {

        if(!is_dir($this->path)){
           // mkdir($this->path,0777,true);
           File::makeDirectory($this->path, 0777, true);
        }

        if($request->image){
            $explode = explode(',',$request->image);

            $decoded = base64_decode($explode[1]);

            if(str_contains($explode[0],'jpeg'))
                $extension = 'jpg';
            else
                $extension = 'png';
            $fileName = str_random().'.'.$extension;
            $path = $this->path.'/'.$fileName;

            file_put_contents($path,$decoded);
            //$filePath = $_SERVER['SERVER_NAME'].':'.$_SERVER['SERVER_PORT'].'/postFiles/'.$fileName;
            $filePath = 'upload/users/'.$fileName;


            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->mobile,
                'department' => $request->department,
                'gender' => $request->gender,
                'password' => bcrypt($request->password),
                'image' => $filePath,
                'institution'=>$request->institution,
                'course_of_study'=>$request->course,
                'address' => $request->address
            ]);

            return response()->json(['user' => $user]);
        }
        return response()->json(['error' => $request->all()]);

    }


    public function signin(Request $request)
    {
        $this->validate($request,[
            'email' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('email',$request->email)->first();

        $credentials = $request->only('email','password');
        try {
            if(!$token = JWTAuth::attempt($credentials,[
                'exp' => Carbon::now()->addWeek(4)->timestamp
            ])){
                return response()->json([
                    'error' => 'Invalid Credentials'

                ], 401);
            }
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Could not authenticate',
            ], 500);
        }

        if (!$token) {
            return response()->json([
                'error' => 'Could not authenticate',
            ], 401);
        } else {
            return response()->json([
                'token' => $token,
                'user_id' => $user->id
            ],200);
        }

    }
}
