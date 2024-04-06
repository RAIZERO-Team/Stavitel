<?php
include 'inc/connection.php';
include 'functions.php';

$error = false;
$err = "";
session_start();
if (isset($_SESSION['user'])) {
  header('location:profile.php');
  exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $username = trim(filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS));
  $password = trim(filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS));
  $email = trim(filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL));


  // validate fields

  $errors = [];

  if ($username == "") {
    $errors[] = "Please Enter Username";
  } elseif ($email == "") {
    $errors[] = "Please Enter Email";
  } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid Email format";
  } elseif ($password == "") {
    $err = "please enter Password ";
    $errors[] = "please enter Password";
  } elseif (strlen($password) < 6) {
    $errors[] = "Password must be atleast 6 characters";
  }


  if (isExistEmail($email)) {
    $errors[] = "Email is Allready Exist!";
  }



  $hash = password_hash($password, PASSWORD_DEFAULT);




  if (empty($errors)) {

    InsertData($username, $hash, $email);
    echo "you regestered sucessfully";


    $_SESSION['user'] = [

      "email" => $email,
    ];
    header('location:profile.php'); // not* we will change profile to validation email

  }
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <h1> Stavitel </h2>
    <title>Document</title>
</head>

<body>

  <form action="sign_up.php" method="post">
    <?php
    if (isset($errors)) {
      if (!empty($errors)) {
        foreach ($errors as $msg) {
          echo $msg . "<br>";
        }
      }
    }
    ?>
    <h2>Sign Up </h2>
    <label>Username: </label><br>
    <input type="text" name="username"> <br>
    <label>Email: </label><br>
    <input type="email" name="email"> <br>
    <label>Password: </label><br>
    <input type="password" name="password"> <br>
    <input type="submit" name="sign up" value="sign up"> <br>
    <h5>you have already an account?</h5>
    <a href="login.php">login</a><br>


  </form>

</body>

</html>