<?php
require_once("core/init.php");
// class Session
// {
//     public static function put($name, $value)
//     {
//         return $_SESSION[$name] = $value;

//     }
//     public static function get($name)
//     {
//         return $_SESSION[$name];
//     }
//     public static function exists($sessin_name)
//     {
//         return (isset($_SESSION[$sessin_name])) ? true : false;
//     }
//     public static function delete($sessin_name)
//     {
//         if (self::exists($sessin_name)) {
//             unset($_SESSION[$sessin_name]);
//         }

//     }
//     public static function flash($sessin_name,$string=""){
//         if (self::exists($sessin_name)) {
//            $Session=self::get($sessin_name);
//            self:: delete($sessin_name);
//             return $Session;

//         }
//         else{
//             self ::put($sessin_name,$string);
//         }

//     }
//}


 $dp=DB::getInstance();
 $dp->get('users_session',array('hash','=','1'));

if($dp->count()> 0){
    echo 'feeeeeeeeeee';
}
