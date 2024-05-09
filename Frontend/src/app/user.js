
// ============ Input field animation function ============

const inputs = document.querySelectorAll(".input-field");

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

// let forget_password_btn = document.getElementById("forget_password_btn");
// let code_verification_btn = document.getElementById("code_verification_btn");
// let change_password_btn = document.getElementById("change_password_btn");


// // Forget password -> user email
// forget_password_btn.addEventListener("click", async (event) => {
//   event.preventDefault();
//   let forget_password_email = document.getElementById("forget_password_email").value;

//     try {
//       // const result = await user.user_register();
//     } catch (error) {
//       console.log("");
//     }
//   });

//   // Code verification -> user code
//   code_verification_btn.addEventListener("click", async (event) => {
//     event.preventDefault();
//     // let code_verification_code = document.getElementById("code_verification_code").value;

//     try {
//       // const result = await user.user_register();
//     } catch (error) {
//       console.log("");
//     }
//   });
  
//   // Change password -> user password
//   change_password_btn.addEventListener("click", async (event) => {
//     event.preventDefault();
//     let change_password_new_password = document.getElementById("change_password_new_password").value;
//     let change_password_confirm_new_password = document.getElementById("change_password_confirm_new_password").value;

//     try {
//       // const result = await user.user_register();
//     } catch (error) {
//       console.log("");
//     }
//   });

