<?php

function updateProject($projectName, $htmlContent, $cssContent) {
    // Assuming the project already exists, so we don't need to check if the project folder exists.

    // Locate the project folder
    $projectFolderPath = __DIR__ . "/projects"; // Assuming 'projects' is the folder where all projects are stored
    $projectFolder = $projectFolderPath . "/$projectName";

    // Update HTML content
    file_put_contents("$projectFolder/index.html", $htmlContent);

    // Update CSS content
    $cssFolderPath = $projectFolder . "/css";
    file_put_contents("$cssFolderPath/style.css", $cssContent);

    echo "Project '$projectName' updated successfully.";
}

// Example usage
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $projectName = $_POST["project_name"];
    $htmlContent = $_POST["html_content"];
    $cssContent = $_POST["css_content"];

    updateProject($projectName, $htmlContent, $cssContent);
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Project</title>
</head>
<body>
    <h2>Update Project</h2>
    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
        <label for="project_name">Project Name:</label><br>
        <input type="text" id="project_name" name="project_name"><br><br>

        <label for="html_content">New HTML Content:</label><br>
        <textarea id="html_content" name="html_content" rows="5" cols="50"></textarea><br><br>

        <label for="css_content">New CSS Content:</label><br>
        <textarea id="css_content" name="css_content" rows="5" cols="50"></textarea><br><br>

        <input type="submit" value="Update Project">
    </form>
</body>
</html>
