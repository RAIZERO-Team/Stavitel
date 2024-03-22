<?php

$hostname = "localhost";

$db_name = "login_register";// change to userinformation
$db_user = "root";
$db_pass = "";




try {

    $conect = new PDO("mysql:host=$hostname;dbname=$db_name", $db_user, $db_pass);
    
} catch (Exception $e)  {

}


