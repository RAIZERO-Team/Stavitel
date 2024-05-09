<?php 

function updateProjectFile($projectName, $fileName, $content, $isJson = false) {
    $filePath = "projects/" . $projectName . "/" . $fileName;
    if (file_exists($filePath)) {
        // If content is JSON, decode it
        if ($isJson) {
            $decodedContent = json_decode($content, true);
            $content = $decodedContent[$fileName];
        }
        file_put_contents($filePath, $content);
        return true;
    }
    return false;
}

// usage:
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $projectName = $_POST["update_project_name"];
    $newHTMLContent = $_POST["html_content"];

    // Update HTML file
    if (updateProjectFile($projectName, "index.html", $newHTMLContent)) {
        echo "Project '$projectName' HTML updated successfully.";
    } else {
        echo "Failed to update project. Project '$projectName' does not exist.";
    }

    $newCSSContent = $_POST["css_content"];

    // Update CSS file
    if (updateProjectFile($projectName, "css/style.css", $newCSSContent)) {
        echo "Project '$projectName' CSS updated successfully.";
    } else {
        echo "Failed to update project. Project '$projectName' does not exist.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Project Management</title>
</head>

<body>
    <h2>Update Project Files</h2>
    <form action="update.php" method="POST">
        <label for="update_project_name">Project Name:</label>
        <input type="text" id="update_project_name" name="update_project_name" required><br><br>
        <label for="html_content">New HTML Content:</label><br>
        <textarea id="html_content" name="html_content" rows="6" cols="50" required></textarea><br><br>
        <label for="css_content">New CSS Content:</label><br>
        <textarea id="css_content" name="css_content" rows="6" cols="50" required></textarea><br><br>
        <button type="submit">Update Files</button>
    </form>
</body>

</html>
