<?php
use Illuminate\Support\Facades\Route;

Route::resource('blog', 'Api\BlogController', ['except' => ['create', 'edit']]);
Route::get('search', 'Api\BlogController@search');