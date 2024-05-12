// import { search } from "../context/search.js";
// import { notification } from "../context/notfication.js";
// import { dashboard } from "../context/dashboard.js";
// import { project } from "../context/Projects.js";

const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});

// =================== Switch With Sections ===================

// Function to show the selected section
function showSection(index) {
  var sections = document.querySelectorAll(".section");
  // Hide all sections
  sections.forEach(function (section) {
    section.classList.remove("active");
  });

  sections[index].classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
  showSection(0);
});

// =================== set mode cookie ===================

// Function to set a cookie
function setCookie(cookieName, cookieValue, expirationDays) {
  const d = new Date();
  d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

// Function to get a cookie value
function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

// To delete a cookie
function deleteCookie(cookieName) {
  document.cookie =
    cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Function to toggle between dark and light mode

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    // body.classList.remove("dark");
    // body.classList.add("light");
    modeText.innerText = "Light mode";
    setCookie("mode", "light", 30);
    // updateBodyClass("light");
  } else {
    // body.classList.remove("light");
    // body.classList.add("dark");
    modeText.innerText = "Dark mode";
    setCookie("mode", "dark", 30);
    // updateBodyClass("dark");
  }
});

// Example usage:
//deleteCookie("mode"); // Deletes the "username" cookie

// Check if there's a saved mode preference and apply it
window.onload = function () {
  const savedMode = getCookie("mode");
  // const body = document.querySelector("body");
  const modeSwitch = body.querySelector(".toggle-switch");
  const modeText = body.querySelector(".mode-text");

  if (savedMode === "dark") {
    body.classList.add("dark");
    // modeSwitch.classList.add("dark-mode");
    modeText.innerText = "Dark mode";
    // updateBodyClass("dark");
  } else if (savedMode === "light") {
    body.classList.add("light");
    // modeSwitch.classList.add("light-mode");
    modeText.innerText = "Light mode";
    // updateBodyClass("light");
  }
};

// ================ Dashboard ================ //

// ---------- Data quik look ----------
let proj_ai_type_number = document.getElementById("proj_ai_type_number");
let proj_editor_type_number = document.getElementById(
  "proj_editor_type_number"
);
let siteVisitor = document.getElementById("siteVisitor");
let recent_proje = document.getElementById("recent_proje");

let data = {
  ai: "200",
  editor: "5",
  siteVist: "20",
  proj_name: "Stavitel",
  proj_date: "10-5-2024",
  proj_tybe: "AI",
};

// let ai_type = 

proj_ai_type_number.innerText = data.ai;
proj_editor_type_number.innerText = data.editor;
siteVisitor.innerText = data.siteVist;

recent_proje.innerHTML = `<tr>
<td>
  <img src="../../public/Icons/logo.png" />
  <p>${data.proj_name}</p>
</td>
<td>${data.proj_date}</td>
<td><span class="status ${data.proj_tybe}">${data.proj_tybe}</span></td>
</tr>`;

// ---------- Recent projects ----------

// ---------- Productivity ----------

// const productivityChart = document.getElementById('myChart');

// const test = new dashboard(
//   './data.json',
//   'line',
//   'Day',
//   'Hours',
//   '# of Hours',
//   'rgba(54, 162, 235, 0.2)',
//   'rgba(54, 162, 235, 1)',
//   productivityChart
// );

// test.fetchData();


// const test = new dashboard("", "", "", "", "", "", "", productivityChart);
// const charttest = test.chart();


let productivityChart = document.getElementById("myChart");
let Jsondata;
let myChart;

fetch("../app/data.json")
  .then(function (response) {
    if (response.status == 200) {
      return response.json();
    }
  })
  .then(function (data) {
    Jsondata = data;
    createChart(Jsondata, "line");
  });


function createChart(data, type) {
  myChart = new Chart(productivityChart, {
    type: type,
    data: {
      labels: data.map((row) => row.Day),
      datasets: [
        {
          label: "# of Hours",
          data: data.map((row) => row.Hours),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

createChart(charttest, "line");



// ================ Add New Project ================ //

function openSubpage() {
  var subpageContainer = document.getElementById("subpageContainer");
  var overlay = document.getElementById("overlay");
  subpageContainer.style.display = "block";
  overlay.style.display = "block";
}

function closeSubpage() {
  var subpageContainer = document.getElementById("subpageContainer");
  var overlay = document.getElementById("overlay");
  subpageContainer.style.display = "none";
  overlay.style.display = "none";
}

function selectCard(card) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((c) => c.classList.remove("selected"));
  card.classList.add("selected");

  // if (card.classList.contains("selected")){
  //   window.open("Editor_BT.html", "_parent");
  // }
}

// ================ My Project ================ //
function generateProject() {
  // Create a new card div element
  const project = document.createElement("div");
  project.classList.add("project");

  // project content (name, dates)
  const projectContent = `
      <div class="project-content">
          <div class="project-name">Stavitel</div>
          <div class="project-date">Created: April 30, 2024 ● </div>
          <div class="project-date">Last Edited: May 1, 2024</div>
      </div>
      
        <i class='bx bx-dots-horizontal-rounded more-icon'></i>
      
      <div class="hover-panel">
          <div class="hover-item edit-item">
              <span>Edit</span>
              <i class="fas fa-edit"></i>
          </div>
          <div class="hover-item delete-item">
              <span>Delete</span>
              <i class="fas fa-trash-alt"></i>
          </div>
          <div class="hover-item share-item">
              <span>Share</span>
              <i class="fas fa-share"></i>
          </div>
      </div>
  `;

  // Set the inner HTML of the project
  project.innerHTML = projectContent;

  // Append the project to the project container
  document.getElementById("projectContainer").appendChild(project);
}

// Add event listener to the generate button
document
  .getElementById("create-project")
  .addEventListener("click", generateProject);

// Event delegation to handle click on project icon to toggle hover panel
document.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("more-icon")) {
    // Find the corresponding hover panel
    const hoverPanel = target.nextElementSibling; // Get the next sibling (hover-panel)

    // Toggle the display of the hover panel
    if (hoverPanel.classList.contains("show")) {
      hoverPanel.classList.remove("show");
    } else {
      // Hide all other hover panels before showing this one
      const allHoverPanels = document.querySelectorAll(".hover-panel");
      allHoverPanels.forEach((panel) => {
        panel.classList.remove("show");
      });

      hoverPanel.classList.add("show");
    }
  } else {
    // Hide all hover panels if clicked outside of a project icon
    const allHoverPanels = document.querySelectorAll(".hover-panel");
    allHoverPanels.forEach((panel) => {
      panel.classList.remove("show");
    });
  }
});

// ------------------------

const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
});

// const ser1 = new search(userCardTemplate,userCardContainer);
// ser1.search_project();

// ================ Settings ================ //
function openSettings() {
  var settingsContainer = document.getElementById("settingContainer");
  var overlay = document.getElementById("overlay");
  settingsContainer.style.display = "block";
  overlay.style.display = "block";
}

// Function to close the subpage
function closeSettings() {
  var settingsContainer = document.getElementById("settingContainer");
  var overlay = document.getElementById("overlay");
  settingsContainer.style.display = "none";
  overlay.style.display = "none";
}

// ================ More Settings ================ //
function showSettingsTabs(index) {
  var sections = document.querySelectorAll(".settings-tabs");
  // let tabs = document.querySelectorAll(".horizontal-tabs");

  sections.forEach(function (section) {
    section.classList.remove("active");
  });

  sections[index].classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
  showSettingsTabs(0);
});

//---------------------Profile setting-------------------
let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");

uploadButton.onchange = () => {
  let reader = new FileReader();
  reader.readAsDataURL(uploadButton.files[0]);
  console.log(uploadButton.files[0]);
  reader.onload = () => {
    chosenImage.setAttribute("src", reader.result);
  };
};

// ================ Rate Form ================ //
const allStar = document.querySelectorAll(".rating .star");
const ratingValue = document.querySelector(".rating input");

allStar.forEach((item, idx) => {
  item.addEventListener("click", function () {
    let click = 0;
    ratingValue.value = idx + 1;
    console.log(ratingValue.value);

    allStar.forEach((i) => {
      i.classList.replace("bxs-star", "bx-star");
      i.classList.remove("active");
    });
    for (let i = 0; i < allStar.length; i++) {
      if (i <= idx) {
        allStar[i].classList.replace("bx-star", "bxs-star");
        allStar[i].classList.add("active");
      } else {
        allStar[i].style.setProperty("--i", click);
        click++;
      }
    }
  });
});

// test_redireect.goTo(404);

// ========= Notfication Toast =========

// document.addEventListener("DOMContentLoaded", () => {
//   const successButton = document.getElementById("successButton");
//   const notificationsContainer = document.getElementById(".notifications");

//   const notifier = new notification();

//   successButton.addEventListener("click", () => {
//     const customMessage = "This is a error message";
//     const successNotification = notifier.createToast('error', customMessage);
//     notificationsContainer.appendChild(successNotification);
//   });
// });
