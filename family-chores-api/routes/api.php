<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);

    Route::post('/task/get', [TaskController::class, 'get']);
    Route::post('/task/getall', [TaskController::class, 'get_all_tasks']);

    Route::post('/task/delete', [TaskController::class, 'delete']);
    Route::post('/task/create', [TaskController::class, 'store']);
    Route::post('/task/count', [TaskController::class, 'count']);
});
