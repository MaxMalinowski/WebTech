<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/chat.css" />
    <link rel="stylesheet" href="../css/animations.css" />
    <script src="../javascript/chat.js"></script>
    <?php require('../controllers/messageController.php') ?>
    <script>
        window.chatToken = "<?= $_SESSION['chat_token'] ?>";
        window.chatCollectionId = "<?= CHAT_SERVER_ID ?>";
        window.chatServer = "<?= CHAT_SERVER_URL ?>";
        window.authToken = "<?= $_SESSION['chat_token'] ?>";
    </script>
    <title>Chat</title>
</head>

<body>
    <?php $friend = checkForChatPartner() ?>
    <?php sendMessage() ?>

    <h1>Chat with <?= $friend->getUsername() ?></h1>
    <script>
        window.setInterval(function() {
            recieveMessages("<?= $friend->getUsername() ?>");
            if (messagesOnServer.length > messagesDisplayed) {
                appendMessages(messagesOnServer.slice(messagesDisplayed));
            }
        }, 1000);
    </script>

    <div class="top-links">
        <a href="./friends.php"> &lt Back</a> | <a onclick="location.href=<?= '\'./profile.php?friend=' . $friend->getUsername() . '\'' ?>">Profile</a> |
        <a class="special-link" onclick="location.href=<?= '\'./friends.php?action=remove-friend&username=' . $friend->getUsername() . '\'' ?>">Remove Friend</a>
    </div>
    <hr />

    <fieldset id="chat" class="special-fieldset">
        <div id="dot-container" class="dot-container">
            <div class="dot-flashing"></div>
        </div>
    </fieldset>
    <hr />

    <form action="<?= 'chat.php?friend=' . $friend->getUsername() ?>" method="post">
        <input class="long-input" id="message" type="text" name="message" placeholder="New Message" autofocus required />
        <button class="long-button" type="submit">Send</button>
    </form>
</body>

</html>