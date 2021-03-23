<?php
use Illuminate\Support\Facades\Route;

Route::resource('blog', 'BlogController', ['except' => ['create', 'edit']]);