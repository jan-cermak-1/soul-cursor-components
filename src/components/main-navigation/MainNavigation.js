class MainNavigation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.activeItem = this.getAttribute('active') || null;
  }

  static get observedAttributes() {
    return ['active'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active' && newValue !== oldValue) {
      this.activeItem = newValue;
      if (this.shadowRoot.querySelector('.nav-items')) {
        this.updateActiveState();
      }
    }
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  // Public API
  setActive(itemId) {
    this.setAttribute('active', itemId);
  }

  getActive() {
    return this.activeItem;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      ${this.getHTML()}
    `;
  }

  getStyles() {
    return `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      :host {
        display: block;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .nav-container {
        width: 48px;
        min-height: 600px;
        height: 100%;
        background: #2B2B2E;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px 0;
        box-sizing: border-box;
      }
      
      :host([fixed]) .nav-container {
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
      }

      .nav-items {
        display: flex;
        flex-direction: column;
        gap: 2px;
        width: 100%;
        padding: 0 6px;
      }

      .nav-separator {
        height: 1px;
        background: rgba(255, 255, 255, 0.1);
        width: calc(100% - 12px);
        margin: 6px auto;
      }

      .nav-item {
        width: 36px;
        height: 36px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        background: transparent;
        border: none;
        padding: 0;
        position: relative;
      }

      .nav-item:hover {
        background: rgba(255, 255, 255, 0.05);
      }

      .nav-item.active {
        background: #0F62FE;
      }

      .nav-item.active:hover {
        background: #0353E9;
      }

      .nav-icon {
        width: 24px;
        height: 24px;
        color: #9D9DA0;
        transition: color 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .nav-item:hover .nav-icon {
        color: #F9F9FA;
      }

      .nav-item.active .nav-icon {
        color: #F9F9FA;
      }

      /* Plus Button */
      .nav-item.plus-button {
        background: #0F62FE;
        margin-top: 6px;
      }

      .nav-item.plus-button:hover {
        background: #0353E9;
      }

      .nav-item.plus-button .nav-icon {
        color: #F9F9FA;
      }

      /* Bottom Section */
      .nav-bottom {
        margin-top: auto;
        display: flex;
        flex-direction: column;
        gap: 2px;
        width: 100%;
        padding: 0 6px;
      }

      .nav-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        margin-top: 6px;
      }

      .nav-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .nav-badge {
        position: absolute;
        bottom: -2px;
        right: -2px;
        min-width: 18px;
        height: 18px;
        background: #DA1E28;
        border-radius: 9px;
        border: 2px solid #2B2B2E;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 700;
        color: white;
        padding: 0 4px;
      }

      /* Spacer */
      .spacer {
        flex: 1;
      }

      /* SVG Icons */
      svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
      }
    `;
  }

  getHTML() {
    return `
      <nav class="nav-container">
        <div class="nav-items">
          <!-- Command Center / Dashboard -->
          <button class="nav-item ${this.activeItem === 'dashboard' ? 'active' : ''}" data-item="dashboard" title="Command Center">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M7 3H5C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3Z" fill="currentColor"/>
                <path d="M7 15H5C3.89543 15 3 15.8954 3 17V19C3 20.1046 3.89543 21 5 21H7C8.10457 21 9 20.1046 9 19V17C9 15.8954 8.10457 15 7 15Z" fill="currentColor"/>
                <path d="M15 9H19C20.1046 9 21 8.10457 21 7V5C21 3.89543 20.1046 3 19 3H15C13.8954 3 13 3.89543 13 5V7C13 8.10457 13.8954 9 15 9Z" fill="currentColor"/>
                <path d="M19 15H15C13.8954 15 13 15.8954 13 17V19C13 20.1046 13.8954 21 15 21H19C20.1046 21 21 20.1046 21 19V17C21 15.8954 20.1046 15 19 15Z" fill="currentColor"/>
              </svg>
            </div>
          </button>

          <div class="nav-separator"></div>

          <!-- Home -->
          <button class="nav-item ${this.activeItem === 'home' ? 'active' : ''}" data-item="home" title="Home">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M3 10L10 3L17 10V18H13V13H7V18H3V10Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>

          <!-- Grid / Widgets -->
          <button class="nav-item ${this.activeItem === 'widgets' ? 'active' : ''}" data-item="widgets" title="Widgets">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
          </button>

          <!-- Analytics / Chart -->
          <button class="nav-item ${this.activeItem === 'analytics' ? 'active' : ''}" data-item="analytics" title="Analytics">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 3V18C3 19.1046 3.89543 20 5 20H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M7 14L11 10L15 14L21 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>

          <!-- Schedule / Timer -->
          <button class="nav-item ${this.activeItem === 'schedule' ? 'active' : ''}" data-item="schedule" title="Schedule">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
                <path d="M12 7V12L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </button>

          <!-- Network / Connections -->
          <button class="nav-item ${this.activeItem === 'network' ? 'active' : ''}" data-item="network" title="Network">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="5" r="2" fill="currentColor"/>
                <circle cx="5" cy="19" r="2" fill="currentColor"/>
                <circle cx="19" cy="19" r="2" fill="currentColor"/>
                <path d="M12 7V13M12 13L5 17M12 13L19 17" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
          </button>

          <!-- Bell / Notifications -->
          <button class="nav-item ${this.activeItem === 'notifications' ? 'active' : ''}" data-item="notifications" title="Notifications">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>

          <!-- Calendar -->
          <button class="nav-item ${this.activeItem === 'calendar' ? 'active' : ''}" data-item="calendar" title="Calendar">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" stroke-width="1.5"/>
                <path d="M3 10H21" stroke="currentColor" stroke-width="1.5"/>
                <path d="M8 3V7M16 3V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </button>

          <!-- Share / Social -->
          <button class="nav-item ${this.activeItem === 'share' ? 'active' : ''}" data-item="share" title="Share">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="18" cy="6" r="3" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="18" cy="18" r="3" stroke="currentColor" stroke-width="1.5"/>
                <path d="M8.7 13.5L15.3 16.5M8.7 10.5L15.3 7.5" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
          </button>

          <!-- Robot / Bot -->
          <button class="nav-item ${this.activeItem === 'bot' ? 'active' : ''}" data-item="bot" title="Bot">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="7" y="9" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="10" cy="13" r="1" fill="currentColor"/>
                <circle cx="14" cy="13" r="1" fill="currentColor"/>
                <path d="M12 5V9M9 5H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M7 15H5M19 15H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </button>

          <!-- Star / Favorites -->
          <button class="nav-item ${this.activeItem === 'favorites' ? 'active' : ''}" data-item="favorites" title="Favorites">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        <!-- Plus Button -->
        <button class="nav-item plus-button" data-item="add" title="Add">
          <div class="nav-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
        </button>

        <div class="spacer"></div>

        <!-- Bottom Section -->
        <div class="nav-bottom">
          <!-- Eye / View -->
          <button class="nav-item ${this.activeItem === 'view' ? 'active' : ''}" data-item="view" title="View">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
          </button>

          <!-- Help / Question -->
          <button class="nav-item ${this.activeItem === 'help' ? 'active' : ''}" data-item="help" title="Help">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
                <path d="M12 17V17.01M12 14C12 12.5 14 12.5 14 10.5C14 9.5 13 8.5 12 8.5C11 8.5 10 9.5 10 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </button>

          <!-- Settings -->
          <button class="nav-item ${this.activeItem === 'settings' ? 'active' : ''}" data-item="settings" title="Settings">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
                <path d="M12 4V6M12 18V20M4 12H6M18 12H20M6.34 6.34L7.76 7.76M16.24 16.24L17.66 17.66M17.66 6.34L16.24 7.76M7.76 16.24L6.34 17.66" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </button>

          <!-- Avatar with Badge -->
          <div class="nav-avatar">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Crect fill='%23FFA500' width='36' height='36' rx='18'/%3E%3Ctext x='50%25' y='50%25' dy='.1em' fill='white' font-family='Arial, sans-serif' font-size='16' font-weight='600' text-anchor='middle' dominant-baseline='middle'%3EJC%3C/text%3E%3C/svg%3E" alt="User avatar">
            <span class="nav-badge">12</span>
          </div>
        </div>
      </nav>
    `;
  }

  updateActiveState() {
    const items = this.shadowRoot.querySelectorAll('.nav-item[data-item]');
    items.forEach(item => {
      if (item.dataset.item === this.activeItem) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  attachEventListeners() {
    const items = this.shadowRoot.querySelectorAll('.nav-item[data-item]');
    
    items.forEach(item => {
      item.addEventListener('click', () => {
        const itemId = item.dataset.item;
        this.activeItem = itemId;
        this.updateActiveState();
        
        this.dispatchEvent(new CustomEvent('nav-change', {
          detail: { item: itemId },
          bubbles: true,
          composed: true
        }));
      });
    });

    const avatar = this.shadowRoot.querySelector('.nav-avatar');
    avatar?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('avatar-click', {
        bubbles: true,
        composed: true
      }));
    });
  }
}

customElements.define('main-navigation', MainNavigation);

export default MainNavigation;
