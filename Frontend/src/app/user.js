// Import userData class from userData.js
import { userData } from "../context/userData.js";
import { notification } from "../context/notfication.js";

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

  let userdata = new userData();
  const notifier = new notification();

  // Event listener for forget password button
  const forgetPasswordBtn = document.getElementById("forget_password_btn");
  if (forgetPasswordBtn) {
    forgetPasswordBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const forgetPasswordEmail = document.getElementById("forget_password_email").value;

      const notificationsContainer = document.querySelector(".notifications");

      userdata.forgetPasswordEmail = forgetPasswordEmail;

      try {
        const result = await userdata.forgetPassword({ user_email: forgetPasswordEmail });

        if (result) {
          if (result.email) {
            const customMessage = result.username;
            const errorNotification = notifier.createToast("error", customMessage);
            notificationsContainer.appendChild(errorNotification);
    
            errorName.innerText = "*Name";
            errorName.style.color = "#ff0000";
          }
        }
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

      userdata.codeVerificationPassword = code;

      try {
        const result = await userdata.codeVerification({ code });
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

      userdata.changePasswordNewPassword = newPassword;
      userdata.changePassConfirmNewPass = confirmNewPassword;

      try {
        const result = await userdata.changePassword({ new_password: newPassword, confirm_new_password: confirmNewPassword });
        console.log(result); // Handle API response
      } catch (error) {
        console.error("Error: ", error);
      }
    });
  }

  // Event listener for review button
  // const reviewBtn = document.getElementById("review_btn");
  // if (reviewBtn) {
  //   reviewBtn.addEventListener("click", async (event) => {
  //     event.preventDefault();
  //     const userReview = document.getElementById("user_review").value;
  //     // Assuming `review` class is defined elsewhere
  //     const review1 = new review(5, userReview);
  //     review1.add_review(); // Make API call to add review
  //   });
  // }
});
