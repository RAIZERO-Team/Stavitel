<?php
class Token
{
    public static function generate_TOKEN()
    {

        return Session::put(Config::get("session/token_name"), md5(uniqid()));
    }


    public static function check_token($token)
    {
        $token_name = Config::get("session/token_name");

        if (Session::exists($token_name) && $token == Session::get($token_name))  {
            Session::delete($token_name);
            return true;
            }
            return false;

        
    }
}