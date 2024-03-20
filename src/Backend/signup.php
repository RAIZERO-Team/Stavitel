<?php
include 'config.php';


$name =htmlspecialchars(strip_tags($_POST['name'])) ;
$email = htmlspecialchars(strip_tags($_POST['email']));

$password =htmlspecialchars(strip_tags($_POST['password']));

 
$stmt = $con->prepare("INSERT INTO user_form (name, email, password) VALUES (?, ?, ?)");
$stmt -> execute(array($name,$email,$password));

$count=$stmt->rowCount();
if($count>0){
    echo  json_encode(array("successful insert")) ;
}else{
    echo  json_encode(array("insert failed")) ;
}

?>








