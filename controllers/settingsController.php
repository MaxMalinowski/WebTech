<?php
require("../utils/global.php");

if (!isset($_SESSION["user"])) {
    header("Location: login.php");
}

?>