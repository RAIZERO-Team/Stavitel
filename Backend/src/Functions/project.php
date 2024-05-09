<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project</title>
    <style>
        <?php
        if(isset($_GET['name'])) {
            $projectName = $_GET['name'];
            $projectFolderPath = __DIR__ . "/projects/$projectName/css";
            if(file_exists("$projectFolderPath/css_global.css")) {
                include "$projectFolderPath/css_global.css";
            }
            if(file_exists("$projectFolderPath/style.css")) {
                include "$projectFolderPath/style.css";
            }
        }
        ?>
    </style>
</head>
<body>
    <?php
    if(isset($_GET['name'])) {
        $projectName = $_GET['name'];
        $projectFolderPath = __DIR__ . "/projects/$projectName";
        if(file_exists("$projectFolderPath/index.html")) {
            include "$projectFolderPath/index.html";
        } else {
            echo "HTML file not found for this project.";
        }
    } else {
        echo "No project selected.";
    }
    ?>
</body>
</html>
