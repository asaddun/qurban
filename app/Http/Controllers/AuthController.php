<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Show the login form.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        // Return the login view for Inertia
        return inertia('auth/Login');
    }

    /**
     * Handle the login request.
     */
    public function post(LoginRequest $request)
    {
        $auth = Auth::attempt($request->validated());

        if ($auth) {
            return redirect()->intended('home');
        }

        return back()->withErrors(['login' => 'Invalid credentials.']);
    }
}
