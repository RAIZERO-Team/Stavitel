import { userData } from "../context/userData.js";

document.addEventListener('DOMContentLoaded', function () {
  const email_verify = new userData('','','','','');

  email_verify.email_verify();
});