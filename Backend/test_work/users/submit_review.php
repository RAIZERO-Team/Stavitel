<?php
require_once 'db.php';

// Check if form is submitted for adding review
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST["name"];
    $rating = $_POST["rating"];
    $comment = $_POST["comment"];

    // Create a Database object
    $database = new Database();

    // Add review to the database
    $added = $database->addReview($name, $rating, $comment);
    if ($added) {
        header("Location: view_reviews.php"); // Redirect to view reviews page after adding review
    } else {
        echo "Failed to add review.";
    }
}
?>
