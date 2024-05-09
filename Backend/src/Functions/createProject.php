<?php function createProject($projectName) {
    $projectPath = "projects/" . $projectName;
    if (!file_exists($projectPath)) {
        mkdir($projectPath);
        // Create default HTML file
        file_put_contents("$projectPath/index.html", "<!DOCTYPE html>\n<html>\n<head>\n<title>$projectName</title>\n</head>\n<body>\n\n</body>\n</html>");
        // Create default CSS file
        mkdir("$projectPath/css");
        file_put_contents("$projectPath/css/style.css", "/* Add your CSS styles here */");
        file_put_contents("$projectPath/css/global.css", "/* Add your global CSS styles here */");
        // Create js folder and files
        mkdir("$projectPath/js");
        file_put_contents("$projectPath/js/script.js", "// Add your JavaScript code here");
        file_put_contents("$projectPath/js/global.js", "// Add your global JavaScript code here");
        return true;
        echo "created successfully";
    }
    return false;
} 

//implementation of create project

if($_SERVER["REQUEST_METHOD"]=="POST"){
    $projectName= $_POST["projectName"];
    if (createProject($projectName)) {
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
</body>
</html>
