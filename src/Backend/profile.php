<?php
include ("functions.php");

session_start();
if (!isset ($_SESSION['user'])) {
    header('location:login.php');
    
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>profile</title>
</head>

<body>

    name :
    <?php echo getUserName($_SESSION['user']['email']) ?>
    <br>
    email :
    <?php echo $_SESSION['user']['email']; ?>
    <br>
    <pre>
<a href="logout.php">logout</a>        <a href="update.php">update</a>
</pre>

</body>

</html>