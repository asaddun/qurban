<?php

use App\Http\Controllers\Public\ParticipantController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/daftar', [ParticipantController::class, 'create'])->name('register');
Route::get('/daftar/cek', [ParticipantController::class, 'check'])->name('register.check');
Route::post('/daftar', [ParticipantController::class, 'store'])->name('register.store');
