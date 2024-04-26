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
history.pushState(null , null, '../Change_Password');

// history.go(-1); // Go back one step in history
// history.go(1);  // Go forward one step in history