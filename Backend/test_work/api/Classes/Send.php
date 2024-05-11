<?php

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Send
{
    private $_db,
    $_id;

    public function __construct()
    {
        $this->_db = DB::getInstance();
    }

    public function validationCode($email)
    {
        $validationCode = rand(9999, 1111);
        $this->_id = $this->_db->get('users', array('email', '=', $email))->first()->id;

        // إنشاء رمز التحقق
        $this->_db->update("users", $this->_id, array(
            'code' => $validationCode
        )
        );
        Session::put('code', $validationCode);

        // معلومات البريد الإلكتروني
        $toEmail = $email;
        $subject = 'Validation Code';
        $message = "<h2>Your validation code is:</h2> <h3><b>$validationCode</b></h3>";

        // إعداد البريد الإلكتروني
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'am736347@gmail.com';
            $mail->Password = 'ptwdogozwmczypgq';
            $mail->SMTPSecure = 'ssl';
            $mail->Port = 465;

            $mail->setFrom('am736347@gmail.com', 'ahmed');
            $mail->addAddress($toEmail);

            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $message;

            $mail->send();
         
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }



    public function validationEmail($email,$name)
{
    

    $toEmail = $email;
    $subject = 'Confirm your account';
    $message =  '
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to RIZERO!</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        .confirm-button {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .confirm-button a {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
        
        </style>
    </head>
    <body>
    
        <div class="container">
            <h2>Hi '.$name.',</h2>
            <p>Welcome to RIZERO! We’re so excited to be a part of your coding journey. To begin mastering your chosen programming language(s), please take a moment to confirm your new (project name) account.</p>
            <p class="confirm-button">
                <a href="http://localhost/api/varfiied.php">Confirm your account</a>
            </p>
            <p>Click the button above to confirm your account and start  your first Kata Progect in Stavitel.</p>
            <p>Best regards,<br>The Codewars Team</p>
        </div>
    
    </body>
    </html>';

    // إعداد البريد الإلكتروني
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'am736347@gmail.com';
        $mail->Password = 'ptwdogozwmczypgq';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        $mail->setFrom('am736347@gmail.com', 'ahmed');
        $mail->addAddress($toEmail);

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $message;

        $mail->send();
     
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

}







// Usage
// Replace $userEmail with the email you want to send the code to.

