<?php
require_once ("core/init.php");
if (Input::exists()) {
    if (Token::check_token(Input::getItem("token"))) {
        $Validate = new Validation();
        $Validate->CheckLogin(
            array(
                'email' => $_POST['email'],
                'password' => $_POST['password']
            )
        );

        if ($Validate->passed()) {
            $user = new User();
            $remember = (Input::getItem('remember') === 'on') ? true : false;
            $login = $user->login(Input::getItem('email'), Input::getItem('password'), $remember);

            if ($login) {

                echo 'secses';
                Redireect::to("indexc.php");
            } else {
                echo 'failed';
            }
        }

    }
}


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/main.css">
</head>

<body>
    <div class="main">
        <i>Let's enjoy</i><br><br>
        <form method="POST" action="">

            <input type="text" name="email" id="email" placeholder="Email"><br>
            <h6>
                <?php if (isset(Validation::getErrors()['email'])) {
                    echo Validation::getErrors()['email'] . "<br>";
                } ?>
            </h6>
            <input type="password" name="password" id="password" placeholder="Password"><br>
            <h6><a href="forgot-password.php">Forgot my password</a></h6><br>
            <input type="checkbox" name="remember" value="on" id="remmber">Remember me
            <br>
            <input type="hidden" name="token" value="<?php echo Token::generate_TOKEN(); ?>">
            <input type="submit" name="submit" id="submit" value="Login"><br>
        </form>

        <h3>OR</h3><br>
        <a id="register" href="register.php">Register</a>
    </div>
</body>

</html>