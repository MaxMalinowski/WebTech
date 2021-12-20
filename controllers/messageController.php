<?php

use model\Message;

require("../utils/global.php");

if (!isset($_SESSION["user"])) {
    header("Location: login.php");
}

if (!isset($_POST['friend'])) {
    header(("Location : friends.php"));
}

function getAllMessages()
{
    global $service;
    $chatUsername = "name"; //tbd
    $allMessages = [];

    $service . listMessages($chatUsername);
    $allMessages = array();
    foreach ($allMessages as $msg => $value) {
        $allMessages[] = new Message($msg . new DateTime('now'));
    }
}

function getUserProfile()
{
    global $service;
    $chatUsername = "name"; //tbd
    $service . loadUser($chatUsername);
    // (user as Profile).layout === 'double' ? (this.showSingleLined = false) : (this.showSingleLined = true);

}
function sendMessage()
{
    global $service;
    $username = "name"; //tbd
    $message = "text"; //tbd
    $service->sendMessage($username, $message);
    $message = '';
    //  this.showLoadingIndicator = true;
    // this.scrollToBottom();
}

function removeFriend()
{
    $chatUsername = "name"; //tbd
    if (confirm(`Do you really want to remove $chatUsername as friend?`)) {
        global $service;
        $service->friendRemove($chatUsername);
        header("Location: friends.php");
    }
}
   //scrollToBottom(){
 //   chatElement.scrollTop = chatElement.scrollHeight;
