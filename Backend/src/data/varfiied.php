<?php
require_once('../core/init.php');

$user = new User();

$user->create(
  Session::get('user_data')
);

Redireect::to('../../../Frontend/src/View/User_Sign.html');
// Redireect::to(404);
