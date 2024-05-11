<?php
require_once("core/init.php");

// Check if form data is submitted
if (Input::exists()) {
    // Retrieve the posted data
    $postData = file_get_contents('php://input');
    
    // Parse JSON data to associative array
    $formData = json_decode($postData, true);
     
    // Check if form data is valid
    if ($formData && isset($formData['email']) && isset($formData['password']) && isset($formData['token'])) {
        // Verify token
        $token = Token::generate_TOKEN($formData['token']);

        if (Token::check_token($token)) {
            $email = $formData['email'];
            $password = $formData['password'];

            // Validate email and password
            $Validate = new Validation();
            $Validate->CheckLogin(array(
                'email' =>  $email,
                'password' =>   $password
            ));

            if ($Validate->passed()) {
                $user = new User();
                $login = $user->login($email, $password);

                if ($login) {
                    // Send success response
                    $response = array('message' => 'User logged in successfully');
                    echo json_encode($response);
                } else {
                    // Send login failed response
                    $response = array('error' => 'Login failed');
                    echo json_encode($response);
                }
            } else {
                // Send validation errors
                $response = array('error' => $Validate->geterrors());
                echo json_encode($response);
            }
        } else {
            // Send token error response
            $response = array('error' => 'Invalid token');
            echo json_encode($response);
        }
    }
}

