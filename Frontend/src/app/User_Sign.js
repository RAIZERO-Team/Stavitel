import { userData } from "../context/userData.js";

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

// let regExpWeak = /[a-z]+/;
// let regExpMedium = /\d+/;
// let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;

// function trigger() {
//   if (pass_input.value != "") {
//     if (
//       pass_input.value.length <= 3 &&
//       (pass_input.value.match(regExpWeak) ||
//         pass_input.value.match(regExpMedium) ||
//         pass_input.value.match(regExpStrong))
//     )
//       no = 1;
//     if (
//       pass_input.value.length >= 6 &&
//       ((pass_input.value.match(regExpWeak) &&
//         pass_input.value.match(regExpMedium)) ||
//         (pass_input.value.match(regExpMedium) &&
//           pass_input.value.match(regExpStrong)) ||
//         (pass_input.value.match(regExpWeak) &&
//           pass_input.value.match(regExpStrong)))
//     )
//       no = 2;
//     if (
//       pass_input.value.length >= 6 &&
//       pass_input.value.match(regExpWeak) &&
//       pass_input.value.match(regExpMedium) &&
//       pass_input.value.match(regExpStrong)
//     )
//       no = 3;
// }

const input = document.querySelector(".check");
const pwStrengthEl = document.querySelector(".strength");
const indicatorEl = document.querySelector(".indicator");

const colors = ["#ff0000", "#ffe100", "#0bd600"];
const texts = ["weak", "medium", "strong"];

let current_strength = 0;

let regExpWeak = /[a-z]+/;
let regExpMedium = /\d+/;
let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;

function checker(width, text, background, color) {
  indicatorEl.style.width = width;
  indicatorEl.style.background = background;
  pwStrengthEl.innerText = text;
  pwStrengthEl.style.color = color;
}

// input.addEventListener('input', () => {
//     if (input.value.length <= 3 && (input.value.match(regExpWeak) || input.value.match(regExpMedium) || input.value.match(regExpStrong))) {
//         current_strength = 3
//         checker(`${100 / 3}%`, texts[0], colors[0], colors[0])
//     } else if (input.value.length <= 15) {
//         current_strength = 2
//         checker(`${100 / 2}%`, texts[1], colors[1], colors[1])
//     } else {
//         current_strength = 1
//         checker(`${100 / 1}%`, texts[2], colors[2], colors[2])
//     }
// })

// input.addEventListener("input", () => {
//   if (
//     input.value.length <= 3 &&
//     (input.value.match(regExpWeak) ||
//       input.value.match(regExpMedium) ||
//       input.value.match(regExpStrong))
//   ) {
//     current_strength = 3;
//     checker(`${100 / 3}%`, texts[0], colors[0], colors[0]);
//   } else if (
//     input.value.length >= 6 &&
//     ((input.value.match(regExpWeak) && input.value.match(regExpMedium)) ||
//       (input.value.match(regExpMedium) && input.value.match(regExpStrong)) ||
//       (input.value.match(regExpWeak) && input.value.match(regExpStrong)))
//   ) {
//     current_strength = 2;
//     checker(`${100 / 2}%`, texts[1], colors[1], colors[1]);
//   } else if (
//     input.value.length >= 6 &&
//     input.value.match(regExpWeak) &&
//     input.value.match(regExpMedium) &&
//     input.value.main.match(regExpStrong)
//   ) {
//     current_strength = 1;
//     checker(`${100 / 1}%`, texts[2], colors[2], colors[2]);
//   }
//   else {
//     console.log("false");
//   }
// });

// ========= Sign in button with google =========
function handleCredentialResponse(response) {
  fetch("auth_init.php", {
    method: "post",
    headers: { "content-Type": "application/json" },
    body: json.stringify({
      Request_type: "user_auth",
      Credential: response.Credential,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status == 1) {
        let responsepayload = data.pdata;
        let profileHTML =
          "<h3>Welcome " +
          responsepayload.given_name +
          '! <a href="javascript:void(0);"onclick="signOut(' +
          responsepayload.sub +
          ');">Sign out</a></h3>';
        profileHTML +=
          '<img src="' +
          responsepayload.picture +
          '"/><p><b>Auth ID: </b>' +
          responsepayload.sub +
          "</p><p><b>Name: </b>" +
          responsepayload.name +
          "</p><p><b>Email: </b>" +
          responsepayload.email +
          "</p>";
        document.getElementsByClassName("pro-data")[0].innerHTML = profileHTML;
        document.querySelector("#btnwrap").classList.add("hidden");
        document.querySelector(".pro-data").classList.remove("hidden");
      }
    })
    .catch(console.error);
}
function signOut(authID) {
  document.getElementsByClassName("pro-data")[0].innerHtml = "";
  document.querySelector("#btnwrap").classList.remove("hidden");
  document.querySelector(".pro-data").classList.add("hidden");
}

// document.addEventListener('DOMContentLoaded', () => {

// ======== login ========
login_btn.addEventListener("click", async (event) => {
  event.preventDefault();
  let login_email = document.getElementById("login_email").value;
  let login_password = document.getElementById("login_password").value;
  let user = new userData(login_email, login_password, "", "", "");

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
    const result = await user.user_register({
      username: login_email,
      email: login_password,
    });

    if (result) {
      if (result.email) {
        console.log(result.email);

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
  } catch (error) {
    console.error("Failed to register user:");
  }
});

// ======== Register ========

register_btn.addEventListener("click", async (event) => {
  event.preventDefault();
  // call the elements from html
  let register_username = document.getElementById("register_username").value;
  let register_email = document.getElementById("register_email").value;
  let register_password = document.getElementById("register_password").value;
  let error_name = document.getElementById("error_name");
  let error_email = document.getElementById("error_email");
  let error_password = document.getElementById("error_password");

  let user = new userData(
    "",
    "",
    register_username,
    register_email,
    register_password
  );

  // Error style object
  let errorStyle = {
    error_name: {
      text: "Name",
      color: "#ddd",
    },
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
    // the fetch registration data
    const result = await user.user_register({
      username: register_username,
      email: register_email,
      password: register_password,
    });

    if (result) {
      if (result.username) {
        console.log(result.username);

        Ername.forEach((inp) => {
          inp.classList.add("error");
          if (inp.value != "") return;
          inp.classList.remove("error");
        });

        Eremail.forEach((inp) => {
          inp.classList.remove("error");
        });

        Erpassword.forEach((inp) => {
          inp.classList.remove("error");
        });

        errorStyle.error_name.text = "*Name";
        errorStyle.error_name.color = "#ff0000";
      } else if (result.email) {
        console.log(result.email);

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
// });
