<?php
use Illuminate\Support\Facades\Route;

Route::resource('user', 'Api\UserController', ['except' => ['create', 'edit']]);
Route::resource('blog', 'Api\BlogController', ['except' => ['create', 'edit']]);
Route::get('search', 'Api\BlogController@search');