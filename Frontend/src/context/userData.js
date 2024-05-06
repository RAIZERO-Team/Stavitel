import { fetchData } from "../api/api.js";
class userData {
  constructor(
    login_username,
    login_password,
    register_username,
    register_email,
    register_password
  ) {
    this.login_username = login_username;
    this.login_password = login_password;
    this.register_username = register_username;
    this.register_email = register_email;
    this.register_password = register_password;
  }


  async create_user() {}
  async update_user() {}
  async delete_user() {}
}

export {userData};