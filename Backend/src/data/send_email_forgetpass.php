<?php
require_once('../core/init.php');

use PHPMailer\PHPMailer\Exception;

if (Input::exists()) {
  $postData = file_get_contents('php://input');
  $formData = json_decode($postData, true);

  if (isset($formData['forget_password_email'])) {
    $email = $formData['forget_password_email'];

    if (Validation::isEmailExist($email)) {
      $send = new Send();

      try {
        $send->validationcode($email);
        $response = array('message' => 'Validation code sent successfully');
        Session::put('user_email', $email);
        echo json_encode($response);
      } catch (Exception $e) {
        $response = array('error' => 'Error sending validation code: ' . $e->getMessage());
        echo json_encode($response);
      }
    } else {
      $response = array('error' => 'Email not Found');
      echo json_encode($response);
    }
  } else {
    $response = array('error' => 'Email not provided');
    echo json_encode($response);
  }
} else {
  $response = array('error' => 'No data provided');
  echo json_encode($response);
}
