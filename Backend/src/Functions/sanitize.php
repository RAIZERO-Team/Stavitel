<?php

/*
  *escape function used for escaping special characters in a string to make it safe
*/

function escape($string)
{
  return htmlentities($string, ENT_QUOTES, "UTF-8");
}
