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
    console.log("Done1");
    let token = generateToken(32);

  try {
    const url ="http://localhost/Stavitel_Backend/src/Functions/register.php";
    const method = "POST";
    const data = {
      register_username: this.register_username,
      register_email: this.register_email,
      pasregister_passwordsword: this.register_password,
      token: token,
    };
    console.log("Done2");

    // return await fetchData(url, method, data);

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
      window.location.href = "send_verified_email.html";
    } else {
      console.error(responseData.error); // Log error response
      // Handle error display or notifications
    }

    console.log("End user_register");

    console.log("Last Done");
  } catch (error) {
    throw new Error(`Failed to insert user: ${error.message}`);
  }
  }

  async user_login() {}
  async update_user() {}
  async delete_user() {}
}

export { userData };
