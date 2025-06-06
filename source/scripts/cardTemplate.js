export function cardTemplate(data) {
  return `

  <div class="memory-card" card_id="${data.card_id}">     
      <a href="${data.link}" class="thumbnail">
      <img src="${data.img}" alt="${data.img_alt}" class="thumbnail-image" />
      </a>
      <div class="card-content">
      <div class="meta-row">
          <span class="category-tag" data-category="${data.mood}"
          >${data.mood}</span
          >
          <span class="date">${data.formatted_date}</span>
              <div class="card-actions">

                <a href="/source/create.html" id="editBtn" class="no-underline" target="_blank" rel="noopener noreferrer">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon outline" fill="none">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg>
                </a>

                <button class="delete-btn" title="Delete Memory" data-id="${data.id}">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="icon outline">
                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                </svg>
                </button>       

              </div>
      </div>
      <h2 class="title">
          <a href="${data.link}">${data.title}</a>
      </h2>
      <p class="description">
          ${data.description ? data.description : "No Description Provided"}
      </p>
      <div class="card-footer">
          <!-- Musical note -->
          <button class="icon-btn music" data-type="music" data-id="${data.card_id}">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon outline"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
          >
              <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
              />
          </svg>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon solid hidden"
              viewBox="0 0 24 24"
              fill="#77DD77"
              class="size-6"
          >
              <path
              fill-rule="evenodd"
              d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
              clip-rule="evenodd"
              />
          </svg>
          </button>


          <!-- Heart -->
          <button class="icon-btn heart" data-type="heart" data-id="${data.card_id}">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon outline"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
          >
              <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
          </svg>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon solid hidden"
              viewBox="0 0 24 24"
              fill="#f5553d"
              class="size-6"
          >
              <path
              d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
              />
          </svg>
          </button>

          <!-- Bookmark -->
          <button
          class="icon-btn bookmark"
          data-type="bookmark"
          data-id="${data.card_id}"
          >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon outline"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
          >
              <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
          </svg>

          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon solid hidden"
              viewBox="0 0 24 24"
              fill="#f1b710"
              class="size-6"
          >
              <path
              fill-rule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
              clip-rule="evenodd"
              />
          </svg>
          </button>
      </div>
      </div>
    </div>

    `;
}

export const colors = {
  nostalgic: "#ff9d24",
  travel: "#1be287",
  food: "#ff247d",
  music: "#2496ff",
};


            // <memory-photo>
            //   <button
            //     onclick="// showMemoryDetails(${data.card_id})"
            //     class="memory-photo">
            //     <img id="" src="${data.img}" alt="${data.img_alt}" />
            //   </button>
            // </memory-photo>
            // <card-content>
            //   <card-meta>
            //     <!-- this should dynamically change colors -->
            //     <card-mood
            //       id="mood"
            //       moodcategory="${data.mood}"
            //       >
            //       Mood</card-mood
            //     >
            //     <card-date id="date">${data.date}</card-date>
            //     <card-actions>
            //       <button onclick="// edit in backend" id="edit-btn">✏️</button>
            //       <button onclick="// delete in backend" id="delete-btn">
            //         🗑️
            //       </button>
            //     </card-actions>
            //   </card-meta>
            //   <!-- Where would this lead? -->
            //   <a href="${data.link}" target="_blank">
            //     <h2 id="title">${data.title}</h2>
            //   </a>
            //   <p id="description">
            //     ${data.description ? data.description : "No Description Provided"}
            //   </p>
            //   <card-footer>
            //     <span id="location">📍 ${data.location ? data.location: "No Location Provided"}</span>
            //   </card-footer>
            // </card-content>