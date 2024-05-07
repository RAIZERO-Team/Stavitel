<?php
require_once("../core/init.php");


if (Input::exists()) {

  $postData = file_get_contents('php://input');
  $formData = json_decode($postData, true);

  // ============== Check if user data is valid ==============
  if ($formData && isset($formData['email']) && isset($formData['password']) && isset($formData['token'])) {
    // ============== Access individual form fields ==============
    $token = Token::generate_TOKEN($formData['token']);

    if (Token::check_token($token)) {
      $email = $formData['email'];
      $password = $formData['password']; {

        $Validate = new Validation();
        $Validate->CheckLogin(
          array(
            'email' =>  $email,
            'password' =>   $password
          )
        );

        if ($Validate->passed()) {
          $user = new User();
          $login = $user->login($email,   $password);
          if ($login) {

            $response = array('message' => 'User logined successfully');
            echo json_encode($response);
            //Redireect::to("index.php");
          } else {
            echo 'failed';
          }
        }
      }
    }
  }
}
