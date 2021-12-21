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

function getAllMessages()
{
    $friend = $_GET['friend'];
    $allMessages = [];
    global $service;
    $allMessages = $service->listMessages($friend);
    foreach ($allMessages as $i => $msg) {
        $allMessages[] = new Message($msg->getFrom(), $msg->getMsg(), $msg->getDate());
    }
    return $allMessages;
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
    $message = 'leer';
    var_dump($_POST['message']);
    if (isset($_POST['message'])) {
        $username = $_GET['friend'];
        $message = $_POST['message'];
        global $service;
        if ($message !== "") {
            $service->sendMessage($username, $message);
        }
    }
    // this.scrollToBottom();
}

function removeFriend()
{
    global $service;
    $result = $service->friendRemove($_GET["friend"]);
}
   //scrollToBottom(){
 //   chatElement.scrollTop = chatElement.scrollHeight;
