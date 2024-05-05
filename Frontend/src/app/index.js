// ============= loading spinner function =============
function loadingSpinner() {
  let spinner_wrapper = document.querySelector(".spinner-wrapper");

  spinner_wrapper.classList.remove("hide");
  window.addEventListener("load", () => {
    setTimeout(() => {
      spinner_wrapper.classList.add("hide");
    }, 4000);
  });
}

loadingSpinner();
