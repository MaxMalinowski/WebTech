<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="../css/style.css" />
  <script src="../javascript/register.js"></script>
  <?php require('../controllers/registerController.php') ?>
  <title>Register</title>
</head>

<body>
  <img class="special-img" src="../assets/images/user.png" alt="" />

  <h1 class="special-h">Register yourself</h1>

  <form action="register.php" method="post" onsubmit="return checkForm()">
    <fieldset class="form_fieldset">
      <legend>Register</legend>

      <div class="form-row">
        <div class="form-col-left">
          <label for="username">Username</label>
        </div>
        <div class="form-col-right">
          <input type="text" id="username" name="username" placeholder="Username" oninput="checkUsername()" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-col-left">
          <label for="password">Password</label>
        </div>
        <div class="form-col-right">
          <input type="password" id="password" name="password" placeholder="Password" oninput="checkPassword()" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-col-left">
          <label for="confirm">Confirm Password</label>
        </div>
        <div class="form-col-right">
          <input type="password" id="confirm" name="confirm" placeholder="Password" oninput="checkConfirmedPassword()" required />
        </div>
      </div>
    </fieldset>

    <div class="button-div">
    <a href="./login.php"> <button type="button" > Cancel</button></a>
      <button class="blue-button" type="submit">Create Account</button>
    </div>
  </form>
</body>

</html>