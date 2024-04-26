<?php
class Hash
{
  // ============== Make Hash  ==============
  public static function make($string, $salt = '')
  {
    return hash('sha256', $string . $salt);
  }

  // ============== Salt function ==============
  public static function salt($length)
  {
    return random_bytes($length);
  }

  // ============== Make Unique Hash ==============
  public static function unique()
  {
    return self::make(uniqid());
  }
}
