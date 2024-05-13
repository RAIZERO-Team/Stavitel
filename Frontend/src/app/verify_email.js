import { userData } from "../context/userData.js";

document.addEventListener('DOMContentLoaded', function () {
  let userEmail = document.getElementById("userEmail");
  const email_verify = new userData();
  const email = email_verify.getEmail();

  userEmail.innerText = email;

  email_verify.email_verify();
});