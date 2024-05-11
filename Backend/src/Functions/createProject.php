<?php

$postData = file_get_contents('php://input');
$formData = json_decode($postData, true);

//implementation of create project

if ($formData && isset($formData['project_name'])) {
  $projectName = $formData['project_name'];
  if (createProject($projectName)) {
    echo "Project '$projectName' created successfully.";
    $response = array('message' => 'Project created successfully');
    echo json_encode($response);
  } else {
    // echo "Failed to create project. Project '$projectName' already exists.";
  }
}

function createProject($projectName)
{
  $projectPath = "../projects/" . $projectName;
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
  } else {
    $response = array('name' => 'project_name');
    echo json_encode($response);
  }
  return false;
}
