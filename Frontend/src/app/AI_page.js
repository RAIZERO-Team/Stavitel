// ============= Menu Process =============

const progressBar = document.getElementById('progressBar');
const sections    =   document.querySelectorAll('.section');
const nextButton  = document.getElementById('nextButton');

let currentSectionIndex = 0;

// Show the initial section (index 1) on page load
showSection(currentSectionIndex);

nextButton.addEventListener('click', () => {
  currentSectionIndex++;
  if (currentSectionIndex < sections.length) {
    updateProgress(currentSectionIndex);
    showSection(currentSectionIndex);
  } else {
    // Reset to first section if at the end
    currentSectionIndex = 0;
    updateProgress(currentSectionIndex);
    showSection(currentSectionIndex);
  }
});

function updateProgress(index) {
  const progress = ((index + 1) / sections.length) * 100;
  progressBar.style.height = progress + '%';
}

function showSection(index) {
  sections.forEach((section, i) => {
    if (i === index) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
}

const item = document.querySelectorAll(".item");
item.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentSectionIndex++;
    if (currentSectionIndex < sections.length) {
      updateProgress(currentSectionIndex);
      showSection(currentSectionIndex);
    } else {
      // Reset to first section if at the end
      currentSectionIndex = 0;
      updateProgress(currentSectionIndex);
      showSection(currentSectionIndex);
    }
  });
});
function selectCard(item) {
  item.forEach((c) => c.classList.remove("selected"));
  item.classList.add("selected");
}


// ============= Chose Templete =============
const card = document.querySelectorAll(".card");
card.forEach((card, index) => {
  card.addEventListener("click", () => {
    currentSectionIndex++;
    if (currentSectionIndex < sections.length) {
      updateProgress(currentSectionIndex);
      showSection(currentSectionIndex);
    } else {
      // Reset to first section if at the end
      currentSectionIndex = 0;
      updateProgress(currentSectionIndex);
      showSection(currentSectionIndex);
    }
  });
});

// ============= Chose Templete =============

function selectCard(card) {
  cards.forEach((c) => c.classList.remove("selected"));
  card.classList.add("selected");
}

function showTemplates(templateClass) {
  // Hide card section
  document.getElementById("cardSection").style.display = "none";

  // Show template section
  var templateCards = document.querySelectorAll(".template-card");
  templateCards.forEach((card) => {
    card.style.display = "none";
  });

  var selectedTemplates = document.querySelectorAll("." + templateClass);
  selectedTemplates.forEach((template) => {
    template.style.display = "flex";
  });

  document.getElementById("templateSection").style.display = "flex";
}

function showCardSection() {
  // Hide template section
  document.getElementById("templateSection").style.display = "none";

  // Show card section
  document.getElementById("cardSection").style.display = "flex";
}

function navigateTo(url) {
  window.location.href = url;
}