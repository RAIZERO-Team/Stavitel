// ============= Menu Process =============

const progressBar = document.getElementById('progressBar');
const sections = document.querySelectorAll('.section');
const nextButton = document.getElementById('nextButton');
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

// ============= Chose Catogire =============


// ============= Chose Templete =============

function selectCard(card) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((c) => c.classList.remove("selected"));
  
  card.classList.add("selected");
}

// ============= Set Website Name =============
