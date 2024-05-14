// Import userData class from userData.js
import { userData } from "../context/userData.js";

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".input-field");

  // Add event listeners for input focus and blur
  inputs.forEach((inp) => {
    inp.addEventListener("focus", () => {
      inp.classList.add("active");
    });
    inp.addEventListener("blur", () => {
      if (!inp.value.trim()) {
        inp.classList.remove("active");
      }
    });
  });

  // Event listener for forget password button
  const forgetPasswordBtn = document.getElementById("forget_password_btn");
  if (forgetPasswordBtn) {
    forgetPasswordBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const forgetPasswordEmail = document.getElementById("forget_password_email").value;
      const userForgetPass = new userData("", "", "", "", "", forgetPasswordEmail, "", "");

      try {
        const result = await userForgetPass.forget_password({ user_email: forgetPasswordEmail });
        console.log(result); // Handle API response
      } catch (error) {
        console.error("Error: ", error);
      }
    });
  }

  // Event listener for code verification button
  const codeVerificationBtn = document.getElementById("code_verification_btn");
  if (codeVerificationBtn) {
    codeVerificationBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const codeInputs = document.querySelectorAll(".code");
      const code = Array.from(codeInputs).map((input) => input.value).join("");
      const codeVerify = new userData("", "", "", "", "", "", code);

      try {
        const result = await codeVerify.code_verifiction({ code });
        console.log(result); // Handle API response
      } catch (error) {
        console.error("Error: ", error);
      }
    });
  }

  // Event listener for change password button
  const changePasswordBtn = document.getElementById("change_password_btn");
  if (changePasswordBtn) {
    changePasswordBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const newPassword = document.getElementById("change_password_new_password").value;
      const confirmNewPassword = document.getElementById("change_password_confirm_new_password").value;
      const changePass = new userData("", "", "", "", "", "", "", newPassword, confirmNewPassword);

      try {
        const result = await changePass.change_password({ new_password: newPassword, confirm_new_password: confirmNewPassword });
        console.log(result); // Handle API response
      } catch (error) {
        console.error("Error: ", error);
      }
    });
  }

  // Event listener for review button
  const reviewBtn = document.getElementById("review_btn");
  if (reviewBtn) {
    reviewBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const userReview = document.getElementById("user_review").value;
      // Assuming `review` class is defined elsewhere
      const review1 = new review(5, userReview);
      review1.add_review(); // Make API call to add review
    });
  }
});
