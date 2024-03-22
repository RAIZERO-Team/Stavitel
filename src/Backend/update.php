<?php
include ("inc/connection.php");
include ("functions.php");
session_start();

if (isset ($_SESSION["user"])) {
  $email = $_SESSION['user']['email'];
} elseif (isset ($_SESSION['sendemail'])) {
  $email = $_SESSION['sendemail']['email'];
}

if (isset ($_POST['submit'])) {
  $errors = [];

  $oldpassword = filter_var($_POST['oldpassword'], FILTER_SANITIZE_STRING);
  $newpassword = filter_var($_POST['newpassword'], FILTER_SANITIZE_STRING);
  $conform = filter_var($_POST['conformpassword'], FILTER_SANITIZE_STRING);

  if (empty ($oldpassword)) {
    $errors[] = 'please enter old password';
  }

  if (empty ($newpassword)) {
    $errors[] = 'please enter new password';
  }
  if (empty ($conform)) {
    $errors[] = 'please enter the same password';
  }

  if (strlen($newpassword) < 6) {
    $errors[] = 'password must be at least 6 characters';
  }

  if (strlen($conform) < 6) {
    $errors[] = 'password must be at least 6 characters';
  }

  if (empty ($errors)) {
    updata_password($email, $oldpassword, $newpassword, $conform);
    if (isset ($_SESSION['sendemail'])) {
      unset($_SESSION['sendemail']);
    }
    header('location:login.php');
    exit;
  }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>update</title>
</head>

<body>
  <form action="" method="POST">

    <br>
    <br>
    <pre>
<input type="password" name='oldpassword' placeholder="old_password"><br>
<input type="password" name='newpassword' placeholder='new password'>
   
<input type="password" name='conformpassword' placeholder='conform password'> 
        </pre>
    <input type="submit" name='submit' value="update">
    <br>
    <br>
    <a href="profile.php">Back</a>


  </form>


</body>

</html>