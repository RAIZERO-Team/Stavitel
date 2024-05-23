<?php

$hostname = "localhost";

$db_name = "stavitel";// change to userinformation
$db_user = "root";
$db_pass = "";


try {

    $conect = new PDO("mysql:host=$hostname;dbname=$db_name", $db_user, $db_pass);
    
} catch (Exception $e)  {

}


