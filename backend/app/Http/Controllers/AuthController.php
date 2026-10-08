<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request){
        
         $validate=Validator::make($request->all(),[
            'email'=>'required|email',
            'password'=>'required',
        ]);

        if($validate->fails()){
            return response()->json([
                'status'=>404,
                'errors'=>$validate->errors()
            ],400);
        }

        if(Auth::attempt(['email'=>$request->email,'password'=>$request->password])){

            $user=User::find(Auth::user()->id);
            $token=$user->createToken('token')->plainTextToken;

            return response()->json([
                'status'=>200,
                'token'=>$token,
                'name'=>$user->name,
                'email'=>$user->email,
                'id'=>$user->id
            ],200);

        }else{
            return response()->json([
                'status'=>401,
                'message'=>'invalid email or password',
            ],401);
        }
    }



    public function logout(Request $request){

        $request->user()->currentAccessToken()->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Logged out successfully.'
            ]);
    }
}
