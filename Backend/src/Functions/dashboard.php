<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
</head>
<body>
    <h2>Dashboard</h2>
    <h3>Projects:</h3>
    <ul>
        <?php
        $projectFolderPath = __DIR__ . "/projects";
        $projects = scandir($projectFolderPath);
        foreach ($projects as $project) {
            if ($project != "." && $project != "..") {
                $projectInfoFile = $projectFolderPath . "/$project/info.txt";
                if (file_exists($projectInfoFile)) {
                    $info = file_get_contents($projectInfoFile);
                    echo "<li><a href='project.php?name=$project'>$info</a></li>";
                }
            }
        }
        ?>
    </ul>
</body>
</html>
