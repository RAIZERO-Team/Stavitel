// ============ Input field animation function ============
import { userData } from "../context/userData.js";

const inputs = document.querySelectorAll(".input-field");
const Eremail = document.querySelectorAll(".error_email");
const Erpassword = document.querySelectorAll(".error_password");
const Erconfirmpassword = document.querySelectorAll(".error_confirm_password");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

// history.replaceState({ page: 'Change Password' }, 'Change Password', '../Change_Password');
// history.replaceState( null, null, '../Change_Password');
// history.pushState(null , null, '../Change_Password');

// history.go(-1); // Go back one step in history
// history.go(1);  // Go forward one step in history

// ============ User functions ============

let forget_password_btn = document.getElementById("forget_password_btn");
let code_verification_btn = document.getElementById("code_verification_btn");
let change_password_btn = document.getElementById("change_password_btn");

// Error style object
let errorStyle = {
  error_email: {
    text: "Email",
    color: "#bbb",
  },
  error_password: {
    text: "Enter password",
    color: "#bbb",
  },
  error_confirm_password: {
    text: "Confirm password",
    color: "#bbb",
  }
};

// Forget password -> user email
forget_password_btn.addEventListener("click", async (event) => {
  event.preventDefault();
  let forget_password_email = document.getElementById(
    "forget_password_email"
  ).value;

  let user_forget_pass = new userData(
    "",
    "",
    "",
    "",
    "",
    forget_password_email,
    ""
  );

  try {
    // the fetch login data
    const result = await user.user_register({
      username: login_email,
      email: login_password,
    });

    if (result) {
      if (result.email) {
        console.log(result.email);

        Eremail.forEach((inp) => {
          inp.classList.add("error");
          if (inp.value != "") return;
          inp.classList.remove("error");
        });

        errorStyle.error_email.text = "*Email";
        errorStyle.error_email.color = "#ff0000";
      }
    }
  } catch (error) {
    console.log("");
  }
});

// Code verification -> user code
code_verification_btn.addEventListener("click", async (event) => {
  event.preventDefault();
  // let code_verification_code = document.getElementById("code_verification_code").value;

  try {
    // here put the code
  } catch (error) {
    console.log("");
  }
});

// Change password -> user password
change_password_btn.addEventListener("click", async (event) => {
  event.preventDefault();
  let change_password_new_password = document.getElementById(
    "change_password_new_password"
  ).value;

  let change_pass_confirm_new_pass = document.getElementById(
    "change_password_confirm_new_password"
  ).value;

  try {
    // here put the code
  } catch (error) {
    console.log("");
  }
});

for (const key in errorStyle) {
  if (Object.hasOwnProperty.call(errorStyle, key)) {
    const element = document.getElementById(key);
    if (element) {
      element.innerText = errorStyle[key].text;
      element.style.color = errorStyle[key].color;
    }
  }
}