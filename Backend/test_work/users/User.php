<?php
require_once('db.php');

class user1 {
    protected $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection(); // Accessing the connection here
       
    }

   
    public function login($username, $password) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM test WHERE username = ? AND password = ?");

            $stmt->execute([$username, $password]);

            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            return $user;
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    } 

   
}
?>
