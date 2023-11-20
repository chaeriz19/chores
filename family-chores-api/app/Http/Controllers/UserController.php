<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request) {


        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);


        $credentials = $request->only('name','password');


        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('loginToken')->plainTextToken;

            return response()->json(['token' => $token, 'user' => $user]);
        }

        return response()->json(['message' => 'Invalid username or password provided.', 401]);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'success']);
    }

    public function store(Request $request) {


        $request->validate([
            'name'=> 'required|string|unique:users',
            'password' => 'required|string',
            'is_admin' => 'boolean'
        ]);  


        $user = User::create([
            'name' => $request->name,
            'password' => Hash::make($request->password),
            'is_admin' => $request->input('is_admin', false),
        ]);


        return response()->json($user, 201);
    }
}
