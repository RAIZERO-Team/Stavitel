class userData {
  constructor() {
    this._loginEmail = "";
    this._loginPassword = "";
    this._registerUsername = "";
    this._registerEmail = "";
    this._registerPassword = "";
    this._forgetPasswordEmail = "";
    this._codeVerificationPassword = "";
    this._changePasswordNewPassword = "";
    this._changePassConfirmNewPass = "";
  }

  get loginEmail() {
    return this._loginEmail;
  }
  set loginEmail(email) {
    this._loginEmail = email;
  }

  get loginPassword() {
    return this._loginPassword;
  }
  set loginPassword(password) {
    this._loginPassword = password;
  }

  get registerUsername() {
    return this._registerUsername;
  }
  set registerUsername(username) {
    this._registerUsername = username;
  }

  get registerEmail() {
    return this._registerEmail;
  }
  set registerEmail(email) {
    this._registerEmail = email;
  }

  get registerPassword() {
    return this._registerPassword;
  }
  set registerPassword(password) {
    this._registerPassword = password;
  }

  get forgetPasswordEmail() {
    return this._forgetPasswordEmail;
  }
  set forgetPasswordEmail(email) {
    this._forgetPasswordEmail = email;
  }

  get codeVerificationPassword() {
    return this._codeVerificationPassword;
  }
  set codeVerificationPassword(code) {
    this._codeVerificationPassword = code;
  }

  get changePasswordNewPassword() {
    return this._changePasswordNewPassword;
  }
  set changePasswordNewPassword(password) {
    this._changePasswordNewPassword = password;
  }

  get changePassConfirmNewPass() {
    return this._changePassConfirmNewPass;
  }
  set changePassConfirmNewPass(password) {
    this._changePassConfirmNewPass = password;
  }

  // Method to generate a random token
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

  // Method to handle API requests for user registration
  async userRegister() {
    const token = this.generateToken(32);

    try {
      const url = "../../../Backend/src/data/register.php";
      const method = "POST";
      const data = {
        register_username: this._registerUsername,
        register_email: this._registerEmail,
        register_password: this._registerPassword,
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
        window.location.href = "../View/verification_email.html";
      } else {
        return responseData.error;
      }
    } catch (error) {
      console.error(`Failed to register user: ${error.message}`);
      throw error;
    }
  }

  // Method to handle email verification
  async emailVerify() {
    try {
      const url = "../../../Backend/src/data/send_varified_email.php";
      const method = "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEnteredPage: true }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (!responseData.error) {
        console.log("Email verification successful");
      } else {
        return responseData.error;
      }
    } catch (error) {
      console.error(`Failed to verify email: ${error.message}`);
      throw error;
    }
  }

  // Method to handle user login
  async userLogin() {
    const token = this.generateToken(32);

    try {
      const url = "../../../Backend/src/data/login.php";
      const method = "POST";
      const data = {
        login_email: this._loginEmail,
        login_password: this._loginPassword,
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
        return responseData.error;
      }
    } catch (error) {
      console.error(`Failed to login user: ${error.message}`);
      throw error;
    }
  }

  // Method to handle forget password functionality
  async forgetPassword() {
    try {
      const url = "../../../Backend/src/data/send_email_forgetpass.php";
      const method = "POST";
      const data = {
        forget_password_email: this._forgetPasswordEmail,
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
        return responseData.error;
      }
    } catch (error) {
      console.error(`Failed to initiate password reset: ${error.message}`);
      throw error;
    }
  }

  // Method to handle code verification
  async codeVerification() {
    try {
      const url = "../../../Backend/src/data/user_otp.php";
      const method = "POST";
      const data = {
        code_verifiction_password: this._codeVerificationPassword,
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
        window.location.href = "../View/Change_Password.html";
      } else {
        return responseData.error;
      }
    } catch (error) {
      console.error(`Failed to verify code: ${error.message}`);
      throw error;
    }
  }

  // Method to handle password change
  async changePassword() {
    try {
      const url = "../../../Backend/src/data/changepassword.php";
      const method = "POST";
      const data = {
        change_password_new_password: this._changePasswordNewPassword,
        change_pass_confirm_new_pass: this._changePassConfirmNewPass,
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
        window.location.href = "../View/User_Sign.html";
      } else {
        return responseData.error;
      }
    } catch (error) {
      console.error(`Failed to change password: ${error.message}`);
      throw error;
    }
  }

  async updateUser() {
  }


  async logout(){

  }

  async deleteUser() {
  }
}

export { userData };
