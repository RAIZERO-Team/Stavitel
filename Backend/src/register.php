<?php
require_once ('core/init.php');


if (Input::exists()) {
    if (Token::check_token(Input::getItem("token"))) {


        $validate = new Validation();
        $validationt = $validate->CheckRegistration(
            array(
                'username' => $_POST['username'],
                'email' => $_POST['email'],
                'password' => $_POST['password']
            )
        );
        $user = new User();
        $salt = Hash::salt(32);


        if ($validate->passed()) {
            try {


                $user->create(
                    array(
                        'username' => Input::getItem('username'),
                        'email' => Input::getItem('email'),
                        'password' => Hash::make(Input::getItem('password'), $salt),

                        'salt' => $salt,
                        'join' => date('Y-m-d H:i:s'),
                        'group' => 1,
                    )
                );
                Session::flash('home', 'lest login');
                // Redireect::to(404);
            } catch (Exception $e) {

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
    <title>Register</title>
    <link rel="stylesheet" href="css/main.css">
</head>

<body>




    <div class="main">
        <i>Register</i><br>
        <form action="" method="post">






            <input type="text" name="username" id="username" value="<?php echo Input::getItem('username'); ?>"
                placeholder="username"> <br>
            <h6>
                <?php if (isset(Validation::getErrors()['username'])) {
                    echo Validation::getErrors()['password'] . "<br>";
                } ?>
            </h6>

            <input type="email" name="email" id="email" value="<?php echo Input::getItem('email') ?>"
                placeholder="email"> <br>
            <h6>
                <?php if (isset(Validation::getErrors()['email'])) {
                    echo Validation::getErrors()['email'] . "<br>";
                } ?>
            </h6>

            <input type="password" name="password" id="" placeholder="password"><br>
            <h6>
                <?php if (isset(Validation::getErrors()['password'])) {
                    echo Validation::getErrors()['password'] . "<br>";
                } ?>
            </h6>
            Gender
            <select name="gender" id="gender" title="Gender chosse Male or Female">
                <option disabled selected value="">chosse</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select><br>

            <input type="hidden" name="token" value="<?php echo Token::generate_TOKEN(); ?>">
            <input type="submit" name="submit" id="submit" value="Register"><br>
        </form>
        <h3>OR</h3><br>
        <a href="login.php" id="log" target="_BLOCK">login</a>
    </div>
</body>

</html>