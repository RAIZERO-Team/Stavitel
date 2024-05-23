<?php
//--------Database----------

include ("functions.php");

session_start();
if (!isset ($_SESSION['user'])) {
    header('location:login.php');
    
    exit();
}

function updateProjectFile($projectName, $fileName, $content) {
    $userId="user".getUserID($_SESSION['user']['email']);

  $filePath = "users/".$userId."/projects/" . $projectName . "/" . $fileName;
  if (file_exists($filePath)) {
    file_put_contents($filePath, $content);
    return true;
  }
  return false;
}

function convert_html_to_string($html_data) {
  $tag = $html_data["tag"];
  $attributes = "";
  if (isset($html_data["attributes"])) {
      $attributes = " " . join(" ", array_map(function ($key, $value) {
          return "$key=\"$value\"";
      }, array_keys($html_data["attributes"]), $html_data["attributes"]));
  }
  $opening_tag = "<$tag$attributes>";
  $closing_tag = "</$tag>";

  if (!isset($html_data["children"])) {
      return $opening_tag . $closing_tag;
  }

  $children_html = "";
  foreach ($html_data["children"] as $child) {

      $childText = isset($child["text"]) ? $child["text"] : "";
      $children_html .= $opening_tag . $childText . convert_html_to_string($child) . $closing_tag;
  }
  return $children_html;
}

function convert_css_to_string($css_data) {
  $css_styles = "";
  foreach ($css_data as $selector => $value) {
      $styles = join(",", array_map(function ($key, $value) {
          return "$key: $value";
      }, array_keys($value), $value));
      $css_styles .= "$selector { $styles } \n";
  }
  return $css_styles;
}


// usage:
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $projectName = $_POST["update_project_name"];
  $jsonData = $_POST["json_content"];  // Assuming single field for JSON content

  $decodedData = json_decode($jsonData, true);
  if (!$decodedData) {
    echo "Error decoding JSON.";
    exit();
  }

  $htmlData = $decodedData["html"];
  $cssData = $decodedData["css"];

  $htmlString = convert_html_to_string($htmlData);

  $cssString = convert_css_to_string($cssData);

  if (updateProjectFile($projectName, "index.html", $htmlString)) {
    echo "Project '$projectName' HTML updated successfully.";
  } else {
    echo "Failed to update project. Project '$projectName' does not exist.";
  }

  if (updateProjectFile($projectName, "css/style.css", $cssString)) {
    echo "Project '$projectName' CSS updated successfully.";
  } else {
    
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
  <form action="decodingJson.php" method="POST">
    <label for="update_project_name">Project Name:</label>
    <input type="text" id="update_project_name" name="update_project_name" required><br><br>
    <label for="json_content">JSON Content (HTML and CSS):</label><br>
    <textarea id="json_content" name="json_content" rows="10" cols="50" required></textarea><br><br>
    <button type="submit">Update Files</button>
  </form>
  <br>
    <br>
    <a href="viewProjects.php">back</a><br><br><br>
</body>

</html>
