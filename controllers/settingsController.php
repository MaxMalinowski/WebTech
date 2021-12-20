<?php
require("../utils/global.php");

ini_set("display_errors", 1);

if (!isset($_SESSION["user"])) {
    header("Location: login.php");
}

function loadUserSettings() {
    global $service;
    $user = $service->loadUser($_SESSION["user"]);

    return $user;
}

function saveUserSettings() {
    if (isset($_POST["firstName"])) {
        global $service;
        $user = $service->loadUser($_SESSION["user"]);

        $username = $_SESSION["user"];
        $firstName = $_POST["firstName"];
        $lastName = $_POST["lastName"];
        $coffeeOrTea = $_POST["coffeeOrTea"];
        $description = $_POST["description"];
        $layout = $_POST["layout"];

        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setCoffeeOrTea($coffeeOrTea);
        $user->setDescription($description);
        $user->setLayout($layout);

        $result = $service->saveUser($user);
        if ($result) {
            header("Location: settings.php");
        } else {
            http_response_code(403);
        }
    }
}

?>