import { cardTemplate } from "./cardTemplate.js";
import { colors } from "./cardTemplate.js";

class MemoryData extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const rawDate = this.getAttribute("date");
    const date = new Date(rawDate);
    
    const data = {
      card_id: this.getAttribute("card_id"),
      img: this.getAttribute("img"),
      img_alt: this.getAttribute("img_alt"),
      date: this.getAttribute("date"),
      formatted_date:`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
      mood: this.getAttribute("mood"),
      title: this.getAttribute("title"),
      link: this.getAttribute("link"),
      description: this.getAttribute("description"),
    };

    this.shadowRoot.innerHTML = cardTemplate(data);

    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "styles/memoryCardListStyle.css");
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


      const button = this.shadowRoot.querySelector("a#editBtn")
      button.addEventListener("click", (e) => {
        // Prevent redirecting to save card info
        e.preventDefault();
        const card = this.shadowRoot.querySelector(".memory-card");
        const cardId = card.getAttribute("card_id");
        const title = card.querySelector('.title a');
        const titleText = title.textContent;
        const img = card.querySelector('img');
        const imgSrc = img ? img.getAttribute('src') : null;
        const moodSpan = card.querySelector('.category-tag');
        const mood = moodSpan.getAttribute('data-category');
        const description = card.querySelector('.description');
        const descriptionText = description.textContent.trim()
        // Save card info into localStorage
        localStorage.setItem("userData", JSON.stringify({ imgSrc,cardId,titleText,mood,descriptionText }));

        // Redirect to new page so the new page can read saved card info
        window.location.href = button.href;
      });
    
  }
}

customElements.define("memory-data", MemoryData);
