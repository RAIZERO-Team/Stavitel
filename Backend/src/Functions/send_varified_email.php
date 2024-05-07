<?php

require_once("../core/init.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $postData = file_get_contents('php://input');
  $data = json_decode($postData, true);

  if ($data && isset($data['userEnteredPage']) && $data['userEnteredPage'] === true) {
    // Assuming Send::validationEmail() method sends the email
    $send = new Send();
    $send->validationEmail(Session::get('user_data')['email'], Session::get('user_data')['username']);

    $response = array('message' => 'Email sent successfully');
    echo json_encode($response);
  } else {
    $response = array('error' => 'Invalid data');
    echo json_encode($response);
  }
} else {
  http_response_code(405); // Method Not Allowed
  exit("Method not allowed");
}
