// ============ Loading function ============

function loadingSpinner() {
  document.addEventListener("DOMContentLoaded", function () {
    var spinner_wrapper = document.querySelector(".spinner-wrapper");
    if (spinner_wrapper) {
      spinner_wrapper.classList.remove("active");
      setTimeout(function () {
        spinner_wrapper.classList.add("active");
      }, 900);
    } else {
      console.log("Element with class 'spinner-wrapper' not found.");
    }
  });
}

loadingSpinner();