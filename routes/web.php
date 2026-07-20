<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Public\ParticipantController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('welcome');
})->name('home');


// Auth Routes
Route::get('/login', [AuthController::class, 'create'])->name('login.create');
Route::post('/login', [AuthController::class, 'post'])->name('login.post');

// Participant Routes (existing routes)
Route::get('/daftar', [ParticipantController::class, 'create'])->name('register');
Route::get('/daftar/cek', [ParticipantController::class, 'check'])->name('register.check');
Route::post('/daftar', [ParticipantController::class, 'store'])->name('register.store');

// Route::middleware('auth')->group(function () {
Route::get('/dashboard', function () {
    return inertia('admin/dashboard');
})->name('dashboard');
// });
