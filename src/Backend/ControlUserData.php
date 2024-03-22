<?php
include ("functions.php");
include ("inc/connection.php");
session_start();



if (isset ($_POST['checkemail'])) {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    if (isExistEmail($email)) {

        $code = rand(9999, 1111);
        insertcode($email, $code);
        $_SESSION['sendemail'] =
            [
                'email' => $email,
                'code' => (int) $code,
            ];
        header('location: SendEmail.php');
        exit(); // توقف تنفيذ السكربت هنا بعد التوجيه
    } else {
        echo "Email does not exist";
    }
}



if (isset ($_POST["checkcode"])) {

    $ch_Code = (int) $_POST["otp"];

    $r_code = getCode($_SESSION['sendemail']['email']);
    echo $r_code;

    if ($ch_Code == $r_code) {
        ResetCode($_SESSION['sendemail']['email']);
        header('location:update.php');

    } else {
        echo 'nnnnnnnn';
    }




}









