// Get DOM elements
const toggleInput = document.getElementById("toggle-input");
const statusDisplay = document.getElementById("status-display");
const mapLabel = document.querySelector(".map-label");
const listLabel = document.querySelector(".list-label");

// Set initial state
let isToggleOn = false;

// Toggle change event listener
toggleInput.addEventListener("change", () => {
  isToggleOn = toggleInput.checked;
  updateUI();
});

// Function to update UI based on toggle state
function updateUI() {
  // Update status display
  if (isToggleOn) {
    // statusDisplay.innerHTML = `
    //           <div class="status-icon">✅</div>
    //           <div>The toggle is currently ON</div>
    //       `;
    // statusDisplay.style.backgroundColor = "#e8f7ee";

    // Update labels
    mapLabel.classList.remove("active");
    listLabel.classList.add("active");
  } else {
    // statusDisplay.innerHTML = `
    //           <div class="status-icon">📍</div>
    //           <div>The toggle is currently OFF</div>
    //       `;
    // statusDisplay.style.backgroundColor = "#f5f5f7";

    // Update labels
    mapLabel.classList.add("active");
    listLabel.classList.remove("active");
  }
}