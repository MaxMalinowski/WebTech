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
    [-] copy css from exercise 4
    [x] load friends and generate friends-list
    [-] differenciate between accepted / requestet
    [-] load friend-request and generate request-list
    [-] if friends-list or request-list empty, show info
    [-] add-friends functionality (send and process add-friend request)
    [-] accept-friends functionality (send and process accept-friend request)
    [-] dismiss-friends functionality (send and process dismiss-friend request)
    [-] remove-friends functionality (send and process remove-friend request)
   -->

  <body>
    <?php
      $friendsList = $service->listFriends();
      var_dump($friendsList);
    ?>

    <h1>Friends</h1>

    <div class="top-links">
      <a href="./logout.php"> &lt; Logout</a> |
      <a href="./settings.php">Settings</a>
    </div>

    <fieldset class="special-fieldset">
      <ul>
      <?php foreach ($friendsList as $friend) { ?> 
        <li class="friend-list-item">
          <div class="friend-list-text">
            <a class="friend-list-link" href= <?php echo './chat.php?' . $friend->getUsername() ?>>
              <?= $friend->getUsername() ?>
            </a>
          </div>
          <div class="friend-list-counter" <?php if ($friend->getUnreadMessages() != 0) { ?> hidden <?php } ?>>
            <a class="friend-list-link" href= <?php echo './chat.php?' . $friend->getUsername() ?>>  
              <?= $friend->getUnreadMessages() ?>
            </a>
          </div>
        </li>
      <?php } ?>
      </ul>
    </fieldset>

    <hr />

    <h3>New Request</h3>

    <ol>
      <li class="request-list-item" *ngFor="let requestedFriend of userFriendRequests; index as i">
        <div class="request-list-text">
          Friend request from <b> {{requestedFriend}} </b>
        </div>
        <div class="request-list-buttons">
          <button class="request-button-accept" type="button" (click)="acceptFriendRequest(requestedFriend)">
            Accept
          </button>
          <button class="request-button-dismis" type="button" (click)="rejectFriendRequest(requestedFriend)">
            Reject
          </button>
        </div>
        <hr [hidden]="i == userFriendRequests.length - 1" class="request-list-seperator"/>
      </li>
    </ol>

    <hr />

    <form>
      <input
        id="friend-add-input"
        class="long-input"
        type="text"
        name="new-friend"
        placeholder="Add Friend to List"
        required
      />
      <button class="long-button" type="submit" (click)="createNewFriendRequest()">Add</button>
      <ul class="suggestion-list" *ngIf="allUsersToSuggest.length">
        <li class="suggestion-item" *ngFor="let user of allUsersToSuggest" (click)="selectUserFromSuggestions(user)">
          {{user}}
        </li>
      </ul>
    </form>
  </body>
</html>
