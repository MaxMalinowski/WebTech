<?php

use model\Message;

require("../utils/global.php");

if (!isset($_SESSION["user"])) {
    header("Location: login.php");
}

if (!isset($_GET['friend'])) {
    header(("Location: friends.php"));
}
$friend = $_GET['friend'];

function getAllMessages()
{
    global $service;
    $friend = $_GET['friend'];
    $allMessages = [];
    $service->listMessages($friend);
    $allMessages = array();
    foreach ($allMessages as $msg => $value) {
        $allMessages[] = new Message($msg->getFrom(), $msg->getMsg(), $msg->getDate());
    }
}

function getUserProfile()
{
    global $service;
    $friend = $_GET['friend'];
    $service->loadUser($friend);
    // (user as Profile).layout === 'double' ? (this.showSingleLined = false) : (this.showSingleLined = true);

}
function sendMessage()
{
    global $service;
    $username = $_GET['friend'];
    $message = $_GET['message'];
    $service->sendMessage($username, $message);
    $message = '';
    //  this.showLoadingIndicator = true;
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
