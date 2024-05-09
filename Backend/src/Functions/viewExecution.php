<?php
// Function to read HTML file
function readHTMLFile($filename) {
    $fileContent = file_get_contents($filename);
    return $fileContent;
}

// Function to read CSS file
function readCSSFile($filename) {
    $fileContent = file_get_contents($filename);
    return $fileContent;
}

// Main code
if (isset($_GET['project'])) {
    $project = $_GET['project'];
    $html_file = "projects/{$project}/index.html";
    $css_file = "projects/{$project}/css/style.css";

    if(file_exists($html_file) && file_exists($css_file)) {
        $html_content = readHTMLFile($html_file);
        $css_content = readCSSFile($css_file);
    } else {
        die("HTML or CSS file not found for this project.");
    }
} else {
    die("Project ID not provided.");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Project</title>
    <?php
     echo '<p><a href="viewCodes.php?project=' . urlencode($project) . '"> view codes </a></p>';

     ?>

   
    <style><?php echo $css_content; ?></style>
</head>
<body>
    <?php echo $html_content; ?>
</body>
</html>