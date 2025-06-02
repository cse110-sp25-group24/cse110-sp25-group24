import { cardTemplate } from "./cardTemplate.js";
import { colors } from "./cardTemplate.js";

class MemoryCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const data = {
      id: this.getAttribute("card_id"),
      img: this.getAttribute("img"),
      img_alt: this.getAttribute("img_alt"),
      date: this.getAttribute("date"),
      category: this.getAttribute("category"),
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
  }
}

customElements.define("memory-card", MemoryCard);

// // Change to API later
// const cardData = [
//   {
//     id: "001",
//     img: "Kaname.jpg",
//     img_alt: "Memory photo",
//     date: "April 15, 2025",
//     category: "Nostalgic",
//     link: "/memory-detail.html",
//     title: "Sunset at Geisel Library",
//     description:
//       "A beautiful sunset casting golden rays through the trees near the library.",
//   },
//   {
//     id: "002",
//     img: "Kaname.jpg",
//     img_alt: "Memory photo",
//     date: "April 15, 2025",
//     category: "Travel",
//     link: "/memory-detail.html",
//     title: "Sunset at Geisel Library",
//     description: `LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG
//               text
//               testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt`,
//   },
//   {
//     id: "003",
//     img: "Kaname.jpg",
//     img_alt: "Memory photo",
//     date: "April 15, 2025",
//     category: "Food",
//     link: "/memory-detail.html",
//     title: "Sunset at Geisel Library",
//     description: `LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG
//               text
//               testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt`,
//   },
//   // More cards
// ];

// // Insert
// window.addEventListener("DOMContentLoaded", () => {
//   const container = document.querySelector(".card-list");
//   // alert(1);
//   cardData.forEach((item) => {
//     const card = document.createElement("memory-card");
//     card.setAttribute("card_id", item.id);
//     card.setAttribute("img", item.img);
//     card.setAttribute("img_alt", item.img_alt);
//     card.setAttribute("date", item.date);
//     card.setAttribute("category", item.category);
//     card.setAttribute("title", item.title);
//     card.setAttribute("link", item.link);
//     card.setAttribute("description", item.description);
//     container.appendChild(card);
//   });
// });
