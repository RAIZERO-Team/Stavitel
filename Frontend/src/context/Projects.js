
import fetchData from 'api.js';

class project {

  // ============= Constructor =============
  constructor (name, type , data){
    this.project_name = name;
    this.project_type = type;
    this.project_data = data;
  }

  // ============= API Functions =============
  async create_project() {}
  async update_project() {}
  async delete_project() {}
  async display_project() {}
}