<?php
class Database {
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $db_name = 'users';
    protected $conn;

    public function __construct() {
        try {
            $this->conn = new PDO("mysql:host={$this->host};dbname={$this->db_name}", $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    public function getConnection() {
        return $this->conn;
    }

    public function addReview($name, $rating, $comment) {
        try {
            $stmt = $this->conn->prepare("INSERT INTO reviews (name, rating, comment) VALUES (:name, :rating, :comment)");
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':rating', $rating);
            $stmt->bindParam(':comment', $comment);
            $stmt->execute();
            return true; // Review added successfully
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false; // Failed to add review
        }
    }

    public function getAllReviews() {
        try {
            $stmt = $this->conn->query("SELECT * FROM reviews");
            $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $reviews;
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false; // Failed to fetch reviews
        }
    }
}
?>
