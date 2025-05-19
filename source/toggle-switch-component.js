class ToggleSwitch {
  /**
   * Create a new toggle switch
   * @param {Object} options - Configuration options
   * @param {string} options.offLabel - Label for the OFF state (default: "Off")
   * @param {string} options.onLabel - Label for the ON state (default: "On")
   * @param {boolean} options.initialState - Initial state (default: false/off)
   * @param {Function} options.onChange - Callback when toggle changes
   * @param {string} options.containerId - ID of container to append to (optional)
   */
  constructor(options = {}) {
    // Default options
    this.options = {
      offLabel: options.offLabel || "Off",
      onLabel: options.onLabel || "On",
      initialState: options.initialState || false,
      onChange: options.onChange || (() => {}),
      containerId: options.containerId || null
    };
    
    // State
    this.isOn = this.options.initialState;
    
    // DOM elements
    this.container = null;
    this.toggleInput = null;
    this.offLabel = null;
    this.onLabel = null;
    
    // Create the component
    this.createToggle();
    
    // If containerId is provided, append to that container
    if (this.options.containerId) {
      const targetContainer = document.getElementById(this.options.containerId);
      if (targetContainer) {
        targetContainer.appendChild(this.container);
      }
    }
  }
  
  /**
   * Create the toggle switch DOM elements
   */
  createToggle() {
    // Create container
    this.container = document.createElement('div');
    this.container.className = 'toggle-container';
    
    // Create off label
    this.offLabel = document.createElement('span');
    this.offLabel.className = 'toggle-label off-label' + (this.isOn ? '' : ' active');
    this.offLabel.textContent = this.options.offLabel;
    
    // Create toggle switch
    const toggleSwitch = document.createElement('label');
    toggleSwitch.className = 'toggle-switch';
    
    // Create checkbox input
    this.toggleInput = document.createElement('input');
    this.toggleInput.type = 'checkbox';
    this.toggleInput.className = 'toggle-input';
    this.toggleInput.checked = this.isOn;
    
    // Create slider
    const toggleSlider = document.createElement('span');
    toggleSlider.className = 'toggle-slider';
    
    // Create on label
    this.onLabel = document.createElement('span');
    this.onLabel.className = 'toggle-label on-label' + (this.isOn ? ' active' : '');
    this.onLabel.textContent = this.options.onLabel;
    
    // Add event listener
    this.toggleInput.addEventListener('change', this.handleToggle.bind(this));
    
    // Assemble the component
    toggleSwitch.appendChild(this.toggleInput);
    toggleSwitch.appendChild(toggleSlider);
    this.container.appendChild(this.offLabel);
    this.container.appendChild(toggleSwitch);
    this.container.appendChild(this.onLabel);
  }
  
  /**
   * Handle toggle change
   * @param {Event} event - Change event
   */
  handleToggle(event) {
    this.isOn = event.target.checked;
    
    // Update labels
    if (this.isOn) {
      this.offLabel.classList.remove('active');
      this.onLabel.classList.add('active');
    } else {
      this.offLabel.classList.add('active');
      this.onLabel.classList.remove('active');
    }
    
    // Call onChange callback
    this.options.onChange(this.isOn);
  }
  
  /**
   * Get the current state
   * @returns {boolean} Current state
   */
  getState() {
    return this.isOn;
  }
  
  /**
   * Set the state
   * @param {boolean} state - New state
   * @param {boolean} triggerChange - Whether to trigger the onChange callback
   */
  setState(state, triggerChange = true) {
    if (this.isOn !== state) {
      this.isOn = state;
      this.toggleInput.checked = state;
      
      // Update labels
      if (this.isOn) {
        this.offLabel.classList.remove('active');
        this.onLabel.classList.add('active');
      } else {
        this.offLabel.classList.add('active');
        this.onLabel.classList.remove('active');
      }
      
      // Trigger change event if requested
      if (triggerChange) {
        this.options.onChange(this.isOn);
      }
    }
  }
  
  /**
   * Get the DOM element
   * @returns {HTMLElement} Toggle container element
   */
  getElement() {
    return this.container;
  }
  
  /**
   * Append the toggle to a container
   * @param {HTMLElement|string} container - Container element or ID
   */
  appendTo(container) {
    if (typeof container === 'string') {
      container = document.getElementById(container);
    }
    
    if (container && container instanceof HTMLElement) {
      container.appendChild(this.container);
    }
  }
}

// CSS styles for the toggle switch
const toggleStyles = `
.toggle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.toggle-label {
  font-size: 16px;
  font-weight: 500;
  color: #86868b;
  transition: color 0.3s ease;
  cursor: pointer;
}

.toggle-label.active {
  color: #1d1d1f;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 51px;
  height: 31px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e3e3e5;
  transition: .4s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 27px;
  width: 27px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
}

input:checked + .toggle-slider {
  background-color: #34c759;
}

input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

/* Responsive styles */
@media (max-width: 500px) {
  .toggle-label {
    font-size: 14px;
  }
  
  .toggle-switch {
    width: 46px;
    height: 28px;
  }
  
  .toggle-slider:before {
    height: 24px;
    width: 24px;
  }
  
  input:checked + .toggle-slider:before {
    transform: translateX(18px);
  }
}
`;

// Add styles to document
function addToggleStyles() {
  if (!document.getElementById('toggle-switch-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'toggle-switch-styles';
    styleElement.textContent = toggleStyles;
    document.head.appendChild(styleElement);
  }
}