<?php
require_once('core/init.php');

$user = new User();
$user->logout();
Redireect::to('indexc.php');