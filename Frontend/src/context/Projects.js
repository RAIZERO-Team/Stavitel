import {fetchData} from '../api/api.js';
class project {

  // ============= Constructor =============
  constructor (name, type , data){
    this.project_name = name;
    this.project_type = type;
    this.project_data = data;
    this.apiUrl = 'http://localhost/stavitel_test/php';
  }

  // ============= API Functions =============
  async create_project() {
    try {
      const url = '';
      const method = 'POST';
      const data = {
          "username": this.project_name,
          "email": this.project_type,
          "password": this.project_data,
      };

      return await fetchData(url, method, data);
    } catch (error) {
      throw new Error(`Failed to insert user: ${error.message}`);
    }
  }

  async update_project() {}
  
  async delete_project() {
    const url = 'php/delete-data.php?username=' + this.username;
    const method = 'GET';

    return await fetchData(url, method);

  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }

  async display_project() {}
}


export { project };
