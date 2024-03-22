<?php

function getUserName($email)
{
    include ("inc/connection.php");

    $std = "SELECT full_name from users where email='$email'";
    $q = $conect->prepare($std);
    $q->execute();

    return $data = $q->fetchcolumn();

}

function getUserPassword($email){
    include ("inc/connection.php");

    $std = "SELECT password from users where email='$email'";
    $q = $conect->prepare($std);
    $q->execute();

    return $data = $q->fetchcolumn();
}
function isExistEmail($email)
{
    include 'inc/connection.php';

    $check = "SELECT email  FROM users WHERE email= '$email'";
    $q = $conect->prepare($check);
    $q->execute();
    $data = $q->fetch();

    if ($data) {
       return true;
    }
    else{
        return false;
    }



}


function InsertData($username, $password, $email)
{
    include 'inc/connection.php';
    isExistEmail($email);


//    $hash = password_hash($password, PASSWORD_DEFAULT);

    $insertion = ("INSERT INTO users (full_name,password,email) VALUES ('$username','$password','$email')");


    if (empty ($errors)) {
        $conect->prepare($insertion)->execute();
       

    }



}


function insertcode($email, $code)
{
    include ("inc/connection.php");

    $std = "UPDATE  users  SET code='$code' where email='$email' ";
    $q = $conect->prepare($std);
    $q->execute();

}

function getCode($email)
{
    include ("inc/connection.php");

    $std = "SELECT code from users where email='$email' ";
    $q = $conect->prepare($std);
    $q->execute();
    return $data = $q->fetchcolumn();
}

function ResetCode($email)
{
    include ("inc/connection.php");
    $code = 0;
    $std = "UPDATE  users  SET code='$code'  where email='$email' ";
    $q = $conect->prepare($std);
    $q->execute();

}

function updata_username($new_username)
{
    include ("inc/connection.php");
    $new_username = filter_var($new_username, FILTER_SANITIZE_STRING);

    $std = "UPDATE users SET username = '$new_username' WHERE email = '{$_SESSION['user']['email']}'";

    $q = $conect->prepare($std);
    $q->execute();


}


function updata_password($email, $old_password, $new_password, $confirm_password)
{
    include ("inc/connection.php");
    $old_password = filter_var($old_password, FILTER_SANITIZE_STRING);
    $new_password = filter_var($new_password, FILTER_SANITIZE_STRING);
    $confirm_password = filter_var($confirm_password, FILTER_SANITIZE_STRING);



    $stmt = "SELECT password FROM users WHERE email = '$email'";
    $q = $conect->prepare($stmt);
    $q->execute();
    $data = $q->fetch();

    if (!$data) {

        return false;
    }

    $current_password_hash = $data['password'];


    if (!password_verify($old_password, $current_password_hash)) {

        return false;
    }

    if ($new_password !== $confirm_password) {

        return false;
    }


    $new_password_hash = password_hash($new_password, PASSWORD_DEFAULT);


    $stmt = "UPDATE users SET password = '$new_password_hash' WHERE email = '$email'";
    $q = $conect->prepare($stmt);
    $q->execute();

    return true;
}


















