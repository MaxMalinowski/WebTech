<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/style.css" />
    <link rel="stylesheet" href="../css/animations.css" />
    <?php require('../controllers/messageController.php') ?>
    <title>Chat</title>
</head>

<body>
    <?php $friend = checkForChatPartner() ?>
    <?php $messages = getAllMessages()?>
    <h1>Chat with <?= $friend->getUsername() ?></h1>

    <div class="top-links">
        <a href="./friends.php"> &lt Back</a> | <a onclick="location.href=<?= '\'./profile.php?friend=' . $friend->getUsername() . '\'' ?>">Profile</a> |
        <a href="./friends.php" class="special-link" onclick="<?= removeFriend() ?>">Remove Friend</a>
    </div>
    <hr />

    <fieldset id="chat" class="special-fieldset">
        <table class="chat-message">
        <?php foreach ($messages as $i => $msg) { 
            echo('<td class="chat-message-name"> '. $msg->getFrom(). "</td>");
            echo('<td class="chat-message-text"> '. $msg->getMsg(). "</td>");
            echo('<td class="chat-message-date"> '. $msg->getDate(). "</td>");
            ?>
                </table>
        <div id="dot-container" class="dot-container">
            <div class="dot-flashing"></div>
        </div>
    </fieldset>
    <hr />

   <form action="<?= 'chat.php?friend=' . $friend->getUsername() ?>" method="post" onsubmit="return <?= sendMessage() ?>" >
        <input class="long-input" id="message" type="text" name="message" placeholder="New Message" autofocus required />
        <button class="long-button" type="submit">Send</button>
    </form> 
</body>

</html>