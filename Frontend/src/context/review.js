class review {
  constructor(
    user_rate,user_feedback
  ) {
    this.user_rate = user_rate;
    this.user_feedback = user_feedback;
  }

  async add_rate(){}

  async add_review() {
    try {
      const url = "../../../Backend/test_work/users/submit_review.php";
      const method = "POST";
      const data = {
        user_rate: user_rate,
        user_feedback: this.user_feedback,
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

}

export { review };
