// Get the elements
const saveButton = document.getElementById('save');
const cancelButton = document.getElementById('cancel');
const checkbox = document.getElementById('checkbox');

// Initial state
let checkboxState = checkbox.checked;

// Add event listeners to buttons
saveButton.addEventListener('click', saveChanges);
cancelButton.addEventListener('click', cancelChanges);

// Save changes function
function saveChanges() {
  // Update checkbox state
  checkboxState = checkbox.checked;

  // Simulate saving data (replace with your actual saving logic)
  console.log('Saving changes:', checkboxState);
}

// Cancel changes function
function cancelChanges() {
  // Restore checkbox state to initial value
  checkbox.checked = checkboxState;
}