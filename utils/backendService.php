<?php
namespace utils;

class BackendService { 
    private $baseURL;

    /**
     * Constructor of the BackendService class
     *
     * @param string $base
     * @param string $id
     */
    public function __construct($base, $id) {
        $this->baseURL = $base . '/' . $id;
    }

    /**
     * Set JWT-Token used for authentication in requests 
     *
     * @param string $token
     * @return void
     */
    private function setToken($token) {
        $_SESSION['chat_token'] = $token;
    }

    /**
     * Get JWT-Token used for authentication in requests
    *
    * @return string token-string if set in $_SESSION var, empty string if not set
    */
    private function getToken() {
        return isset($_SESSION['chat_token']) ? $_SESSION['chat_token'] : '';
    }

    /**
     * Unauthenticated POST-Request @/login
     *
     * @param string $username
     * @param string $password
     * @return string|bool On success return token-string, else return false
     */
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

    /**
     * Unauthenticated POST-Request @/register
     *
     * @param string $username
     * @param string $password
     * @return string|bool On success return token-string, else return false
     */
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

    /**
     * Unauthenticated GET-Request @/user/<username>
     *
     * @param string $username
     * @return bool On user existency return false, else return true
     */
    public function userExists($username) {
        $url = $this->baseURL . '/user/' . $username;
        try {
            return HttpClient::get($url);
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }
    /**
     * Authenticated GET-Request @/user/<username>
     *
     * @param string $username
     * @return object|bool On success return user-object, else return false
     */
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

    /**
     * Authenticated POST-Request @/user
     *
     * @param object $user
     * @return bool On success return true, else return false
     */
    public function saveUser($user) {
        $url = $this->baseURL . '/user';
        try {
            return HttpClient::post($url, $user, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    /**
     * Authenticated GET-Request @/user
     *
     * @return object|bool On success return array of usernames, else return false
     */
    public function listUsers() {
        $url = $this->baseURL . '/user';
        try {
            return HttpClient::get($url, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    /**
     * Authenticated GET-Request @/message/<username>
     *
     * @param string $username
     * @return object|bool On success return array of messages, else return false
     */
    public function listMessages($username) {
        $url = $this->baseURL . '/message/' . $username;
        try {
            return HttpClient::get($url, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    /**
     * Authenticated POST-Request @/message
     *
     * @param string $friendname
     * @param string $message
     * @return bool On success return true, else return false 
     */
    public function sendMessage($friendname, $message) {
        $url = $this->baseURL . '/message';
        $data = array('message' => $message, 'to' => $friendname);
        try {
            return HttpClient::post($url, $data, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    /**
     * Authenticated GET-Request @/unread
     *
     * @return object|bool On success return array of unread messages per friendname, else return false 
     */
    public function getUnread() {
        $url = $this->baseURL . '/unread';
        try {
            return HttpClient::get($url, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    /**
     * Authenticated GET-Request @/friend
     *
     * @return object|bool On success return array of friends, else return false
     */
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

    /**
     * Authenticated POST-Request @/friend
     *
     * @param string $friendname
     * @return bool On success return true, else return false
     */
    public function friendRequest($friendname) {
        $url = $this->baseURL . '/friend';
        $data = array('username' => $friendname);
        try {
            return HttpClient::post($url, $data, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    /**
     * Authenticated PUT-Request @/friend/<username>
     *
     * @param string $friendname
     * @return bool On success return true, else return false
     */
    public function friendAccept($friendname) {
        $url = $this->baseURL . '/friend/' . $friendname;
        $data = array('status' => 'accepted');
        try {
            return HttpClient::put($url, $data, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    /**
     * Authenticated PUT-Request @/friend/<username>
     *
     * @param string $friendname
     * @return bool On success return true, else return false
     */
    public function friendDismiss($friendname) {
        $url = $this->baseURL . '/friend/' . $friendname;
        $data = array('status' => 'dismissed');
        try {
            return HttpClient::put($url, $data, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    /**
     * Authenticated DELETE-Request @/friend/<username>
     *
     * @param string $friendname
     * @return bool On success return true, else return false
     */
    public function friendRemove($friendname) {
        $url = $this->baseURL . '/friend/' . $friendname;
        try {
            return HttpClient::delete($url, $this->getToken());
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }    
}
?>