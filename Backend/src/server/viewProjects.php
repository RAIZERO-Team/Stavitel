<?php
include ("functions.php");
include("DateTimeFunction.php");
session_start(); 

if (!isset ($_SESSION['user'])) {
    header('location:login.php');
    echo "session not started";
    
    exit();
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Projects</title>
</head>
<body>
    <h2>Existing Projects:</h2>
    <?php
    // Define projects directory path
    $userId="user".getUserID($_SESSION['user']['email']);

    $projectsDir = "users/".$userId."/projects/";

    // Scan the projects directory
    $projects = scandir($projectsDir);

    // Loop through each project directory
    foreach ($projects as $project) {
        if ($project != '.' && $project != '..' && is_dir($projectsDir . $project)) {
            // Display project name and link to view project
            $creationInfo = getProjectCreationInfo($projectsDir . $project);

            echo '<p><a href="viewExecution.php?project=' . urlencode($project) . '">' . htmlspecialchars($project) ."      "  . $creationInfo .  '</a></p>';
        }
    }
    
   
    $userID=getUserID($_SESSION['user']['email']);
    
      echo nl2br ("user ID: " .$userID ." \n");
      
      echo"usernmae:".getUserName($_SESSION['user']['email']);
    
    ?>
    <br>
    <br>
    <h5>Functions:</h5>
    <a href="createProject.php" style="color: peru;">Create new Project</a><br><br><br>
    <a href="update.php" style="color: peru;">Update with string json file</a><br><br><br>
    <a href="updateHTML.php" style="color: peru;">Update with HTML string json file</a><br><br><br>
    <a href="decodingJson.php" style="color: peru;">decoding json content</a><br><br><br>




        <a href="logout.php">log out</a><br><br><br>


</body>
</html>
