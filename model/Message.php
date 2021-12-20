<?php
namespace model;

use JsonSerializable;

class Message implements JsonSerializable {
    private $from;
    private $msg;
    private $date;
 
    public function __construct($from=null, $msg=null, $date=null) {
        $this->from = $from;
        $this->msg = $msg;
        $this->date = $date;
    }

    public function getFrom() {
        return $this->from;
    }
    public function getMsg() {
        return $this->msg;
    }
    public function getDate() {
        return $this->date;
    }

    public function jsonSerialize() { 
        return get_object_vars($this);
    } 

    public static function fromJson($data) {
        $newMessage = new Message();
        foreach ($data as $key => $value) { 
            $newMessage->{$key} = $value;
        }
        return $newMessage;
    }
}
?>