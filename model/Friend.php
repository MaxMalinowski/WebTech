<?php
namespace model;

use JsonSerializable;

class Friend implements JsonSerializable {
    private $username;
    private $unreadMessages;
    private $status;
 
    public function __construct($username=null, $unreadMessages=0, $status=null) {
        $this->username = $username;
        $this->unreadMessages = $unreadMessages;
        $this->status = $status;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getUnreadMessages() {
        return $this->unreadMessages;
    }

    public function getStatus() {
        return $this->status;
    }

    public function setStatus($status) {
        $this->status = $status;
    }
    
    public function setUnreadMessages($unreadeMessages) {
        $this->unreadMessages = $unreadeMessages;
    }

    public function acceptFriend() {
        $this->setStatus("accepted");
    }

    public function dismissFriend() {
        $this->setStatus("dismissed");
    }

    public function jsonSerialize() { 
        return get_object_vars($this);
    } 

    public static function fromJson($data) {
        $newFriend = new Friend();
        foreach ($data as $key => $value) { 
            $newFriend->{$key} = $value;
        }
        return $newFriend;
    }
}
?>