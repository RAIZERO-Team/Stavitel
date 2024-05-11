import { userData } from "../context/userData.js";

document.addEventListener('DOMContentLoaded', function () {
  let userEmail = document.getElementById("userEmail");
  const email_verify = new userData();

  userEmail.innerText = new userData().getData().text();

  email_verify.email_verify();
});