<?php
class Input
{
  // ==============  ==============
  public static function exists($type = 'post')
  {
    switch ($type) {
      case 'post':
        return ($_SERVER['REQUEST_METHOD'] === 'POST') ? true : false;
      case 'get':
        return ($_SERVER['REQUEST_METHOD'] === 'GET') ? true : false;
      // case 'put':
      //   return ($_SERVER['REQUEST_METHOD'] === 'PUT') ? true : false;
      // case 'delete':
      //   return ($_SERVER['REQUEST_METHOD'] === 'DELETE') ? true : false;
      default:
        return false;
    }
  }

  // ============== Get function ==============
  public static function getItem($item)
  {
    if (isset($_POST[$item])) {
      return $_POST[$item];
    } else if (isset($_GET[$item])) {
      return $_GET[$item];
    }
    return "";
  }
}
