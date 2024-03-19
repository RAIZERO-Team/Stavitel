<?php
$servername= "localhost";
$username ="root";
$password ="";
$dbname="user_db";
 $con=mysqli_connect($servername,$username,$password,$dbname);
 if(!$con){
    die("connection faild");
 }

?>