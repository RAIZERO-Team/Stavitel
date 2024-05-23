<?php
//--------Database----------
    include ("connection.php");
    include ("functions.php");
    session_start();
    if (!isset ($_SESSION['user'])) {
        header('location:login.php');
        
        exit();
    }
function createProject($projectName,$userId) {
    // Define user project directory based on user ID

  if (!file_exists("users/".$userId)) {
    // Create directories recursively
    mkdir("users/".$userId, true);  // Set appropriate permissions (optional)
    mkdir("users/".$userId."/projects", true);  // Set appropriate permissions (optional)
  }
  $userProjectPath = "users/".$userId."/projects/".$projectName;
  if (!file_exists($userProjectPath)) {
    mkdir($userProjectPath);

   
        // Create default HTML file
        file_put_contents("$userProjectPath/index.html", "<!DOCTYPE html>\n<html>\n<head>\n<title>$projectName</title>\n</head>\n<body>\n\n</body>\n</html>");
        // Create default CSS file
        mkdir("$userProjectPath/css");
        file_put_contents("$userProjectPath/css/style.css", "/* Add your CSS styles here */");
        file_put_contents("$userProjectPath/css/global.css", "/* Add your global CSS styles here */");
        // Create js folder and files
        mkdir("$userProjectPath/js");
        file_put_contents("$userProjectPath/js/script.js", "// Add your JavaScript code here");
        file_put_contents("$userProjectPath/js/global.js", "// Add your global JavaScript code here");
        return true;
        echo "created successfully";
    }
    return false;
} 

//implementation of create project
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $projectName= $_POST["projectName"];

    //--------Database----------
    
    $userId="user".getUserID($_SESSION['user']['email']);

    if (createProject($projectName,$userId)) {
        echo "Project '$projectName' created successfully.";
    } else {
        
        echo "Failed to create project. Project '$projectName' already exists.";
    }
    }


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Project Management</title>
</head>
<body>
    <h2>Create a New Project</h2>
    <form action="createProject.php" method="POST">
        <label for="projectName">Project Name:</label>
        <input type="text" id="projectName" name="projectName" required>
        <button type="submit">Create Project</button>
    </form>
    <br>
    <br>
    <a href="viewProjects.php">back</a><br><br><br>

</body>
</html>
