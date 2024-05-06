<?php
class DB
{
  private static $_instance = null;
  private $_pdo,
  $_query,
  $_result,
  $_error = false,
  $_count = 0;

  private function __construct()
  {
    try {
      $this->_pdo = new PDO("mysql:host=" . Config::get('mysql/host') . ";dbname=" . Config::get('mysql/db'), Config::get('mysql/username'), Config::get('mysql/password'));
    } catch (PDOException $e) {
      die($e->getMessage());
    }
  }
  public static function getInstance()
  {
    if (!isset(self::$_instance)) {
      self::$_instance = new DB();
    }
    return self::$_instance;
  }

  public function query($sql, $params = array())
  {
    $this->_error = false;
    if ($this->_query = $this->_pdo->prepare($sql)) {
      $index = 1;
      if (count($params)) {
        foreach ($params as $param) {
          $this->_query->bindValue($index++, $param);
        }

      }
      if ($this->_query->execute()) {
        $this->_result = $this->_query->fetchAll(PDO::FETCH_OBJ);
        $this->_count = $this->_query->rowCount();
      } else {
        $this->_error = true;
      }
    }
    return $this;

  }
                                           
  private function action($action, $table, $where = array())
  {
    if (count($where) === 3) {
      $operators = array('=', '>', '<', '>=', '<=');
      $field = $where[0];
      $operator = $where[1];
      $value = $where[2];

      if (in_array($operator, $operators)) {
        $sql = "{$action}  FROM {$table} WHERE {$field} {$operator} ?";

        if (!$this->query($sql, array($value))->errors()) {
          return $this;
        }
      }
    }
    return false;
  }



  public function insert($table, $fields = array())
  {
    if (count($fields)) {
      $keys = array_keys($fields);
      $values = '';
      $index = 1;

      foreach ($fields as $field) {
        $values .= '?';
        if ($index < count($fields)) {
          $values .= ',';

        }
        $index++;
      }
                                                                                
      $sql = "INSERT INTO {$table} (`" . implode('`,`', $keys) . "`)  VALUES ({$values})";
      if (!$this->query($sql, $fields)->errors()) {
        return true;
      }
    }

    return false;
  }


  public function update($table, $id, $fields = array())
  {

    $set = '';
    $index = 1;

    foreach ($fields as $name => $value) {
      $set .= "{$name}= ?";
      if ($index < count($fields)) {
        $set .= ", ";
      }
      $index++;
    }

    $sql = "UPDATE {$table} SET {$set} WHERE id ={$id}";
    if (!$this->query($sql, $fields)->errors()) {
      return true;
    }
    return false;
  }



  public function get($table, $where)
  {
    return $this->action('SELECT *', $table, $where);
  }
  public function delete($table, $where)
  {
    return $this->action('DELETE', $table, $where);

  }

  public function emailExists($email)
  {
    $user = $this->get('users', array("email", "=", $email))->results();
    return !empty($user);
  }


  public function results()
  {
    return $this->_result;
  }
  public function first()
  {
    return $this->results()[0];

  }
  public function errors()
  {
    return $this->_error;
  }


  public function count()
  {
    return $this->_count;
  }
}
