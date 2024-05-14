<?php

class Validation
{
  private static $errors = [];
  private static $_passed = false;  // this is un used
  private $db;

  public function __construct()
  {
    $this->db = DB::getInstance();
  }

  // ============== CheckRegistration function ==============
  public static function CheckRegistration($data = array())
  {
    self::$errors = [];

    foreach ($data as $key => $value) {
      switch ($key) {
        case 'username':
          self::validateUsername($value);
          break;
        case 'email':
          self::validateEmail($value, true);
          break;
        case 'password':
          self::validatePassword($value);
          break;
        default:
          break;
      }
    }
    return empty(self::$errors);
  }

  // ============== CheckLogin function ==============
  public static function CheckLogin($data = array())
  {
    self::$errors = [];

    self::validateEmail($data['email']);

    self::validatePassword($data['password']);

    return empty(self::$errors);
  }

  // ============== return error function ==============
  public static function getErrors()
  {
    return self::$errors;
  }

  // ============== validateUsername function ==============
  private static function validateUsername($username)
  {
    if (empty($username)) {
      self::$errors['username'] = "Please enter a username.";
    } elseif (strlen($username) < 3) {
      self::$errors['username'] = "Username must be at least 3 characters.";
    }
  }

  // ============== validateEmail function ==============
  private static function validateEmail($email, $isRegistration = false)
  {
    if (empty($email)) {
      self::$errors['email'] = "Please enter an email address.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      self::$errors['email'] = "Invalid email address.";
    } elseif ($isRegistration && self::isEmailExist($email)) {
      self::$errors['email'] = "Email already exists.";
    }
  }

  // ============== validate Password function ==============
  private static function validatePassword($password, $isRegistration = false)
  {
    if (empty($password)) {
      self::$errors['password'] = "Please enter a password.";
    } elseif (strlen($password) < 8 && $isRegistration) {
      self::$errors['password'] = "Password must be at least 8 characters.";
    } elseif (!preg_match('/[A-Z]/', $password)) {
      self::$errors['password'] = "Password must contain at least one uppercase letter.";
    } elseif (!preg_match('/[a-z]/', $password)) {
      self::$errors['password'] = "Password must contain at least one lowercase letter.";
    } elseif (!preg_match('/\d/', $password)) {
      self::$errors['password'] = "Password must contain at least one number.";
    } elseif (!preg_match('/[!@#$%^&*()\-_=+{};:,<.>]/', $password)) {
      self::$errors['password'] = "Password must contain at least one special character.";
    }
  }

  // ============== Is Email Exist function ==============
  static function isEmailExist($email)
  {
    $validation = new self();
    return $validation->db->emailExists($email);
  }

  // ============== passed function ==============
  public function passed()
  {
    return empty(self::$errors) ? true : false;
  }
}
