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
  }public function updateVisitorCount()
  {
      $sql = "UPDATE site_statistics SET visitors_count = visitors_count + 1";
      if (!$this->query($sql)->errors()) {
          return true;
      }
      return false;
  }
  
  public function updateSearchCount()
  {
      $sql = "UPDATE site_statistics SET searches_count = searches_count + 1";
      if (!$this->query($sql)->errors()) {
          return true;
      }
      return false;
  }
  
  public function updateProjectsEditorCount()
  {
      $sql = "UPDATE site_statistics SET projects_editor_count = projects_editor_count + 1";
      if (!$this->query($sql)->errors()) {
          return true;
      }
      return false;
  }
  
  public function updateProjectsAICount()
  {
      $sql = "UPDATE site_statistics SET projects_ai_count = projects_ai_count + 1";
      if (!$this->query($sql)->errors()) {
          return true;
      }
      return false;
  }
  
  public function Notification($user_id, $status)
  {
      
      $db = DB::getInstance();
      
     
      $sql = "UPDATE users SET notifications_enabled = ? WHERE user_id = ?";
      
     
      if (!$db->query($sql, array($status, $user_id))->errors()) {
          return true;
      }
      return false;
  }

  public function insertReview($rate, $feedback, $date, $status, $user_id)
{
    $date = date('Y-m-d H:i:s');
    
   
    $db = DB::getInstance();
    
    
    $sql = "INSERT INTO review (review_rate, review_feedback, review_date, review_status, user_id) VALUES (?, ?, ?, ?, ?)";
    
    if (!$db->query($sql, array($rate, $feedback, $date, $status, $user_id))->errors()) {
        return true;
    }
    return false;
}

public function updateUserSession($user_id)
{
    if (isset($_SESSION['user_id']) && $_SESSION['user_id'] == $user_id) {
        
        if (!isset($_SESSION['session_start_time'])) {
            $_SESSION['session_start_time'] = time();
        }
        

        $_SESSION['visit_count'] = isset($_SESSION['visit_count']) ? $_SESSION['visit_count'] + 1 : 1;
        
       
        $_SESSION['last_visit'] = date('Y-m-d H:i:s');
        
        
        $_SESSION['current_day'] = date('l'); 
        
        
        $this->updateVisitorCount();
        
        return true;
    } else {
        return false; 
    }
}


public function getSessionDuration()
{
    
    if (isset($_SESSION['session_start_time'])) {
       
        $start_time = $_SESSION['session_start_time'];
        $current_time = time();
        $duration = $current_time - $start_time;
        
        
        $hours = floor($duration / 3600);
        $minutes = floor(($duration % 3600) / 60);
        $seconds = $duration % 60;
        
        return "$hours hours, $minutes minutes, and $seconds seconds";
    }
    
    return null; 
}
public function updateUserProfile($user_id, $new_username, $new_bio, $new_photo)
{
   
    $sql = "UPDATE users SET username = ?, bio = ?, user_pic = ? WHERE user_id= ?";
    
 
    if (!$this->query($sql, array($new_username, $new_bio, $new_photo, $user_id))->errors()) {
        return true;
    }
    return false; 


}
public function updateUsername($user_id, $new_username)
{
    
    $sql = "UPDATE users SET username = ? WHERE  user_id = ?";
   
    if (!$this->query($sql, array($new_username, $user_id))->errors()) {
        return true; 
    }
    return false; 
}
public function updateBio($user_id, $new_bio)
{
   
    $sql = "UPDATE users SET bio = ? WHERE user_id = ?";
    
   
    if (!$this->query($sql, array($new_bio, $user_id))->errors()) {
        return true; 
    }
    return false;
}


public function updatePhoto($user_id, $new_photo)
{
 
    $sql = "UPDATE users SET user_pic= ? WHERE  user_id = ?";
    
    
    if (!$this->query($sql, array($new_photo, $user_id))->errors()) {
        return true; 
    }
    return false;
  }




}