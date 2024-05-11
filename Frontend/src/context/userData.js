class userData {
  constructor(
    login_email,
    login_password,
    register_username,
    register_email,
    register_password,
    forget_password_email,
    change_password_new_password,
    change_pass_confirm_new_pass
  ) {
    this.login_email = login_email;
    this.login_password = login_password;
    this.register_username = register_username;
    this.register_email = register_email;
    this.register_password = register_password;
    this.forget_password_email = forget_password_email;
    this.change_password_new_password = change_password_new_password;
    this.change_pass_confirm_new_pass = change_pass_confirm_new_pass;

  }

  getData() {
    return this.register_email;
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

      // fetch(url, {
      //   method: method,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error("Network response was not ok");
      //     }
      //     return response.json();
      //   })
      //   .then((data) => {
      //     if (!data.error) {
      //       window.location.href = "../View/verification_email.html";
      //     } else {
      //       return data.error;
      //     }
      //   });

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
        window.location.href = "../View/verification_email.html";
      } else {
        return responseData.error; // Return error data
      }
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
        window.location.href = "../View/Workspace.html";
      } else {
        return responseData.error; // Return error data
      }

    } catch (error) {
      console.error(`Failed to insert user: ${error.message}`);
      throw error; // Rethrow the error for higher level handling
    }
  }
  
  async forget_password() {
    try {
      const url = "../../../Backend/src/";
      const method = "POST";
      const data = {
        forget_password_email: this.forget_password_email
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
        window.location.href = "../View/Code_Verification.html";
      } else {
        return responseData.error; // Return error data
      }

    } catch (error) {
      console.error(`Failed to insert user: ${error.message}`);
      throw error; // Rethrow the error for higher level handling
    }
  }


  async code_verifiction() {}
  async change_password() {}
  
  async update_user() {}
  async delete_user() {}
}

export { userData };
