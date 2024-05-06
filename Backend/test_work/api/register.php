<?php
require_once('core/init.php');

if (Input::exists()) {
    // Retrieve the posted data
    $postData = file_get_contents('php://input');
    
    // Parse JSON data to associative array
    $formData = json_decode($postData, true);
    
    // Check if form data is valid
    if ($formData && isset($formData['username']) && isset($formData['email']) && isset($formData['password'])&& isset($formData['token'])) {
        // Access individual form fields
      $token= Token::generate_TOKEN($formData['token']);

    if(Token::check_token($token)){

    

        $username = $formData['username'];
        $email = $formData['email'];
        $password = $formData['password'];

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
                Session::put('user_data',array(
                    'username' => $username,
                    'email' => $email,
                    'password' => Hash::make($password, $salt),
                    'salt' => $salt,
                    'join' => date('Y-m-d H:i:s'),
                    'group' => 1,
                    'varified' => 'yes'
                )) ;
                $response = array('message' => 'User registered successfully');
                echo json_encode($response);


                
            } catch (Exception $e) {
                $response = array('error' => 'Error registering user: ' . $e->getMessage());
                echo json_encode($response);
            }
        } else {
            $response = array('error'=> $validate->getErrors());
       
            echo json_encode($response);
        }
    } else {
        $response = array('error' => 'Invalid form data');
        echo json_encode($response);
    }
} else {
    // Handle invalid request method
    http_response_code(405);
    echo "Method Not Allowed";// redirect to 404
}}