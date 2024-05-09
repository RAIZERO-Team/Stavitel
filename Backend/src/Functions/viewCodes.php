<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Project</title>
</head>
<body>
    <h2>Project Codes:</h2>
    <?php
    // Check if project parameter is provided in URL
    if (isset($_GET['project'])) {
        $project = $_GET['project'];

        // Define project directory path
        $projectDir = 'projects/' . $project . '/';

        // Check if project directory exists
        if (is_dir($projectDir)) {
            // Display HTML content
            echo '<h3>HTML Code:</h3>';
            $htmlFile = $projectDir . 'index.html';
            if (file_exists($htmlFile)) {
           //     echo '<iframe src="' . $htmlFile . '" width="100%" height="300px"></iframe>';
                echo "<pre>" . htmlspecialchars(file_get_contents($htmlFile)) . "</pre>";

            } else {
                echo '<p>HTML file not found.</p>';
            }

            // Display CSS content
            echo '<h3>CSS Code:</h3>';
            $cssFile = $projectDir . 'css/style.css';
            if (file_exists($cssFile)) {
            
                echo '<pre><code>' . htmlspecialchars(file_get_contents($cssFile)) . '</code></pre>';

            } else {
                echo '<p>CSS file not found.</p>';
            }
        } else {
            echo '<p>Project not found.</p>';
        }
    } else {
        echo '<p>Project parameter is missing.</p>';
    }
    ?>
</body>
</html>