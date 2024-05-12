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
            header("location:../../../Frontend/src/View/Error/404_Not_Found.html");
            // include("Frontend/src/View/Error/404_Not_Found.html");
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
