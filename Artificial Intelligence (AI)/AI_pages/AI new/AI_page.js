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

// ============= Chose Catogire =============

// Add event listeners to each card
// function querySelectorAll(card) {
//   card.forEach((c) => c.classList.remove("selected"));
//   card.classList.add("selected");
// }

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

// ============= Set Website Name =============



// const templates = {
//   sport: [
//     { name: 'template1', photo: 'test.jpg' },
//     { name: 'template2', photo: 'test.jpg' },
//     { name: 'template3', photo: 'test.jpg' }
//   ],
//   category2: [
//     { name: 'template4', photo: 'photo4.jpg' },
//     { name: 'template5', photo: 'photo5.jpg' },
//     { name: 'template6', photo: 'photo6.jpg' }
//   ],
//   category3: [
//     { name: 'template7', photo: 'photo7.jpg' },
//     { name: 'template8', photo: 'photo8.jpg' },
//     { name: 'template9', photo: 'photo9.jpg' }
//   ]
// };

// const selectedTemplatesContainer = document.getElementById('selectedTemplates');

// function displayTemplates(category) {
//   const selectedTemplates = templates[category];
//   selectedTemplatesContainer.innerHTML = '';

//   selectedTemplates.forEach(template => {
//     const templateElement = document.createElement('div');
//     templateElement.classList.add('template');
//     templateElement.innerHTML = `
//       <h3>${template.name}</h3>
//       <img src="${template.photo}" alt="${template.name}">
//     `;
//     selectedTemplatesContainer.appendChild(templateElement);
//   });
// }

// const items = document.querySelectorAll(".items");
// items.forEach((items, index) => {
//   items.addEventListener("click", () => {
//     const selectedCategory = items.getAttribute('data-category');
//     displayTemplates(selectedCategory);
//   });
// });




