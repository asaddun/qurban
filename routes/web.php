<?php

use App\Http\Controllers\Public\ParticipantController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/register', [ParticipantController::class, 'create'])->name('register');
Route::get('/register/check', [ParticipantController::class, 'check'])->name('register.check');
Route::post('/register', [ParticipantController::class, 'store'])->name('register.store');
