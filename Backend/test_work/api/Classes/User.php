<?php


class User
{
    private $db,
    $_data,
    $_sessioNanme,
    $_cookieName,
    $is_LoggedIn
    ;

    public function __construct($user = null)
    {
        $this->db = DB::getInstance();
        $this->_sessioNanme = Config::get("session/session_name");
        $this->_cookieName = Config::get("remember/cookie_name");
        if (!$user) {
            if (Session::exists($this->_sessioNanme)) {
                $user = Session::get($this->_sessioNanme);
                if ($this->find($user)) {
                    $this->is_LoggedIn = true;
                } else {

                }
            }
        } else {
            $this->find($user);
        }

    }
    public function get_IsLoggedIn()
    {
        return $this->is_LoggedIn;
    }

    public function create($fields = array())
    {
        if (!$this->db->insert("users", $fields)) {
            throw new Exception("There is a problem in register");
        }
    }
    public function find($email = null)
    {
        if ($email) {
            $filed = is_numeric($email) ? 'id' : 'email';
            $data = $this->db->get("users", array($filed, '=', $email));

            if ($data->count()) {
                $this->_data = $data->first();
                return true;

            }


        }
        return false;
    }
    public function get_data()
    {
        return $this->_data;
    }
    public function login($email = null, $password = null, $remember = true)
    {
        if (!$email && !$password && $this->exist()) {

            Session::put($this->_sessioNanme, $this->get_data()->id);
        } else {
            $user = $this->find($email);

            if ($user) {
                if (($this->_data->password === Hash::make($password, $this->get_data()->salt)) && ($this->_data->varified == 'yes')) {

                    Session::put($this->_sessioNanme, $this->get_data()->id);

                    if ($remember) {
                        $hash = Hash::unique();
                        $hascheck = $this->db->get('users_session', array('user_id', '=', $this->get_data()->id));

                        if (!$hascheck->count()) {
                            $this->db->insert(
                                'users_session',
                                array(
                                    'user_id' => $this->get_data()->id,
                                    'hash' => $hash
                                )
                            );
                        } else {
                            $hash = $hascheck->first()->hash;
                        }

                        Cookie::set($this->_cookieName, $hash, Config::get('remember/cookie_expiry'));



                    }
                    return true;

                }

            }
        }


        return false;
    }


    public function logout()
    {
        $this->db->delete('users_session', array('user_id', '=', $this->get_data()->id));
        Session::delete($this->_sessioNanme);
        Cookie::delete($this->_cookieName);
    }

    public function exist()
    {
        return (!empty($this->_data)) ? true : false;
    }


    public function isVerified()
    {

        if ($this->get_data()->varified == 'yes') {
            return true;
        } else {
            return false;
        }
    }
}