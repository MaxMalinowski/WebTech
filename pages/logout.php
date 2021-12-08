<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/style.css" />
    <?php require("../php/global.php"); session_unset(); session_destroy();?>
    <title>Logout</title>
  </head>

  <body>
    <img class="special-img" src="../assets/images/logout.png" alt="A logout-icon"/>

    <h1 class="special-h">Logged out...</h1>

    <div class="logout-col">
      <p>See u!</p>
      <a href="./login.php">Login again</a>
    </div>
  </body>
</html>