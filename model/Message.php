<?php
namespace model;

use JsonSerializable;

class Message implements JsonSerializable {
    private $from;
    private $type;
    private $msg;
    private $time;
 
    public function __construct($from=null,$msg=null, $time=null, $type=null) {
        $this->from = $from;
               $this->msg = $msg;
        $this->time = $time;
        $this->type= $type;
    }

    public function getFrom() {
        return $this->from;
    }
    public function getMsg() {
        return $this->msg;
    }
    public function getTime() {
        return  $this->time;
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
