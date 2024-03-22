<?php
session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';


// إنشاء رمز التحقق
$validationCode =$_SESSION['sendemail']['code'] ;

// معلومات البريد الإلكتروني
$toEmail = $_SESSION['sendemail']['email'];
$subject = 'Validation Code';
$message = "Your validation code is: $validationCode";

// إعداد البريد الإلكتروني
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'am736347@gmail.com';
    $mail->Password = 'fodnqgnhpszalntm';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('am736347@gmail.com','ahmed');
    $mail->addAddress($toEmail);

    $mail->isHTML(false);
    $mail->Subject = $subject;
    $mail->Body = $message;

    $mail->send();
   header('location:user_otp.php');
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

// Function to generate validation code

