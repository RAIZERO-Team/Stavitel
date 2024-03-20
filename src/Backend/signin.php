<?php
if(isset($_POST['submit'])){
$name=$_POST["name"];
$email=$_POST["email"];
$password=$_POST["password"];

$errors=array();

if(empty($name)or empty($email) or empty($password)){
    array_push($errors,"all field are required");
}
else{
    require_once "config.php";

}
$name_check = "SELECT * FROM user_form WHERE name = '$name'";
    $result_name = mysqli_query($con, $name_check);
    if(mysqli_num_rows($result) > 0){
        $errors['name'] = "name that you have entered is already exist!";

}
$password_hash = password_hash($password, PASSWORD_DEFAULT);

$password_check = "SELECT * FROM user_form WHERE  password = '$password_hash'";
    $result_password = mysqli_query($con, $name_check);
    if(mysqli_num_rows($result_password) > 0){
        $errors['password'] = "password that you have entered is already exist!";
    }  
} 



?>