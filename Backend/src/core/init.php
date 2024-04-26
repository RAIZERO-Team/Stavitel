<?php
session_start();

// ============== set connection and attributes values ==============
$GLOBALS['config'] = array(
  'mysql' => array(
    'host' => 'localhost',
    'username' => 'root',
    'password' => '',
    'db' => 'userinformation'
  ),
  'remember' => array(
    'cookie_name' => 'hash',
    'cookie_expiry' => (time() + 60 + 60 * 24 * 30),  // 2592000
  ),
  'session' => array(
    'session_name' => 'user',
    'token_name' => 'token',
  ),
);

// ============== using spl_autoload_register to make require on every class by call it ==============
spl_autoload_register(function ($class) {
  require_once('Classes/' . $class . '.php');
});

// ============== call sanitize.php ==============
require_once('Functions/sanitize.php');


if (Cookie::exists(Config::get("remember/cookie_name")) && !Session::exists(Config::get("session/session_name"))) {
  $hash = Cookie::get(Config::get("remember/cookie_name"));
  $hashcheck = DB::getInstance()->get('users_session', array('hash', '=', $hash));
  if ($hashcheck->count()) {
    $user = new User($hashcheck->first()->user_id);
    $user->login();
  }
}
