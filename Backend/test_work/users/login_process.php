<?php
session_start();

require_once('User.php');

if(isset($_POST['username'], $_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $user = new User1();
    $result = $user->login($username, $password);

    if($result) {
        $_SESSION['username'] = $result['username'];
        header("Location: profile.php");
        exit();
    } else {
        echo "Invalid username or password";
    }
} else {
    header("Location: login.php");
    exit();
}
?>
