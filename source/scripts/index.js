import { initMapDisplay, insertAPIKey } from "./map.js";
// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", async () => {
  await init();
});
document.getElementById("loadMapBtn").addEventListener("click", insertAPIKey);

async function init() {
  // Show or hide side bar
  const modal = document.getElementById("memoryModal");
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");

  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  document.querySelectorAll(".icon-btn").forEach((button) => {
    const type = button.dataset.type;
    const id = button.dataset.id;
    const key = `memory:${id}:${type}`;

    // Get status from localStorage
    const isActive = localStorage.getItem(key) === "true";
    if (isActive) {
      button.classList.add("active");
    }

    // Change status when clicked
    button.addEventListener("click", () => {
      const nowActive = button.classList.toggle("active");
      localStorage.setItem(key, nowActive);
    });
  });

  document.querySelectorAll(".category-tag").forEach((tag) => {
    const type = tag.dataset.category.toLowerCase();

    const colors = {
      nostalgic: "#ff9d24",
      travel: "#1be287",
      food: "#ff247d",
      music: "#2496ff",
    };

    if (colors[type]) {
      tag.style.backgroundColor = colors[type];
      tag.style.color = "white";
    }
  });
  console.log("?PEEEPEE");
  initMapDisplay();
}
