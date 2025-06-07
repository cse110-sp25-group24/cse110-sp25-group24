import { cardTemplate } from "./cardTemplate.js";
import { retrieveMemory } from './dataHandlingFunctions.js';

class MemoryData extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const rawDate = this.getAttribute("date");
    const date = new Date(rawDate);
    
    const data = {
      card_id: this.getAttribute("card_id"), // weird
      img: this.getAttribute("img"), // weird
      img_alt: this.getAttribute("img_alt"), // weird...
      date: this.getAttribute("date"),
      formatted_date:`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
      mood: this.getAttribute("mood"),
      title: this.getAttribute("title"),
      link: this.getAttribute("link"), // weird
      description: this.getAttribute("description"), // 
      location: this.getAttribute("location") || "No Location Provided"
    };

    this.shadowRoot.innerHTML = cardTemplate(data);

    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "styles/memories.css");
    this.shadowRoot.appendChild(link);
    this.shadowRoot.querySelectorAll(".category-tag").forEach((tag) => {
      const type = tag.dataset.category.toLowerCase();

      if (colors[type]) {
        tag.style.backgroundColor = colors[type];
        tag.style.color = "white";
      }
    });
    this.shadowRoot.querySelectorAll(".icon-btn").forEach((button) => {
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
  }
}

customElements.define("memory-data", MemoryData);
