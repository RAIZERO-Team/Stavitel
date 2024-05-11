 
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Reviews</title>
</head>
<body>
    <h2>Reviews</h2>
    <?php
    require_once 'db.php';

    // Create a Database object
    $database = new Database();

    // Display existing reviews
    $reviews = $database->getAllReviews();
    if (!empty($reviews)) {
        foreach ($reviews as $review) {
            echo "<div>";
            echo "<strong>Name:</strong> " . $review['name'] . "<br>";
            echo "<strong>Rating:</strong> " . $review['rating'] . "<br>";
            echo "<strong>Comment:</strong> " . $review['comment'] . "<br>";
            echo "</div><br>";
        }
    } else {
        echo "No reviews yet.";
    }
    ?>
</body>
</html>
