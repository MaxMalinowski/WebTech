<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="../css/style.css" />
  <?php require('../controllers/registerController.php') ?>
  <title>Register</title>
</head>

<body>
  <script>
    window.chatCollectionId = "<?= CHAT_SERVER_ID ?>";
    window.chatServer = "<?= CHAT_SERVER_URL ?>";
  </script>
  <?php registerUser() ?>
  <img class="special-img" src="../assets/images/user.png" alt="" />

  <h1 class="special-h">Register yourself</h1>

  <form action="register.php" methode="post">
    <fieldset class="form_fieldset">
      <legend>Register</legend>

      <div class="form-row">
        <div class="form-col-left">
          <label for="username">Username</label>
        </div>
        <div class="form-col-right">
          <input type="text" id="username" name="username" placeholder="Username" required />
        </div>
        <div class="login-message" <?php if (http_response_code() == 200) { ?> hidden <?php } ?>>
          Username already exists.
        </div>
      </div>

      <div class="form-row">
        <div class="form-col-left">
          <label for="password">Password</label>
        </div>
        <div class="form-col-right">
          <input type="password" id="password" name="password" placeholder="Password" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-col-left">
          <label for="confirm">Confirm Password</label>
        </div>
        <div class="form-col-right">
          <input type="password" id="confirm" name="confirm" placeholder="Password" required />
        </div>
      </div>
    </fieldset>

    <div class="button-div">
      <button type="submit" formaction="./login.html" formnovalidate>Cancel</button>
      <button class="blue-button" type="submit" <?php if ($disable) { ?> disabled <?php   } ?>>Create Account</button>
    </div>

    <div class="register-message">
      <ul>
        <?php
        if (count($fehlermeldungen) != 0) {
          foreach ($fehlermeldungen as $fehlermeldung) {
            echo "<li>" . $fehlermeldung . "</li>";
          }
        }
        ?>
      </ul>
    </div>




  </form>
</body>

</html>