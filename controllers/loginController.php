<?php
require("../utils/global.php");

if (isset($_SESSION["user"])) {
  header("Location: friends.php"); 
} 

function loginUser() {
    if (isset($_POST['username']) && isset($_POST['password'])) {
        global $service;
        $username = $_POST['username']; 
        $password = $_POST['password']; 
        
        $result = $service->login($username, $password);
        if ($result) {
          $_SESSION["user"] = $username;
          header("Location: friends.php"); 
        } else {
          http_response_code(403);
        }
      }
}
?>