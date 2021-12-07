<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/style.css" />
    <?php require("../start.php"); ?>
    <title>Friends</title>
  </head>

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
        <li class="friend-list-item" *ngFor="let friend of userFriends" (click)="startChatWithSelectedUsers(friendsName)">
          <div class="friend-list-text" #friendsName>
            {{friend.username}}
          </div>
          <div [hidden]="friend.unreadMessages == null || friend.unreadMessages == 0" class="friend-list-counter">
            {{friend.unreadMessages}}
          </div>
        </li>
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
        [formControl]="typeaheadSuggestions"
        [(ngModel)]="newFriendToAdd"
        (input)="suggestKnownusers()"
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
