class userProfile {
  constructor(username, email, user_pic) {
    this.username = username;
    this.email = email;
    this.user_pic = user_pic;
  }

  async update_user() {
    try {
      const response = await fetch("", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          user_pic: this.user_pic,
        }),
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  async display_user() {
    try {
      const response = await fetch("", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error displaying user:", error);
    }
  }

  async delete_user() {
    try {
      const response = await fetch("", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
        }),
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
}

export { userProfile };
