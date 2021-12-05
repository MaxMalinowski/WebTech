<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/style.css" />
    <title>Settings</title>
  </head>

  <body>
    <h1>Profile Settings</h1>

    <!--textfields for name/surname and the dropdown menu for beverage selection-->
    <form action="./settings.html" method="post">
      <fieldset>
        <legend>Base Data</legend>

        <div class="form-row">
          <div class="form-col-left">
            <label for="first_name">First Name</label>
          </div>
          <div class="form-col-right">
            <input type="text" id="first_name" name="first_name" placeholder="Your name"/>
          </div>
        </div>

        <div class="form-row">
          <div class="form-col-left">
            <label for="last_name">Last Name</label>
          </div>
          <div class="form-col-right">
            <input type="text" id="last_name" name="last_name" placeholder="Your surname"/>
          </div>
        </div>

        <div class="form-row">
          <div class="form-col-left">
            <label for="coffee_or_tea">Coffee or Tea?</label>
          </div>
          <div class="form-col-right">
            <select name="coffee_or_tea" id="coffee_or_tea">
              <option value="neither_nor">Neither nor</option>
              <option value="coffee">Coffee</option>
              <option value="tea">Tea</option>
            </select>
          </div>
        </div>
      </fieldset>

      <!--textfield for user comment-->
      <fieldset>
        <legend>Tell Something About You</legend>
        <textarea name="about_you" placeholder="Leave a comment here"></textarea>
      </fieldset>

      <!--radiobuttons to let the user choose their line settings-->
      <fieldset>
        <legend>Prefered Chat Layout</legend>
        <div class="radio-buttons">
          <input type="radio" id="one_line" name="one_line" />
          <label for="one_line">Username and message in one line</label>
        </div>
        <div class="radio-buttons">
          <input type="radio" id="seperated_lines" name="seperated_lines" />
          <label for="seperated_lines">Username and message in separated lines</label>
        </div>
      </fieldset>

      <!--buttons to save/cancel-->
      <div class="button-div">
        <button type="submit" formaction="./friends.html">Cancel</button>
        <button class="blue-button" type="submit">Save</button>
      </div>
    </form>
  </body>
</html>