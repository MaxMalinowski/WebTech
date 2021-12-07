<?php
namespace model;
use JsonSerializable;
class Friend implements JsonSerializable {
    private $username;
    private $status;
 
    public function __construct($username=null) {
        $this->username = $username;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getStatus() {
        return $this->status;
    }

    private function setStatus($status) {
        $this->status = $status;
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