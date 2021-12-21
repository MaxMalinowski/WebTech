<?php
require("../utils/global.php");

if (isset($_SESSION["user"])) {
  header("Location: friends.php");
}
$$disable = true;
$fehlermeldungen = array();
$username = '';
$password = '';
$confirm = '';
if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['confirm'])) {
  $username = $_POST['username'];
  $password = $_POST['password'];
  $confirm = $_POST['confirm'];
}

function checkUsername()
{
  if (isset($_POST['username'])) {
    $username = $_POST['username'];
    global $service;
    if (!$service->userExists($username)) {
      if (strlen($username) < 3) {
        $fehlermeldungen[] = 'This username is too short.';
        return false;
      }
      return true;
    }
    $fehlermeldungen[] = 'This username already exists.';
    return false;
  }
}

function checkPassword()
{
  if (isset($_POST['password'])) {
    $password = $_POST['password'];
    if (strlen($password) < 8) {
      $fehlermeldungen[] = 'This password is too short.';
      return false;
    }
    return true;
  }
}

function checkConfirmed()
{
  if (isset($_POST['password']) && isset($_POST['confirm'])) {
    $password = $_POST['password'];
    $confirm = $_POST['confirm'];
  }
  if ($password !== $confirm) {
    $fehlermeldungen[] = 'The passwords do not match.';
    return false;
  }
  return true;
}

function  registerUser()
{
  global $service;
  if (checkUsername() && checkPassword() && checkConfirmed()) {
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
  exit();
}
