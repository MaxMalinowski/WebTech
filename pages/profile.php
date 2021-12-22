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
      <a class="special-link" onclick="location.href=<?='\'./friends.php?action=remove-friend&username=' . $friend->getUsername() . '\''?>">Remove Friend</a>
    </div>

    <div>
      <div class="profile-col-left">
        <img class="profile-picture" src="..\assets\images\profile.png" alt="A profile picture"/>
      </div>

      <div class="profile-col-right">
        <div <?php if(empty($friend->getDescription())) {?> hidden <?php } ?>>
          <?=$friend->getDescription()?>
        </div>
        <dl>
          <dt>Coffee or Tea?</dt>
          <dd <?php if($friend->getCoffeeOrTea() !== "neither_nor") {?> hidden <?php } ?>> Neither Nor</dd>
          <dd <?php if($friend->getCoffeeOrTea() !== "coffee") {?> hidden <?php } ?>> Coffee</dd>
          <dd <?php if($friend->getCoffeeOrTea() !== "tea") {?> hidden <?php } ?>> Tea</dd>
          <dt <?php if(empty($friend->getFirstName())) {?> hidden <?php } ?> >Name</dt>
          <dd <?php if(empty($friend->getFirstName())) {?> hidden <?php } ?> ><?=$friend->getFirstName()?></dd>
        </dl>
      </div>
    </div>
  </body>
</html>
