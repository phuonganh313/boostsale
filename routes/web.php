<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => ['auth.shop', 'billable'], 'prefix' => Session::get('locale')], function () {
    Route::get('/', function () {
        return view('app');
    });
    
    Route::get('/visitor', function () {
        return view('app');
    });
    
    Route::get('/stock-tracking', function () {
        return view('app');
    });
    
    Route::get('/home', 'RecentOrderController@index')->name('home');
});
Route::match(
    ['get', 'post'],
    '/authenticate',
    'AuthController@authenticate'
)
->name('authenticate');

Route::get(
    '/install',
    'AuthController@index'
)->name('login');