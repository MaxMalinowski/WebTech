<?php
require("../utils/global.php");

function checkForPresentUser() {
    if (!isset($_SESSION["user"])) {
        header("Location: login.php"); 
    }
}

function processFriendRequests() {
    if (isset($_POST['action']) && isset($_POST['username'])) {
        global $service;
        $action = $_POST['action'];
        $username = $_POST['username'];
            
        switch ($action) {
            case 'add-friend':
                $service->userExists($username)
                ? ($service->friendRequest($username)
                    ? header("Location: friends.php")
                    : http_response_code(500))
                :http_response_code(404);
                break;

            case 'accept-friend':
                $service->friendAccept($username) 
                ? header("Location: friends.php")
                : http_response_code(500); 
                break;
            
            case 'dismiss-friend':
                $service->friendDismiss($username)
                ? header("Location: friends.php")
                : http_response_code(500); 
                break;
            
            case 'REMOVE-friend':
                $service->friendRemove($username)
                ? header("Location: friends.php")
                : http_response_code(500); 
                break;
            
            default:
                break;
        }  
    }
}

function getFriendsInformation() {
    global $service;
    $friendsList = [];
    $requestsList = [];

    $allFriends = $service->listFriends();
    foreach($allFriends as $friend) {
        if ($friend->getStatus() == 'accepted') {
            array_push($friendsList, $friend);
        } elseif ($friend->getStatus() == 'requested') {
            array_push($requestsList, $friend);
        }
    }

    return array($friendsList, $requestsList);
}
?>

