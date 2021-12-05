<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/style.css" />
    <script src="../js/register.js"></script>
    <script src="../js/constants.js"></script>
    <title>Register</title>
  </head>

  <body>
    <img class="special-img" src="../assets/images/user.png" alt="" />

    <h1 class="special-h">Register yourself</h1>
    
    <form action="./friends.html" methode="post" onsubmit="return checkForm()">
      <fieldset class="form_fieldset">
        <legend>Register</legend>

        <div class="form-row">
          <div class="form-col-left">
            <label for="username">Username</label>
          </div>
          <div class="form-col-right">
            <input type="text" id="username" name="username" placeholder="Username" required oninput="checkUsername()"/>
          </div>
        </div>

        <div class="form-row">
          <div class="form-col-left">
            <label for="password">Password</label>
          </div>
          <div class="form-col-right">
            <input type="password" id="password" name="password" placeholder="Password" required oninput="checkPassword()"/>
          </div>
        </div>

        <div class="form-row">
          <div class="form-col-left">
            <label for="confirm">Confirm Password</label>
          </div>
          <div class="form-col-right">
            <input type="password" id="confirm" name="confirm" placeholder="Password" required oninput="checkConfirmedPassword()"/>
          </div>
        </div>
      </fieldset>

      <div class="button-div">
        <button type="submit" formaction="./login.html" formnovalidate>Cancel</button>
        <button class="blue-button" type="submit">Create Account</button>
      </div>
    </form>
  </body>
</html>