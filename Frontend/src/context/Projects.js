class project {

  // ============= Constructor =============
  constructor (project_name){
    this.project_name = project_name;
  }

  // ============= API Functions =============
  async create_project() {
    try {
      const url = "../../../Backend/src/Functions/createProject.php";
      const method = "POST";
      const data = {
        project_name: this.project_name
      };

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (!responseData.error) {
        // window.location.href = "../View/verification_email.html";
      } else {
        return responseData.error; // Return error data
      }
    } catch (error) {
      console.error(`Failed to insert user: ${error.message}`);
      throw error; // Rethrow the error for higher level handling
    }
  }

  async display_project() {}
}

export { project };
