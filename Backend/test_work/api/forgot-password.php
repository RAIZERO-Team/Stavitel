<?php
require_once ('core/init.php');
if(Input::exists())
{
   
    $email= Input::getItem("email");
    if(Validation::isEmailExist($email)){
      $send = new Send();
      $send->validationcode($email); 
    }

}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forget Password</title>
</head>

<body>
    <form action="" method="POST">
        <input class="form-control" type="email" name="email" placeholder="Enter email address" required>
        <br>
        <br>
        <input class="form-control button" type="submit" name="checkemail" value="Continue">
    </form>
</body>

</html>