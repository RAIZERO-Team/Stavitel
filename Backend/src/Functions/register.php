<?php
require_once('../core/init.php');

if (Input::exists()) {
  $postData = file_get_contents('php://input');
  $formData = json_decode($postData, true);

  // ============== Check if user data is valid ==============
  if ($formData && isset($formData['register_username']) && isset($formData['register_email']) && isset($formData['register_password']) && isset($formData['token'])) {
    // ============== Access individual form fields ==============
    $token = Token::generate_TOKEN($formData['token']);

    if (Token::check_token($token)) {

      $username = $formData['register_username'];
      $email = $formData['register_email'];
      $password = $formData['register_password'];

      // Insert data into database
      $validate = new Validation();
      $validation = $validate->CheckRegistration(
        array(
          'username' => $username,
          'email' => $email,
          'password' => $password
        )
      );
      $user = new User();
      $salt = Hash::salt(32);

      if ($validate->passed()) {
        try {
          Session::put('user_data', array(
            'username' => $username,
            'email' => $email,
            'password' => Hash::make($password, $salt),
            'salt' => $salt,
            'join' => date('Y-m-d H:i:s'),
            'group' => 1,
            'varified' => 'yes'
          ));
          $response = array('message' => 'User registered successfully');
          echo json_encode($response);
        } catch (Exception $e) {
          $response = array('error' => 'Error registering user: ' . $e->getMessage());
          echo json_encode($response);
        }
      } else {
        $response = array('error' => $validate->getErrors());

        echo json_encode($response);
      }
    } else {
      $response = array('error' => 'Invalid form data');
      echo json_encode($response);
    }
  } else {
    // Handle invalid request method
    http_response_code(405);
    echo "Method Not Allowed";
  }
}
?>