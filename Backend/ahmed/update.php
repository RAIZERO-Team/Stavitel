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
<input type="p" name='old_password' placeholder="old_password"><br>
<input type="password" name='new_password' placeholder='new password'>
   
<input type="password" name='conform_password' placeholder='conform password'> 
    </pre> 
 <input type="submit" name='submit' value="update">  
 <br>
 <br>
 <a    <?php if(!$_SESSION['user']) echo 'hidden';   ?>   href="profile.php">Back</a>
  

  </form>


</body>

</html>