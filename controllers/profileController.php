<?php
require("../utils/global.php");

if (!isset($_SESSION["user"])) {
    header("Location: login.php");
}

if (!isset($_GET["friend"])) {
    header("Location: chat.php");
}

function loadUserInfo() {
    global $service;
    $friend = $service->loadUser($_GET["friend"]);
    return $friend;
}

?>