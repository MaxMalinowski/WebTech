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
    foreach ($allMessages as $msg => $value) {
        $allMessages[] = new Message($msg->getFrom(), $msg->getMsg(), $msg->getDate());
    }
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
    if (isset($_POST(['message']))) {
        $username = $_GET['friend'];
        $message = $_POST['message'];
        global $service;
        $service->sendMessage($username, $message);
    }


    // this.scrollToBottom();
}

function removeFriend()
{
    $friend = $_GET['friend'];
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if ($_POST['confirm'] == 'Yes') {
            //confirm(`Do you really want to remove $friend as friend?`)) {
            global $service;
            $service->friendRemove($friend);
            header("Location: friends.php");
        }
    }
}
   //scrollToBottom(){
 //   chatElement.scrollTop = chatElement.scrollHeight;
