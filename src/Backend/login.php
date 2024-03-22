<?php
 include 'inc/connection.php';
session_start();
if(isset($_SESSION['user'])){
    header('location:profile.php');
    exit();
}
if(isset($_POST['submit'])){

   $password=filter_var($_POST['password'],FILTER_SANITIZE_SPECIAL_CHARS);
   $email=filter_var($_POST['email'],FILTER_SANITIZE_EMAIL);

   $errors=[];
   

   // validate email
   if(empty($email) ){
    $errors[]="please enter your email";
   }
   


   // validate password
   if(empty($password)){
        $errors[]="please enter your password";
   }



   // insert or errros 
   if(empty($errors)){
   
      // echo "check db";

    $stm="SELECT * FROM users WHERE email ='$email'";
    $q= $conect->prepare($stm);
    $q->execute();
    $data=$q->fetch();
    if(!$data){
       $errors[] = "wrong email";
    }else{
        
         $password_hash=$data['password']; 
         
         if(!password_verify($password,$password_hash)){
            $errors[] = "wrong password";
         }else{
            $_SESSION['user']=[
                "email"=>$email,
                "username"=>$username
              ];
            header('location:profile.php');
 
         }
    }
     
    
   }
}

?>



<form action="login.php" method="POST">
<?php 
        if(isset($errors)){
            if(!empty($errors)){
                foreach($errors as $msg){
                    echo $msg . "<br>";
                }
            }
        }
    ?>
    <input type="text" value="<?php if(isset($_POST['email'])){echo $_POST['email'];} ?>" name="email" placeholder="email"><br><br>
    <input type="password" name="password" placeholder="password"><br><br>
    <h6><a href="forgot-password.php">Forgot my password</a></h6><br>
    <input type="submit" name="submit" value="Login">
    <br><br>
    <a href="sign_up.php">register</a><br><br><br>
</form>