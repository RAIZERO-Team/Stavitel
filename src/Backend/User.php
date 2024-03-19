<?php
class User{
private $username;
private $email;
private $password;
 
public function  __construct($username, $email, $password) {
$this->username=$username;
$this->email=$email;
$this->password=password_hash($password, PASSWORD_DEFAULT);
}
public function setUsername($username) {
    $this->username = $username;
}
public function setEmail($email) {
    $this->email = $email;
} 
public function setPassword($password) {
    $this->Password = $password;
}

public function getUsername() {
    return $this->username;
}

public function getEmail() {
    return $this->email;
}
public function getPassword() {
    return $this->password;
}


}





