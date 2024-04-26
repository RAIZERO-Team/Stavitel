<?php
class Session
{
  // ============== Create Session function ==============
  public static function put($name, $value)
  {
    return $_SESSION[$name] = $value;
  }

  // ============== Get Session function ==============
  public static function get($name)
  {
    return $_SESSION[$name] ?? null;
  }

  // ============== Check Is Session Is Exists Or Not function ==============
  public static function exists($session_name)
  {
    return isset($_SESSION[$session_name]);
  }

  // ============== Delete Session function ==============
  public static function delete($session_name)
  {
    if (self::exists($session_name)) {
      unset($_SESSION[$session_name]);
    }
  }

  // ============== Flash function ==============
  public static function flash($session_name, $string = "")
  {
    if (self::exists($session_name)) {
      $session = self::get($session_name);
      self::delete($session_name);
      return $session;
    } else {
      self::put($session_name, $string);
    }
  }
}
