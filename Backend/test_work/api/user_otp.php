<?php


require_once('core/init.php');

if (!Input::exists()) {
    $response = array('error' => 'No data available for verification.');
    echo json_encode($response);
    return;
}

$postData = file_get_contents('php://input');
$formData = json_decode($postData, true);

if (!isset($formData['code'])) {
    $response = array('error' => 'No code present in the sent data.');
    echo json_encode($response);
    return;
}

$userEmail = Session::get('user_email');
if (empty($userEmail)) {
    $response = array('error' => 'User email is not present in session.');
    echo json_encode($response);
    return;
}

$user = new User();
$userData = $user->get_data($userEmail);

if (empty($userData) || !isset($userData->code) || $formData['code'] !== $userData->code) {
    $response = array('error' => 'Invalid code.');
    echo json_encode($response);
    return;
}

$response = array('message' => 'Code verification successful.');
echo json_encode($response);
