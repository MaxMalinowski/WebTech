<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/style.css" />
    <?php require("../controllers/profileController.php") ?>
    <title>Profile</title>
  </head>

  <body>
    <?php $friend = loadUserInfo() ?>
    <h1>Profile of <?=$friend->getUsername()?> </h1>

    <!--two hyperlinks to navigate back to chat/remove the friend-->
    <div class="top-links">
      <a onclick="location.href=<?='\'./chat.php?friend=' . $friend->getUsername() . '\'' ?>" target="_self">&lt; Back to Chat</a> |
      <a href="friends.php" class="special-link" target="_self"> Remove Friend</a>
    </div>

    <div>
      <div class="profile-col-left">
        <img class="profile-picture" src="..\assets\images\profile.png" alt="A profile picture"/>
      </div>

      <div class="profile-col-right">
        <p>
          <?=$friend->getDescription()?>
        </p> 

        <dl>
          <dt>Coffee or Tea?</dt>
          <dd><?=$friend->getCoffeeOrTea()?></dd>
          <dt>Name</dt>
          <dd><?=$friend->getFirstName()?></dd>
        </dl>
      </div>
    </div>
  </body>
</html>
