<?php

use model\Message;


require("../utils/global.php");
ini_set("display_errors", 1);

if (!isset($_SESSION["user"])) {
    header("Location: login.php");
}
if (!isset($_GET['friend'])) {
    header("Location: friends.php");
}

function checkForChatPartner()
{
    global $service;
    return $service->loadUser($_GET['friend']);
}





function getUserProfile()
{
    global $service;
    $user = $service->loadUser($_GET['friend']);
    $layout = $user->getLayout();
    return $layout;
}


function sendMessage()
{
    $message = '';
    if (isset($_POST['message'])) {
        $username = $_GET['friend'];
        $message = $_POST['message'];
        global $service;
        if (!empty($message)) {
            $service->sendMessage($username, $message);
        }
    }
    
}


