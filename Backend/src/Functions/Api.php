<?php

$postData = file_get_contents('php://input');
$formData = json_decode($postData, true);

# Check if JSON data is valid
if ($formData) {

  $response = processJson($postData);

  # Send the response
  header('Content-Type: application/json');
  echo $response;
  // echo "succecfully" ;
} else {
  # Handle invalid JSON data
  $errorResponse = json_encode(['error' => 'Invalid JSON data']);
  header('Content-Type: application/json');
  http_response_code(400);
  echo $errorResponse;
  // echo "error";
}


function processJson($jsonData)
{
  # put inside this variable the path of project folder
  global $baseDirectory;


  $data = json_decode($jsonData, true);


  $projectName = $data['project_name'];
  $categoryName = $data['category_name'];
  $templateName = $data['template_name'];


  $htmlFilePath = $baseDirectory . '/' . $categoryName . '/' . $templateName . '.html';
  $cssFilePath = $baseDirectory . '/' . $categoryName . '/' . $templateName . '.css';


  $htmlCode = file_get_contents($htmlFilePath);
  $cssCode = file_get_contents($cssFilePath);

  $response = [
    'project_name' => $projectName,
    'category_name' => $categoryName,
    'template_name' => $templateName,
    'html_code' => $htmlCode,
    'css_code' => $cssCode
  ];

  return json_encode($response);
}
