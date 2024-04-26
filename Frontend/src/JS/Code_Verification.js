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

// history.pushState({ page: 'Code Verification' }, 'Code Verification', '../Code_Verification');
history.pushState(null , null, '../Code_Verification');

// history.go(-1); // Go back one step in history
// history.go(1);  // Go forward one step in history
