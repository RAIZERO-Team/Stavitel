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
    this.flag = 0;
  }

  generateToken(length) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      token += charset.charAt(randomIndex);
    }
    return token;
  }

  async user_register() {
    console.log("Start user_register");
    let token = this.generateToken(32);

    try {
      const url = "../../../Backend/src/Functions/register.php";
      const method = "POST";
      const data = {
        register_username: this.register_username,
        register_email: this.register_email,
        register_password: this.register_password, // Corrected key name
        token: token,
      };
      console.log("Done1");

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          // window.location.href = "../View/Error/404_Not_Found.html";
          if (!data.error) {
            window.location.href = "../View/Error/404_Not_Found.html";
          } else {
            console.log("Error");
            alert(data.error.username);
            alert(data.error.email);
            alert(data.error.password);
          }
        });

        
        console.log("End user_register");
      } catch (error) {
        console.error(`Failed to insert user: ${error.message}`);
        throw error; // Rethrow the error for higher level handling
      }
    }

    async user_login() {
    // Implement login functionality
  }
  
  async update_user() {
    // Implement update user functionality
  }

  async delete_user() {
    // Implement delete user functionality
  }
}

export { userData };

// const response = await fetch(url, {
//   method: method,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// });

// if (!response.ok) {
//   throw new Error("Network response was not ok");
// }
// const responseData = await response.json();
// if (!responseData.error) {
//   window.location.href = "send_verified_email.html";
// } else {
//   console.error(responseData.error); // Log error response
// }