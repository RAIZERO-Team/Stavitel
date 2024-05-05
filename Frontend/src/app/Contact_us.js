// ==================== Page Color Mode ====================
const toggleBtn = document.querySelector(".theme-toggle");
const allElements = document.querySelectorAll("*");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  allElements.forEach((el) => {
    el.classList.add("transition");
    setTimeout(() => {
      el.classList.remove("transition");
    }, 1000);
  });
});

// ==================== Contact Form ====================

const inputs = document.querySelectorAll(".contact-input");

inputs.forEach((ipt) => {
  ipt.addEventListener("focus", () => {
    ipt.parentNode.classList.add("focus");
    ipt.parentNode.classList.add("not-empty");
  });
  ipt.addEventListener("blur", () => {
    if(ipt.value == "") {
      ipt.parentNode.classList.remove("not-empty");
    }
    ipt.parentNode.classList.remove("focus");
  });
});

// ==================== Contact Form ====================

const form =document.querySelector("form");
const firstName = document.getElementById("First Name");
const lastName = document.getElementById("Last Name");
const email = document.getElementById("Email");
const message = document.getElementById("Message");

const bodyMessage = `First Name: ${firstName.value}<br> Last Name: ${lastName.value}<br> Email: ${email.value}<br> Message: ${message.value}<br>`;

function sendEmail() {
    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "raizeroteam@gmail.com",
      Password : "85BFB97FEC6EF45EDE659A94F6E90C0785C1",
      To : 'raizeroteam@gmail.com',
      From : "raizeroteam@gmail.com",
      Subject : "This is the subject",
      Body : bodyMessage
  }).then(
    message => {
      if (message == "ok") {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully!",
          icon: "success"
        });
      }
    }
  );
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  sendEmail();
});