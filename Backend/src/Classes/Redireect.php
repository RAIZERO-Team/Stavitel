<?php

class Redireect
{
  // ============== Redireect function ==============
  public static function to($location = null)
  {
    if ($location) {
      if (is_numeric($location)) {
        switch ($location) {
          case 400:
            header("");
            include("");
            exit();
          case 401:
            header("");
            include("");
            exit();
          case 403:
            header("");
            include("");
            exit();
          case 404:
            header("HTTP/1.0 404 Not Found");
            include("includes/errors/404.php");
            exit();
          case 500:
            header("");
            include("");
            exit();
          case 503:
            header("");
            include("");
            exit();
          case 504:
            header("");
            include("");
            exit();
        }
      }
      header("location:$location");
      exit();
    }
  }
}
