<?php
class Cookie
{
  // ============== Cookie is exists or not ==============
  public static function exists($name)
  {
    return isset($_COOKIE[$name]);
  }

  // ============== Get Cookie ==============
  public static function get($name)
  {
    return isset($_COOKIE[$name]) ? $_COOKIE[$name] : null;
  }

  // ============== Set Cookie ==============
  public static function set($name, $value, $expiry)
  {
    if (setcookie($name, $value, time() + $expiry, '/')) {
      return true;
    } else {
      return false;
    }
  }

  // ============== Delete Cookie  ==============
  public static function delete($name)
  {
    self::set($name, '', time() - 1);
  }
}
