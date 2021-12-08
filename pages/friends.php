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
    [x] add-friends functionality (send and process add-friend request)
    [x] accept-friends functionality (send and process accept-friend request)
    [x] dismiss-friends functionality (send and process dismiss-friend request)
    [x] remove-friends functionality (send and process remove-friend request)
    [x] check and polish ui/ux
    [-] code cleanup & improvements
    [-] form resubmission
   -->

  <body>

    <?php
      ## Process POST-Requests
      $valid = true;
      if (isset($_POST['action'])) {
        $action = $_POST['action'];
        $username = $_POST['username'];
          
        switch ($_POST['action']) {
          case 'add-friend':
              $allUsers = $service->listUsers();
              $valid = $service->userExists($username);
              if ($valid) {
                $result = $service->friendRequest($username);
              }
              break;
          
            case 'accept-friend':
              $result = $service->friendAccept($username);
              break;
          
            case 'dismiss-friend':
              $result = $service->friendDismiss($username);
              break;
            
            case 'REMOVE-friend':
              $result = $service->friendRemove($username);
              break;
          
            default:
              break;
        }    
      }
    ?>

    <?php
      ## Prepare arrays for HTML document
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
        <div class="friend-list-placeholder">
          You have not added any friends yet. Add or accept your first friend ...
        </div>
      <?php } else { ?>
        <ul>
        <?php foreach ($friendsList as $friend) { ?> 
          <!-- Solution with JavaScript -->
          <li class="friend-list-item" onclick="location.href=<?php echo '\'./chat.php?' . $friend->getUsername() . '\'' ?>">
            <div class="friend-list-text">
              <?= $friend->getUsername() ?>
              <!-- Solution without JavaScript 
              <a href=".chat.php?<?php echo '\'./chat.php?' . $friend->getUsername() . '\'' ?>">
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
      <input class="long-input <?php if (!$valid) { ?> invalid <?php } ?>" type="text" name="username" placeholder="<?php if (!$valid) { ?> The user you enterd is not known... <?php } else { ?> Add new friend...<?php } ?>" required/>
      <button class="long-button" type="submit" name="action" value="add-friend">Add</button>
    </form>
  </body>
</html>
