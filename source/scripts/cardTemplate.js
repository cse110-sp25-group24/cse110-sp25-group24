export function cardTemplate(data) {
  return `
            <memory-photo>
              <button
                onclick="// showMemoryDetails(${data.card_id})"
                class="memory-photo">
                <img id="" src="${data.img}" alt="${data.img_alt}" />
              </button>
            </memory-photo>
            <card-content>
              <card-meta>
                <!-- this should dynamically change colors -->
                <card-mood
                  id="mood"
                  moodcategory="${data.mood}"
                  >
                  Mood</card-mood
                >
                <card-date id="date">${data.date}</card-date>
                <card-actions>
                  <button onclick="// edit in backend" id="edit-btn">✏️</button>
                  <button onclick="// delete in backend" id="delete-btn">
                    🗑️
                  </button>
                </card-actions>
              </card-meta>
              <!-- Where would this lead? -->
              <a href="${data.link}" target="_blank">
                <h2 id="title">${data.title}</h2>
              </a>
              <p id="description">
                ${data.description ? data.description : "No Description Provided"}
              </p>
              <card-footer>
                <span id="location">📍 ${data.location ? data.location: "No Location Provided"}</span>
              </card-footer>
            </card-content>
    `;
}

export const colors = {
  nostalgic: "#ff9d24",
  travel: "#1be287",
  food: "#ff247d",
  music: "#2496ff",
};
