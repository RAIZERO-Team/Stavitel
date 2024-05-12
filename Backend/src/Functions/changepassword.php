<?php
require_once('../core/init.php');

$user = new User();
$validate = new Validation();


if (Input::exists()) {

  $postData = file_get_contents('php://input');
  $formData = json_decode($postData, true);


  if (isset($formData['password']) && isset($formData['confpassword'])) {
    $password = $formData['password'];
    $confpassword = $formData['confpassword'];


    $validation = $validate->CheckRegistration(array('password' => $password));

    // If validation passes
    if ($validate->passed()) {
      if ($password !== $confpassword) {
        $f = 'Passwords do not match.';
        $response = array('error' => array('confpasserror' => $f));
      } else {
        $user->changeUserpassword(Session::get('user_email'), $password);
        // قم بتعيين رسالة الخطأ إلى قيمة فارغة بعد تغيير كلمة المرور بنجاح
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
