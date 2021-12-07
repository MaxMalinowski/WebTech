<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require("../php/global.php")?>
    <title>Test BackendService</title>
</head>
<body>
    <p>
        <b>Test: Login</b> <br>
        <?php var_dump($service->login('', ''))?>
    </p>
    <hr>
    <p>
        <b>Test: Register</b> <br>
        <?php var_dump($service->register('', ''))?>
    </p>
    <hr>
    <p>
        <b>Test: UserExists</b> <br>
        <?php var_dump($service->userExists(''))?>
    </p>
    <hr>
    <p>
        <b>Test: LoadUser</b> <br>
        <?php var_dump($service->loadUser(''))?>
    </p>
    <hr>
    <p>
        <b>Test: SaveUser</b> <br>
        <?php var_dump($service->saveUser(new \model\User()))?>
    </p>
    <hr>
    <p>
        <b>Test: ListUsers</b> <br>
        <?php var_dump($service->listUsers())?>
    </p>
    <hr>
    <p>
        <b>Test: ListMessages</b> <br>
        <?php var_dump($service->listMessages(''))?>
    </p>
    <hr>
    <p>
        <b>Test: SendMessage</b> <br>
        <?php var_dump($service->sendMessage('', ''))?>
    </p>
    <hr>
    <p>
        <b>Test: GetUnread</b> <br>
        <?php var_dump($service->getUnread())?>
    </p>
    <hr>
    <p>
        <b>Test: ListFriends</b> <br>
        <?php var_dump($service->listFriends())?>
    </p>
    <hr>
    <p>
        <b>Test: FriendRequest</b> <br>
        <?php var_dump($service->friendRequest(''))?>
    </p>
    <hr>
    <p>
        <b>Test: FriendAccept</b> <br>
        <?php var_dump($service->friendAccept(''))?>
    </p>
    <hr>
    <p>
        <b>Test: FriendDismiss</b> <br>
        <?php var_dump($service->friendDismiss(''))?>
    </p>
    <hr>
    <p>
        <b>Test: FriendDelete</b> <br>
        <?php var_dump($service->friendRemove(''))?>
    </p>
</body>
</html>