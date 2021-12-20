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
        <h1>Chat with Tom</h1>

        <div class="top-links">
            <a href="./friends.php"> &lt Back</a> | <a href="./profile.php">Profile</a> |
            <a href="./friends.php" class="special-link" onsubmit="removeFriend()">Remove Friend</a>
        </div>

        <hr />

        <fieldset id="chat" class="special-fieldset">
            <div id="dot-container" class="dot-container">
                <div class="dot-flashing"></div>
            </div>
        </fieldset>

        <hr />

        <form onsubmit="return sendMessage()">
            <input
                class="long-input"
                id="message"
                type="text"
                name="message"
                placeholder="New Message"
                autofocus
                required
            />
            <button class="long-button" type="submit">Send</button>
        </form>
    </body>
</html>
