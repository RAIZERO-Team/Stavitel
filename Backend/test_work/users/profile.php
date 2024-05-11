





<?php
session_start();

if(!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

require_once('db.php');
require_once('User.php');

$db = new Database();
$conn = $db->getConnection();

$username = $_SESSION['username'];


$stmt = $conn->prepare("SELECT * FROM test WHERE username = ?");
$stmt->execute([$username]);
$userData = $stmt->fetch(PDO::FETCH_ASSOC);

if($userData) {
    
    $email = $userData['email'];
    $profileImage= $userData['user_pic'];
    $bio = $userData['bio'];
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $newBio = $_POST['bio'];
        $user = new User(); 
        $success = $user->updateBio($username, $newBio); 
        if ($success) {
           
            header("Location: profile.php");
            exit();
        } else {
            
            echo "Failed to update bio.";
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
</head>
<body>
    <h2>Welcome, <?php echo $username; ?></h2>

    <img src="<?php echo $profileImage; ?>" alt="Profile Picture">
     
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
        <textarea name="bio"><?php echo $bio; ?></textarea>

        <br>
        <input type="submit" value="Save">
    </form>
    <p>usename: <?php echo $username; ?></p>
    <p>Email: <?php echo $email; ?></p>
  
    <a href="logout.php">Logout</a>
</body>
</html>
<?php
} else {
    
    header("Location: 404.php");
    exit();
}
?>
