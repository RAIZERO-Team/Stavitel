import { userData } from "../context/userData.js";
import { notification } from "../context/notfication.js";

const inputs = document.querySelectorAll(".input-field");
const Ername = document.querySelectorAll(".error_name");
const Eremail = document.querySelectorAll(".error_email");
const Erpassword = document.querySelectorAll(".error_password");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

let login_btn = document.getElementById("sign_in_btn");
let register_btn = document.getElementById("sign_up_btn");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

// images slide

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

// =============  Password Strength Check =============

// ======== Create object from userData class ========

let User = new userData();

// ======== login ========
login_btn.addEventListener("click", async (event) => {
  event.preventDefault();

  let login_email = document.getElementById("login_email").value;
  let login_password = document.getElementById("login_password").value;

  User.loginEmail = login_email;
  User.loginPassword = login_password;

  const notificationsContainer = document.querySelector(".notifications");
  const notifier = new notification();

  // Error style object
  let errorStyle = {
    error_email: {
      text: "Email",
      color: "#bbb",
    },
    error_password: {
      text: "Password",
      color: "#bbb",
    },
  };

  try {
    // the fetch login data
    const result = await User.userLogin({
      email: login_email,
      password: login_password,
    });

    if (result) {
      if (result.email) {
        console.log(result.email);

        const customMessage = "There is Error In Login Email";
        const successNotification = notifier.createToast(
          "error",
          customMessage
        );
        notificationsContainer.appendChild(successNotification);

        Ername.forEach((inp) => {
          inp.classList.remove("error");
        });

        Eremail.forEach((inp) => {
          inp.classList.add("error");
          if (inp.value != "") return;
          inp.classList.remove("error");
        });

        Erpassword.forEach((inp) => {
          inp.classList.remove("error");
        });

        errorStyle.error_email.text = "*Email";
        errorStyle.error_email.color = "#ff0000";
      } else if (result.password) {
        console.log(result.password);

        Ername.forEach((inp) => {
          inp.classList.remove("error");
        });

        Eremail.forEach((inp) => {
          inp.classList.remove("error");
        });

        Erpassword.forEach((inp) => {
          inp.classList.add("error");
          if (inp.value != "") return;
          inp.classList.remove("error");
        });

        errorStyle.error_password.text = "*Password";
        errorStyle.error_password.color = "#ff0000";
      }
    }
    // Update HTML elements with new configurations
    for (const key in errorStyle) {
      if (Object.hasOwnProperty.call(errorStyle, key)) {
        const element = document.getElementById(key);
        if (element) {
          element.innerText = errorStyle[key].text;
          element.style.color = errorStyle[key].color;
        }
      }
    }
  } catch (error) {
    console.error("Failed to register user:");
  }
});

// ======== Register ========

// register_btn.addEventListener("click", async (event) => {
//   event.preventDefault();

//   // call the elements from html
//   let register_username = document.getElementById("register_username").value;
//   let register_email = document.getElementById("register_email").value;
//   let register_password = document.getElementById("register_password").value;
//   // let error_name = document.getElementById("error_name");
//   // let error_email = document.getElementById("error_email");
//   // let error_password = document.getElementById("error_password");

//   // const successButton = document.getElementById("successButton");
//   const notificationsContainer = document.querySelector(".notifications");
//   const notifier = new notification();

//   // successButton.addEventListener("click", () => {
//   //   const customMessage = "This is a error message";
//   //   const successNotification = notifier.createToast('info', customMessage);
//   //   notificationsContainer.appendChild(successNotification);
//   // });

//   User.registerUsername = register_username;
//   User.registerEmail = register_email;
//   User.registerPassword = register_password;

//   sessionStorage.setItem("userEmail", register_email);

//   // To Remove the session
//   setTimeout(() => {
//     sessionStorage.removeItem("userEmail");
//   }, 4000);

//   try {
//     // the fetch registration data
//     // Error style object
//     let errorStyle = {
//       error_name: {
//         text: "Name",
//         color: "#bbb",
//       },
//       error_email: {
//         text: "Email",
//         color: "#bbb",
//       },
//       error_password: {
//         text: "Password",
//         color: "#bbb",
//       },
//     };

//     const result = await User.userRegister({
//       username: register_username,
//       email: register_email,
//       password: register_password,
//     });

//     if (result) {
//       // Error username
//       if (result.username) {
//         console.log(result.username);

//         const customMessage = result.username;
//         const successNotification = notifier.createToast(
//           "error",
//           customMessage
//         );
//         notificationsContainer.appendChild(successNotification);

//         Ername.forEach((inp) => {
//           inp.classList.add("error");
//           if (inp.value != "") return;
//           inp.classList.remove("error");
//         });

//         Eremail.forEach((inp) => {
//           inp.classList.remove("error");
//         });

//         Erpassword.forEach((inp) => {
//           inp.classList.remove("error");
//         });

//         errorStyle.error_name.text = "*Name";
//         errorStyle.error_name.color = "#ff0000";

//         // Error email
//       } else if (result.email) {
//         console.log(result.email);

//         const customMessage = result.email;
//         const successNotification = notifier.createToast(
//           "error",
//           customMessage
//         );
//         notificationsContainer.appendChild(successNotification);

//         Ername.forEach((inp) => {
//           inp.classList.remove("error");
//         });

//         Eremail.forEach((inp) => {
//           inp.classList.add("error");
//           if (inp.value != "") return;
//           inp.classList.remove("error");
//         });

//         Erpassword.forEach((inp) => {
//           inp.classList.remove("error");
//         });

//         errorStyle.error_email.text = "*Email";
//         errorStyle.error_email.color = "#ff0000";

//         // Error password
//       } else if (result.password) {
//         console.log(result.password);
//         const customMessage = result.password;
//         const successNotification = notifier.createToast(
//           "error",
//           customMessage
//         );
//         notificationsContainer.appendChild(successNotification);

//         Ername.forEach((inp) => {
//           inp.classList.remove("error");
//         });

//         Eremail.forEach((inp) => {
//           inp.classList.remove("error");
//         });

//         Erpassword.forEach((inp) => {
//           inp.classList.add("error");
//           if (inp.value != "") return;
//           inp.classList.remove("error");
//         });

//         errorStyle.error_password.text = "*Password";
//         errorStyle.error_password.color = "#ff0000";
//       }
//     }

//     // Update HTML elements with new configurations
//     for (const key in errorStyle) {
//       if (Object.hasOwnProperty.call(errorStyle, key)) {
//         const element = document.getElementById(key);
//         if (element) {
//           element.innerText = errorStyle[key].text;
//           element.style.color = errorStyle[key].color;
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Failed to register user:");
//   }
// });

register_btn.addEventListener("click", async (event) => {
  event.preventDefault();

  const register_username = document.getElementById("register_username").value;
  const register_email = document.getElementById("register_email").value;
  const register_password = document.getElementById("register_password").value;

  const notificationsContainer = document.querySelector(".notifications");
  const notifier = new notification();

  User.registerUsername = register_username;
  User.registerEmail = register_email;
  User.registerPassword = register_password;

  sessionStorage.setItem("userEmail", register_email);

  // To Remove the session
  setTimeout(() => {
    sessionStorage.removeItem("userEmail");
  }, 4000);

  try {
    const result = await User.userRegister({
      username: register_username,
      email: register_email,
      password: register_password,
    });

    // Reset error styles and messages
    const errorName = document.getElementById("error_name");
    const errorEmail = document.getElementById("error_email");
    const errorPassword = document.getElementById("error_password");

    errorName.innerText = "Name";
    errorName.style.color = "#bbb";
    errorEmail.innerText = "Email";
    errorEmail.style.color = "#bbb";
    errorPassword.innerText = "Password";
    errorPassword.style.color = "#bbb";

    if (result) {
      if (result.username) {
        const customMessage = result.username;
        const errorNotification = notifier.createToast("error", customMessage);
        notificationsContainer.appendChild(errorNotification);

        errorName.innerText = "*Name";
        errorName.style.color = "#ff0000";
      }

      if (result.email) {
        const customMessage = result.email;
        const errorNotification = notifier.createToast("error", customMessage);
        notificationsContainer.appendChild(errorNotification);

        errorEmail.innerText = `*Email (${customMessage})`; // Show specific email error message
        errorEmail.style.color = "#ff0000";
      }

      if (result.password) {
        const customMessage = result.password;
        const errorNotification = notifier.createToast("error", customMessage);
        notificationsContainer.appendChild(errorNotification);

        errorPassword.innerText = `*Password (${customMessage})`; // Show specific password error message
        errorPassword.style.color = "#ff0000";
      }
    }

    // Handle field-specific error corrections
    document
      .getElementById("register_username")
      .addEventListener("input", () => {
        errorName.innerText = "Name";
        errorName.style.color = "#bbb";
      });

    document.getElementById("register_email").addEventListener("input", () => {
      errorEmail.innerText = "Email";
      errorEmail.style.color = "#bbb";
    });

    document
      .getElementById("register_password")
      .addEventListener("input", () => {
        errorPassword.innerText = "Password";
        errorPassword.style.color = "#bbb";
      });
  } catch (error) {
    console.error("Failed to register user:", error);
  }
});
