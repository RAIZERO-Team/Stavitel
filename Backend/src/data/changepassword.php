<?php
require_once('../core/init.php');

$user = new User();
$validate = new Validation();


if (Input::exists()) {

  $postData = file_get_contents('php://input');
  $formData = json_decode($postData, true);


  if (isset($formData['change_password_new_password']) && isset($formData['change_pass_confirm_new_pass'])) {
    $password = $formData['change_password_new_password'];
    $confpassword = $formData['change_pass_confirm_new_pass'];


    $validation = $validate->CheckRegistration(array('password' => $password));


    if ($validate->passed()) {
      if ($password !== $confpassword) {
        $f = 'Passwords do not match.';
        $response = array('error' => array('confpasserror' => $f));
      } else {
        $user->changeUserpassword(Session::get('user_email'), $password);
      
        $f = '';
        $response = array('message' => 'Password changed successfully.', 'error' => array('confpasserror' => $f));
      }
    } else {

      $response = array('error' => $validate->getErrors());
    }
  } else {

    $response = array('error' => 'Password or confirmation password is missing.');
  }


  header('Content-Type: application/json');
  echo json_encode($response);

  exit;
}
