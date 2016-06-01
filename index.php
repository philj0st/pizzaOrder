<?php
  $to      = $_ENV["RECEIVER_EMAIL"];
  $subject = 'order';
  $message = $_POST['order'];
  $headers = 'From: '. $_ENV["SENDER_EMAIL"] . "\r\n" .
      'Reply-To: '. $_ENV["SENDER_EMAIL"] . "\r\n" .
      'X-Mailer: PHP/' . phpversion();
  $result = mail($to, $subject, $message, $headers);
  if ($result) {
    // TODO: send json answer with success of fail
    echo 'mail sent succesfully';
  }
?>
