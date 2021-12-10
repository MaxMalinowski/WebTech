<?php
    namespace php;

    spl_autoload_register(function($class) {
        include '..' . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';
    });

    session_start();
    define('CHAT_SERVER_URL', 'https://online-lectures-cs.thi.de/chat'); 
    define('CHAT_SERVER_ID', '08505ef5-058b-40a6-9530-483823b5901a');

    $service = new \utils\BackendService(CHAT_SERVER_URL, CHAT_SERVER_ID);
?> 