<?php
require_once ('core/init.php');

//  DB::getInstance()->update('users',3,array(
//     'username'=> 'ahdddd',
//     'email' => 'am7363477@gmail.com',
//     'password'=> '1234567899',
//  ));

// if(Session::exists('home')){
//  echo  Session::flash('home');

// }



$user=new User();


if($user->get_IsLoggedIn()){
    ?>
     <p>HELLO <?PHP echo $user->get_data()->username ;?></p>

     <ul>
        <li>
            <a href="logout.php">LOGOUT</a><br><br>
         
        </li>
        <li>
        <a href="update.php">update</a>
         
        </li>
     </ul>

<?php
}
else{
    echo   '<p> you need to <a href="login.html">Login</a> or <a href="register.html">Register</a>   </p> ' ; 
}