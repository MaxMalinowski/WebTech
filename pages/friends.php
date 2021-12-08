<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/friends.css" />
    <?php 
      require("../php/global.php");
      if (!isset($_SESSION["user"])) {
        header("Location: login.php"); 
      } 
    ?>
    <title>Friends</title>
  </head>

  <!-- 
    TODO:
    [x] load global.php and check for user in session
    [x] copy css from exercise 4
    [x] load friends and generate friends-list
    [x] differenciate between accepted / requestet
    [x] load friend-request and generate request-list
    [x] if friends-list empty, show info
    [-] add-friends functionality (send and process add-friend request)
    [-] accept-friends functionality (send and process accept-friend request)
    [-] dismiss-friends functionality (send and process dismiss-friend request)
    [-] remove-friends functionality (send and process remove-friend request)
    [-] check and polish ui/ux
    [-] user suggestions
   -->

  <body>
    <?php
      $allFriends = $service->listFriends();
      $allUsers = $service->listUsers();
      $friendsList = [];
      $requestsList = [];
      
      foreach($allFriends as $friend) {
        if ($friend->getStatus() == 'accepted') {
          array_push($friendsList, $friend);
        } elseif ($friend->getStatus() == 'requested') {
          array_push($requestsList, $friend);
        }
      }
    ?>

    <h1>Friends</h1>

    <div class="top-links">
      <a href="./logout.php"> &lt; Logout</a> |
      <a href="./settings.php">Settings</a>
    </div>

    <fieldset class="special-fieldset">
      <?php if (count($friendsList) == 0) { ?>
        <div class="friend-list-text">
          No Friends - add someone
        </div>
      <?php } else { ?>
        <ul>
        <?php foreach ($friendsList as $friend) { ?> 
          <li class="friend-list-item" onclick="location.href=<?php echo '\'./chat.php?' . $friend->getUsername() . '\'' ?>">
            <div class="friend-list-text">
              <?= $friend->getUsername() ?>
            </div>
            <div class="friend-list-counter" <?php if ($friend->getUnreadMessages() == 0) { ?> hidden <?php } ?>>
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
      <?php foreach ($friendsList as $i => $friend) { ?>
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
              <hr class="request-list-seperator" <?php if ($i == count($friendsList) - 1) { ?> hidden <?php } ?> />
          </form>
          </li>
        <?php } ?>
      </ol>
    <hr />

    <form method="post">
      <input class="long-input" type="text" name="username" placeholder="Add Friend to List" required/>
      <button class="long-button" type="submit" name="action" value="add-friend">Add</button>
      <!-- To Be Done ... 
      // <?php if (count($userList) > 0) { ?>
      //   <ul class="suggestion-list">
      //     <?php foreach ($userList as $user) { ?> 
      //       <li class="suggestion-item">
      //         <?= $user->getUsername() ?>
      //       </li>
      //     <?php } ?>
      //   </ul>
      // <?php } ?> 
      -->
    </form>
  </body>
</html>
