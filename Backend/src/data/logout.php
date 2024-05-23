<?php
require_once('../core/init.php');

$user = new User();
$user->logout();
Redireect::to('../../../Frontend/src/View/index.html');