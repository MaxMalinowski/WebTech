<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/friends.css" />
    <?php require('../controllers/friendsController.php') ?>
    <title>Friends</title>
  </head>

  <body>
    <?php processFriendRequests() ?>
    <?php list($friendsList, $requestsList) = getFriendsInformation() ?>

    <h1>Friends</h1>

    <div class="top-links">
      <a href="./logout.php"> &lt; Logout</a> |
      <a href="./settings.php">Settings</a>
    </div>

    <fieldset class="special-fieldset">
      <?php if (count($friendsList) == 0) { ?>
        <div class="friend-list-placeholder">
          You have not added any friends yet. Add or accept your first friend ...
        </div>
      <?php } else { ?>
        <ul>
        <?php foreach ($friendsList as $friend) { ?> 
          <!-- Solution with JavaScript -->
          <li class="friend-list-item" onclick="location.href=<?='\'./chat.php?' . $friend->getUsername() . '\'' ?>">
            <div class="friend-list-text">
              <?= $friend->getUsername() ?>
              <!-- Solution without JavaScript 
              <a href=".chat.php?<?= '\'./chat.php?friend=' .$friend->getUsername() . '\'' ?>">
                <?= $friend->getUsername() ?>
              </a> -->
            </div>
            <div class="friend-list-counter">
              <?= $friend->getUnreadMessages() ?>
            </div>
          </li>
        <?php } ?>
        </ul>
      <?php } ?>
    </fieldset>

    <hr />

    <h3>New Request</h3>

    <ol>
      <?php foreach ($requestsList as $i => $friend) { ?>
        <li class="request-list-item">
          <form method="post">
            <div class="request-list-text">
                Friend request from <b> <?= $friend->getUsername() ?> </b>
              </div>
              <div class="request-list-buttons">
                <input type="hidden" name="username" value="<?= $friend->getUsername() ?>"/>
                <button class="request-button-accept" type="submit" name="action" value="accept-friend">Accept</button>
                <button class="request-button-dismis" type="submit" name="action" value="dismiss-friend">Reject</button>
              </div>
              <hr class="request-list-seperator" <?php if ($i == count($requestsList) - 1) { ?> hidden <?php } ?> />
          </form>
          </li>
        <?php } ?>
      </ol>
    <hr />

    <form method="post">
      <?php if (http_response_code() == 404) { ?>
          <input class="long-input invalid" type="text" name="username" placeholder="The user you enterd is not known..." required/>
        <?php } else { ?>
          <input class="long-input" type="text" name="username" placeholder="Add new friend..." required/>
        <?php } ?>
      <button class="long-button" type="submit" name="action" value="add-friend">Add</button>
    </form>
  </body>
</html>
