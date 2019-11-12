<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/recentOrder/save','RecentOrderController@save');
Route::post('/stockTracking/save','StockTrackingController@save');
Route::post('/recentVisitors/save','RecentVisitorController@save');


Route::post('/recentOrder/getSetting','RecentOrderController@getSetting');
Route::post('/recentVisitors/getSetting','RecentVisitorController@getSetting');
Route::post('/stockTracking/getSetting','StockTrackingController@getSetting');

Route::post('/uninstall',['as'=>'uninstall', 'uses'=>'AuthController@uninstall']);
Route::post('/add/order', 'RecentOrderController@addOrder');
Route::post('/getSetting', 'SettingController@getSetting'); 
Route::post('/getEmail', 'SettingController@getEmail'); 
Route::post('/sendEmail','SettingController@sendEmail');