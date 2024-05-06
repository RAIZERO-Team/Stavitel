
<?php
require_once ('core/init.php');

$user= new User();

if($user->get_IsLoggedIn()){
    Redireect::to("index.php");//هنحط الصفحه الي بعد ال login
}

// if(Session::exists('user_data')){
//     Redireect::to("index.php");

// }
//  if($user->isVerified()){
//     Redireect::to("index.php");
//  }

else{
    $user->create(
          Session::get('user_data')         
    );
}

?>








<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verified</title>
</head>
<body>
    <h1>
        welcome your email is Verified
    </h1>


    <h2>
        now you can <a href="login.html">login</a> 
    </h2>
</body>
</html>