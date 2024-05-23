import { userData } from "../context/userData.js";

document.addEventListener('DOMContentLoaded', function () {
  const userEmailElement = document.getElementById("userEmail");

  // Retrieve the emailData instance from sessionStorage/localStorage or instantiate a new one if needed
  const email = sessionStorage.getItem('userEmail');
  const email_verify = new userData();
  email_verify.emailVerify();

  userEmailElement.innerText = email;

  // To Remove the session
  setTimeout(() => {
    sessionStorage.removeItem('userEmail');
  }, 900000); // 15 minutes
});
