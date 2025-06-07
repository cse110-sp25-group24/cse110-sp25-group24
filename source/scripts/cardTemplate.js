export function cardTemplate(data) {
    console.log("cardTemplate data", data);
	return `
    <memory-card cardid="${data.post_id}">
      <memory-photo>
        <button
          onclick="// showMemoryDetails(${data.post_id})"
          class="memory-photo"
        >
          <img id="" src="${data.img}" alt="${data.img_alt || "Image Not Found"}" />
        </button>
      </memory-photo>
      <card-content>
        <card-meta>
          <!-- this should dynamically change colors -->
          <card-mood
            id="mood"
            moodcategory="${data.mood.length > 0 ? data.mood[0] : "none"}"
          >
            ${data.mood.length > 0 ? data.mood[0] : "none"}
          </card-mood>
          <card-date id="date">${data.formatted_date}</card-date>
          <card-actions>
            <button onclick="// edit in backend" id="edit-btn">✏️</button>
            <button onclick="// delete in backend" id="delete-btn">🗑️</button>
          </card-actions>
        </card-meta>
        <!-- Where would this lead? -->
        <a href="${data.link}" target="_blank">
          <h2 id="title">${data.title}</h2>
        </a>
        <p id="description">
          ${data.description.length > 0 ? data.description : "No description provided."}
        </p>
        <card-footer>
          <span id="location">📍 ${data.location}</span>
        </card-footer>
      </card-content>
    </memory-card>
  `;
}

export const colors = {
	nostalgic: "#ff9d24",
	travel: "#1be287",
	food: "#ff247d",
	music: "#2496ff",
};
