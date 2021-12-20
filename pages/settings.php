<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/style.css" />
    <?php require("../controllers/settingsController.php") ?>
    <title>Settings</title>
  </head>

  <body>
    <?php $user = loadUserSettings() ?>
    <?php saveUserSettings() ?>
    <h1>Profile Settings</h1>

    <!--textfields for name/surname and the dropdown menu for beverage selection-->
    <form action="" method="post">
      <fieldset>
        <legend>Base Data</legend>

        <div class="form-row">
          <div class="form-col-left">
            <label for="firstName">First Name</label>
          </div>
          <div class="form-col-right">
            <input type="text" id="firstName" name="firstName" value="<?=$user->getFirstName()?>"  />
          </div>
        </div>

        <div class="form-row">
          <div class="form-col-left">
            <label for="lastName">Last Name</label>
          </div>
          <div class="form-col-right">
            <input type="text" id="lastName" name="lastName" value="<?=$user->getLastName()?>"/>
          </div>
        </div>

        <div class="form-row">
          <div class="form-col-left">
            <label for="coffeeOrTea">Coffee or Tea?</label>
          </div>
          <div class="form-col-right">
            <select name="coffeeOrTea" id="coffeeOrTea">
              <option value="neither_nor" <?php if($user->getCoffeeOrTea() == "neither_nor" ){?> selected <?php } ?>>
                Neither nor
              </option>
              <option value="coffee" <?php if($user->getCoffeeOrTea() == "coffee" ){?> selected <?php } ?>>
                Coffee
              </option>
              <option value="tea" <?php if($user->getCoffeeOrTea() == "tea" ){?> selected <?php } ?>>
                Tea
              </option>
            </select>
          </div>
        </div>
      </fieldset>

      <!--textfield for user comment-->
      <fieldset>
        <legend>Tell Something About You</legend>
        <textarea name="description" placeholder="Something about you..."><?=$user->getDescription()?></textarea>
      </fieldset>

      <!--radiobuttons to let the user choose their line settings-->
      <fieldset>
        <legend>Prefered Chat Layout</legend>
        <div class="radio-buttons">
          <input type="radio" id="oneLine" name="layout" value="oneLine" 
            <?php if($user->getLayout() == "oneLine" ){?> checked <?php } ?>/>
          <label for="oneLine">Username and message in one line</label>
        </div>
        <div class="radio-buttons">
          <input type="radio" id="seperatedLines" name="layout" value="seperatedLines"
            <?php if($user->getLayout() == "seperatedLines" ){?> checked <?php } ?> />
          <label for="seperatedLines">Username and message in separated lines</label>
        </div>
      </fieldset>

      <!--buttons to save/cancel-->
      <div class="button-div">
        <button type="submit" formaction="./friends.php">Cancel</button>
        <button class="blue-button" type="submit" >Save</button>
      </div>
    </form>
  </body>
</html>
