<?php
require("../utils/global.php");

if (isset($_SESSION["user"])) {
  header("Location: friends.php");
}

function registerUser()
{
  global $service;
  $fehlermeldungen = array();
  $username = $_POST['username'];
  $password = $_POST['password'];
  $confirm = $_POST['confirm'];
  $disable = true;
  if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['confirm'])) {
    if ($service->userExists($username)) {
      if (strlen($username) < 3) {
        $fehlermeldungen[] = 'This username is too short.';
      }
      if (strlen($password) < 8) {
        $fehlermeldungen[] = 'This password is too short.';
      }
      if ($password !== $confirm) {
        $fehlermeldungen[] = 'The passwords do not match.';
      }
      if (count($fehlermeldungen) == 0) {
        $$disable = false;
        global $service;
        $username = $_POST['username'];
        $password = $_POST['password'];

        $result = $service->register($username, $password);
        if ($result) {
          $_SESSION["user"] = $username;
          header("Location: friends.php");
        } else {
          http_response_code(403);
          $fehlermeldungen[] = 'Something went wrong';
        }
      }
    }
    $fehlermeldungen[] = 'This username already exists.';
    exit();
  }
}
