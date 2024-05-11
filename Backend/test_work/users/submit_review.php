<?php
require_once 'db.php';

$postData = file_get_contents('php://input');
$formData = json_decode($postData, true);

// Check if form is submitted for adding review
if ($formData && isset($formData['user_rate']) && isset($formData['user_feedback'])) {

  // Get form data
  $name = "Test";
  $user_rate = $formData['user_rate'];
  $user_feedback = $formData['user_feedback'];
  // $rating = $_POST["rating"];
  // $comment = $_POST["comment"];

    // Create a Database object
    $database = new Database();

    // Add review to the database
    $added = $database->addReview($name, $user_rate, $user_feedback);
    if ($added) {
        // header("Location: view_reviews.php");
        $response = array('message' => 'successfully');
        echo json_encode($response);
    } else {
        $response = array('message' => 'Failed to add review.');
        echo json_encode($response);
    }
}
?>
