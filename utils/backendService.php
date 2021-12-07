<?php
namespace utils;

class BackendService { 
    private $baseURL;

    public function __construct($base, $id) {
        $this->baseURL = $base . '/' . $id;
    }

    private function setToken($token) {
        $_SESSION['chat_token'] = $token;
    }

    private function getToken() {
        return isset($_SESSION['chat_token']) ? $_SESSION['chat_token'] : '';
    }

    public function login($username, $password) {
        $url = $this->baseURL . '/login';
        $data = array('username' => $username, 'password' => $password);
        try {
            $response = HttpClient::post($url, $data);
            $this->setToken($response->token);
            return true;
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function register($username, $password) {
        $url = $this->baseURL . '/register';
        $data = array('username' => $username, 'password' => $password);
        try {
            $response = HttpClient::post($url, $data);
            $this->setToken($response->token);
            return true;
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function userExists($username) {
        $url = $this->baseURL . '/user/' . $username;
        try {
            return HttpClient::get($url);
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function loadUser($username) {
        $url = $this->baseURL . '/user/' . $username;
        try {
            $response = HttpClient::get($url, $this->getToken());
            return \model\User::fromJson($response);
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function saveUser($user) {
        $url = $this->baseURL . '/user';
        try {
            return HttpClient::post($url, $user, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function listUsers() {
        $url = $this->baseURL . '/user';
        try {
            return HttpClient::get($url, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function listMessages($username) {
        $url = $this->baseURL . '/message/' . $username;
        try {
            return HttpClient::get($url, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function sendMessage($username, $message) {
        $url = $this->baseURL . '/message';
        $data = array('message' => $message, 'to' => $username);
        try {
            return HttpClient::post($url, $data, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function getUnread() {
        $url = $this->baseURL . '/unread';
        try {
            return HttpClient::get($url, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function listFriends() {
        $url = $this->baseURL . '/friend';
        try {
            $response = HttpClient::get($url, $this->getToken());
            $friendList = array();
            foreach($response as $friend) {
                $jsonFriend = \model\Friend::fromJson($friend);
                array_push($friendList, $jsonFriend);
            }
            return $friendList;
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function friendRequest($friend) {
        $url = $this->baseURL . '/friend';
        $data = array('username' => $friend);
        try {
            return HttpClient::post($url, $data, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    private function changeFriendStatus($friend, $status) {
        $url = $this->baseURL . '/friend/' . $friend;
        $data = array('status' => $status);
        try {
            return HttpClient::put($url, $data, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function friendAccept($friend) {
        return $this->changeFriendStatus($friend, 'accepted');
    }

    public function friendDismiss($friend) {
        return $this->changeFriendStatus($friend, 'dismissed');
    }

    public function friendRemove($friend) {
        $url = $this->baseURL . '/friend/' . $friend;
        try {
            return HttpClient::delete($url, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }    
}
?>