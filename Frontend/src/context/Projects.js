
// const fetchData = require('./API/api'); // Adjust the path based on your project structure
export class project {

  // ============= Constructor =============
  constructor (name, type , data){
    this.project_name = name;
    this.project_type = type;
    this.project_data = data;
  }

  output(){
    console.log("Testing");
  }

  // ============= API Functions =============
  async create_project() {}
  async update_project() {}
  async delete_project() {}
  async display_project() {}
}