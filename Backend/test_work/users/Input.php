<?php
class Input {
    public static function getItem($key) {
        return isset($_REQUEST[$key]) ? $_REQUEST[$key] : null;
    }
}
?>
