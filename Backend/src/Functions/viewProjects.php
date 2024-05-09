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
    $projectsDir = 'projects/';

    // Scan the projects directory
    $projects = scandir($projectsDir);

    // Loop through each project directory
    foreach ($projects as $project) {
        if ($project != '.' && $project != '..' && is_dir($projectsDir . $project)) {
            // Display project name and link to view project
            echo '<p><a href="viewExecution.php?project=' . urlencode($project) . '">' . htmlspecialchars($project) . '</a></p>';
        }
    }
    ?>
</body>
</html>
