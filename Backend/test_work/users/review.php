<?php
require_once 'db.php';


$database = new Database();


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $rating = $_POST["rating"];
    $comment = $_POST["comment"];


    $added = $database->addReview($name, $rating, $comment);
    if ($added) {
        echo "Review added successfully.";
    } else {
        echo "Failed to add review.";
    }
}


$reviews = $database->getAllReviews();
if (!empty($reviews)) {
    foreach ($reviews as $review) {
        echo "Name: " . $review['name'] . "<br>";
        echo "Rating: " . $review['rating'] . "<br>";
        echo "Comment: " . $review['comment'] . "<br><br>";
    }
} else {
    echo "No reviews yet.";
}
?>
