// Get DOM elements
const toggleInput = document.getElementById("toggle-input");
const mapLabel = document.querySelector(".map-label");
const listLabel = document.querySelector(".list-label");

// Set initial state
let isToggleOn = false;

// Toggle change event listener
toggleInput.addEventListener("change", () => {
  isToggleOn = toggleInput.checked;
  updateUI();
  switchView();
});

// Function to update UI based on toggle state
function updateUI() {
  // Update status display
  if (isToggleOn) {
    // Update labels
    mapLabel.classList.remove("active");
    listLabel.classList.add("active");
  } else {
    // Update labels
    mapLabel.classList.add("active");
    listLabel.classList.remove("active");
  }
}

function switchView() {
  if (isToggleOn) {
    // Switch to memories list view by redirecting to memories.html
    window.location.href = "memories.html";
  }
  // If toggle is off, we stay on the current page (map view)
}

// Check if we're on memories.html and set the toggle state accordingly
document.addEventListener("DOMContentLoaded", () => {
  // Check if current page is memories.html
  const currentPage = window.location.pathname;
  if (currentPage.includes("memories.html")) {
    // If we're on memories.html, set toggle to ON
    toggleInput.checked = true;
    isToggleOn = true;
    updateUI();
  }
});
