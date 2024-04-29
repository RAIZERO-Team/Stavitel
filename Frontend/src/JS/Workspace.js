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
  // Get all sections
  var sections = document.querySelectorAll(".section");

  // Hide all sections
  sections.forEach(function (section) {
    section.classList.remove("active");
  });

  // Show the selected section
  sections[index].classList.add("active");
}

// Show the initial section (index 0) when the page loads
document.addEventListener("DOMContentLoaded", function () {
  showSection(0); // Show section 0 by default
});

// add new project

// Function to open the subpage
function openSubpage() {
  var subpageContainer = document.getElementById("subpageContainer");
  var overlay = document.getElementById("overlay");
  subpageContainer.style.display = "block";
  overlay.style.display = "block";
}

// Function to close the subpage
function closeSubpage() {
  var subpageContainer = document.getElementById("subpageContainer");
  var overlay = document.getElementById("overlay");
  subpageContainer.style.display = "none";
  overlay.style.display = "none";
}

// =================== set mode cookie ===================

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

// Function to update body class based on mode
// function updateBodyClass(mode) {
//   const body = document.querySelector("body");
//   body.classList.remove("dark", "light");
//   body.classList.add(mode);
// }

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

const menuBar = document.querySelector(".content .bx.bx-menu");

window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    sideBar.classList.add("close");
  } else {
    sideBar.classList.remove("close");
  }
  if (window.innerWidth > 576) {
    searchBtnIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

// dashboard chartjs

let ctx = document.getElementById("myChart");
let myChart;
let Jsondata;

fetch("./data.json")
  .then(function (response) {
    if (response.status == 200) {
      return response.json();
    }
  })
  .then(function (data) {

    Jsondata = data;

    createChart(Jsondata, "bar");
  });

function createChart(data, type) {
  myChart = new Chart(ctx, {
    // Setting the chart's type to the `type` parameter.
    type: type,
    data: {
      labels: data.map((row) => row.month),
      datasets: [
        {
          label: "# of Income",
          data: data.map((row) => row.income),

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

function setChartType(chartType) {
  // To change the chart type we have first to destroy the current
  // chart object.
  myChart.destroy();

  // Next we render a new one passing-in, the `Jsondata`
  // and the `chartType` that the button sends.
  createChart(Jsondata, chartType);
}

// ================ Add New Project ================ //

function selectCard(card) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((c) => c.classList.remove("selected"));

  card.classList.add("selected");
}

// ================ My Project ================ //

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

function test() {
  console.log("test");
}

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
