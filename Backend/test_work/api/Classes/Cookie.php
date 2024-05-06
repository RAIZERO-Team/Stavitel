<?php
class Cookie
{
    public static function exists($name)
    {
        return isset($_COOKIE[$name]);
    }

    public static function get($name)
    {
        return isset($_COOKIE[$name]) ? $_COOKIE[$name] : null;
    }

    public static function set($name, $value, $expiry)
    {
        if (setcookie($name, $value, time() + $expiry, '/')) {
            return true;
        } else {
            return false;
        }
    }

    public static function delete($name)
    {
        self::set($name, '', time() - 1);
    }
}
