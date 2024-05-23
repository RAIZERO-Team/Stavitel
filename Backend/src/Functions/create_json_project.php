<?php

function createProjectFromJson($jsonFilePath)
{

  if (!file_exists($jsonFilePath)) {
    echo "JSON file not found.";
    return;
  }


  $jsonContent = file_get_contents($jsonFilePath);
  if ($jsonContent === false) {
    echo "Error reading JSON file.";
    return;
  }


  $jsonData = json_decode($jsonContent, true);
  if ($jsonData === null) {
    echo "Error decoding JSON data.";
    return;
  }


  $projectName = $jsonData['project_name'];
  $htmlContent = $jsonData['existing_html_content'];
  $cssContent = $jsonData['existing_css_content'];


  $projectFolderPath = __DIR__ . "/projects";
  if (!file_exists($projectFolderPath)) {
    mkdir($projectFolderPath);
  }


  $projectFolder = $projectFolderPath . "/$projectName";
  if (!file_exists($projectFolder)) {
    mkdir($projectFolder);
  } else {
    echo "Project folder already exists.";
    return;
  }


  file_put_contents("$projectFolder/index.html", $htmlContent);


  $cssFolderPath = $projectFolder . "/css";
  mkdir($cssFolderPath);
  file_put_contents("$cssFolderPath/css_global.css", "");
  file_put_contents("$cssFolderPath/style.css", $cssContent);

  $jsFolderPath = $projectFolder . "/javascript";
  mkdir($jsFolderPath);
  file_put_contents("$jsFolderPath/js_global.js", "");
  file_put_contents("$jsFolderPath/js_script.js", "");
  $infoFile = $projectFolder . "/info.txt";
  file_put_contents($infoFile, $projectName);
}

$jsonFilePath = "retrive\project_663fa6793a22a4.18851315.json";
createProjectFromJson($jsonFilePath);
