<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/style.css" />
    <title>Login</title>
  </head>

  <body>
    <img class="special-img" src="../assets/images/chat.png" alt="A chat-icon"/>

    <h1 class="special-h">Please sign in</h1>

    <form action="./friends.html" method="post">
      <fieldset class="form_fieldset">
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
        <button type="submit" formaction="./register.php" formnovalidate>Register</button>
        <button class="blue-button" type="submit">Login</button>
      </div>
    </form>
  </body>
</html>