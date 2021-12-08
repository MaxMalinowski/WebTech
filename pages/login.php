<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/login.css" />
    <?php 
      require("../php/global.php");
      if (isset($_SESSION["user"])) {
        header("Location: friends.php"); 
      } 
    ?>
    <title>Login</title>
  </head>

  <body>

    <?php 
      if (isset($_POST['username'])) {
        $username = $_POST['username']; 
        $password = $_POST['password']; 
        $result = $service->login($username, $password);
        if ($result) {
          $_SESSION["user"] = $username;
          header("Location: friends.php"); 
        } else {
          $showLoginMessage = true;
        }
      }
    ?>
    
    <img class="special-img" src="../assets/images/chat.png" alt="A chat-icon"/>

    <h1 class="special-h">Please sign in</h1>

    <div class="form-row">
      <div class="login-message" <?php if(!isset($showLoginMessage)){?> hidden <?php } ?>>
        Authentication failed! Either the username or the password is incorrect!
      </div>
    </div>

    <form action="login.php" method="post">
      <fieldset>
        <legend>Login</legend>

        <div class="form-row">
          <div class="form-col-left">
            <label for="username">Username</label>
          </div>
          <div class="form-col-right">
            <input type="text" id="username" name="username" placeholder="Username" required/>
          </div>
        </div>

        <div class="form-row">
          <div class="form-col-left">
            <label for="password">Password</label>
          </div>
          <div class="form-col-right">
            <input type="password" id="password" name="password" placeholder="Password" required/>
          </div>
        </div>
      </fieldset>

      <div class="button-div">
        <button type="button" formaction="./register.php" formnovalidate>Register</button>
        <button type="submit" class="blue-button">Login</button>
      </div>
    </form>
  </body>
</html>
