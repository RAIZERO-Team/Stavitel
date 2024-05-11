
class userData {
  constructor(
    login_email,
    login_password,
    register_username,
    register_email,
    register_password
  ) {
    this.login_email = login_email;
    this.login_password = login_password;
    this.register_username = register_username;
    this.register_email = register_email;
    this.register_password = register_password;
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
          if (!data.error) {
            // window.location.href = "../View/Error/404_Not_Found.html";
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

  async email_verify() {
    fetch("../../../Backend/src/Functions/send_varified_email.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEnteredPage: true }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // parse response JSON
      })
      .then((data) => {
        console.log("Response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async user_login() {
    let token = this.generateToken(32);

    try {
      const url = "../../../Backend/src/Functions/login.php";
      const method = "POST";
      const data = {
        login_email: this.login_email,
        login_password: this.login_password, // Corrected key name
        token: token,
      };

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
          if (!data.error) {
            window.location.href = "../View/Error/404_Not_Found.html";
          } else {
            console.log("Error");
            alert(data.error);
          }
        });

      console.log("End user_login");
    } catch (error) {
      console.error(`Failed to insert user: ${error.message}`);
      throw error; // Rethrow the error for higher level handling
    }
  }

  async update_user() {}

  async change_password() {}

  async delete_user() {}
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
