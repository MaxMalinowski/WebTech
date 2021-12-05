<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Tests</title>
</head>
<body>
    <?php
        // require("./php/start.php");
        // $user = new model\User("Test"); 
        // $json = json_encode($user);
        // echo $json . "<br>";
        // $jsonObject = json_decode($json);
        // $newUser = model\User::fromJson($jsonObject); var_dump($newUser);

        require("./php/start.php");
        var_dump($service->login("", ""));
    ?>
</body>
</html>