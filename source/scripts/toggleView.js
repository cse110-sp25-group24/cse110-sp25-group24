class ToggleSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.checked = false;
    this._render();
  }

  connectedCallback() {
    this._upgradeProperty("checked");
    this._addEventListeners();
    this._updateChecked();
  }

  static get observedAttributes() {
    return ["checked"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "checked") {
      this._updateChecked();
    }
  }

  get checked() {
    return this.hasAttribute("checked");
  }
  set checked(val) {
    if (val) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  _addEventListeners() {
    this.shadowRoot
      .querySelector(".toggle-track")
      .addEventListener("click", () => {
        this.checked = !this.checked;
        this.dispatchEvent(new Event("change"));
      });
  }

  _updateChecked() {
    if (this.checked) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
        }
        .toggle-track {
          position: relative;
          width: 51px;
          height: 31px;
          background: #e3e3e5;
          border-radius: 34px;
          transition: background 0.4s;
          cursor: pointer;
        }
        :host([checked]) .toggle-track {
          background: #34c759;
        }
        .toggle-knob {
          position: absolute;
          left: 2px;
          bottom: 2px;
          width: 27px;
          height: 27px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 2px 3px rgba(0,0,0,0.15);
          transition: transform 0.4s;
        }
        :host([checked]) .toggle-knob {
          transform: translateX(20px);
        }
      </style>
      <div class="toggle-track">
        <div class="toggle-knob"></div>
      </div>
    `;
  }
}
customElements.define("toggle-switch", ToggleSwitch);

// Remove legacy code for old toggle-input and update to use <toggle-switch>

document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.querySelector("toggle-switch");
  const mapLabel = document.querySelector(".map-label");
  const listLabel = document.querySelector(".list-label");

  // Set initial state based on page
  const currentPage = window.location.pathname;
  if (currentPage.includes("memories.html")) {
    toggleSwitch.checked = true;
  } else {
    toggleSwitch.checked = false;
  }

  // Listen for toggle changes
  toggleSwitch.addEventListener("change", () => {
    if (toggleSwitch.checked) {
      window.location.href = "memories.html";
    } else {
      // Stay on map view
    }
  });
});
