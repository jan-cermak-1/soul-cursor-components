class MainNavigation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.activeItem = null;
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
        width: 56px;
        height: 100vh;
        background: #1C1C1E;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px 0;
        position: fixed;
        left: 0;
        top: 0;
      }

      .nav-items {
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: 100%;
        padding: 0 8px;
      }

      .nav-separator {
        height: 1px;
        background: rgba(255, 255, 255, 0.1);
        width: 40px;
        margin: 8px 0;
      }

      .nav-item {
        width: 40px;
        height: 40px;
        border-radius: 8px;
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
        background: rgba(255, 255, 255, 0.08);
      }

      .nav-item.active {
        background: #0F62FE;
      }

      .nav-item.active:hover {
        background: #0353E9;
      }

      .nav-icon {
        width: 20px;
        height: 20px;
        color: #A3A3A3;
        transition: color 0.2s ease;
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
        margin-top: 8px;
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
        gap: 4px;
        width: 100%;
        padding: 0 8px;
      }

      .nav-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        cursor: pointer;
      }

      .nav-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .nav-badge {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 16px;
        height: 16px;
        background: #DA1E28;
        border-radius: 50%;
        border: 2px solid #1C1C1E;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 9px;
        font-weight: 700;
        color: white;
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
          <!-- Dashboard / Main Icon -->
          <button class="nav-item ${this.activeItem === 'dashboard' ? 'active' : ''}" data-item="dashboard">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/>
                <circle cx="10" cy="10" r="3" fill="currentColor"/>
              </svg>
            </div>
          </button>

          <div class="nav-separator"></div>

          <!-- Home -->
          <button class="nav-item ${this.activeItem === 'home' ? 'active' : ''}" data-item="home">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M3 10L10 3L17 10V18H13V13H7V18H3V10Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>

          <!-- Grid / Dashboard -->
          <button class="nav-item ${this.activeItem === 'grid' ? 'active' : ''}" data-item="grid">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/>
                <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/>
                <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/>
                <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
          </button>

          <!-- Analytics -->
          <button class="nav-item ${this.activeItem === 'analytics' ? 'active' : ''}" data-item="analytics">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M3 15L7 11L11 15L17 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 7H17V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>

          <!-- Timer / Schedule -->
          <button class="nav-item ${this.activeItem === 'schedule' ? 'active' : ''}" data-item="schedule">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/>
                <path d="M10 6V10L13 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </button>

          <!-- Network / Connections -->
          <button class="nav-item ${this.activeItem === 'network' ? 'active' : ''}" data-item="network">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="4" r="2" fill="currentColor"/>
                <circle cx="4" cy="16" r="2" fill="currentColor"/>
                <circle cx="16" cy="16" r="2" fill="currentColor"/>
                <path d="M10 6V10M10 10L4 14M10 10L16 14" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
          </button>

          <!-- Bell / Notifications -->
          <button class="nav-item ${this.activeItem === 'notifications' ? 'active' : ''}" data-item="notifications">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M10 3C8 3 6.5 4.5 6.5 6.5V11L5 13H15L13.5 11V6.5C13.5 4.5 12 3 10 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M8.5 15C8.5 16.1 9.4 17 10.5 17C11.6 17 12.5 16.1 12.5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </button>

          <!-- Calendar / Events -->
          <button class="nav-item ${this.activeItem === 'calendar' ? 'active' : ''}" data-item="calendar">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/>
                <path d="M3 8H17" stroke="currentColor" stroke-width="1.5"/>
                <path d="M7 3V5M13 3V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </button>

          <!-- Share / Social -->
          <button class="nav-item ${this.activeItem === 'share' ? 'active' : ''}" data-item="share">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <circle cx="15" cy="5" r="2.5" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="5" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="15" cy="15" r="2.5" stroke="currentColor" stroke-width="1.5"/>
                <path d="M7.5 11L12.5 14M7.5 9L12.5 6" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
          </button>

          <!-- Robot / AI -->
          <button class="nav-item ${this.activeItem === 'ai' ? 'active' : ''}" data-item="ai">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <rect x="5" y="7" width="10" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="8" cy="11" r="1" fill="currentColor"/>
                <circle cx="12" cy="11" r="1" fill="currentColor"/>
                <path d="M10 4V7M7 4H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </button>

          <!-- Star / Favorites -->
          <button class="nav-item ${this.activeItem === 'favorites' ? 'active' : ''}" data-item="favorites">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M10 3L12 7L16.5 7.5L13 11L14 16L10 13.5L6 16L7 11L3.5 7.5L8 7L10 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        <!-- Plus Button -->
        <button class="nav-item plus-button" data-item="add">
          <div class="nav-icon">
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M10 5V15M5 10H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </button>

        <div class="spacer"></div>

        <!-- Bottom Section -->
        <div class="nav-bottom">
          <!-- Eye / View -->
          <button class="nav-item ${this.activeItem === 'view' ? 'active' : ''}" data-item="view">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M10 7C8 7 6 8 4 10C6 12 8 13 10 13C12 13 14 12 16 10C14 8 12 7 10 7Z" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="10" cy="10" r="2" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
          </button>

          <!-- Help / Question -->
          <button class="nav-item ${this.activeItem === 'help' ? 'active' : ''}" data-item="help">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/>
                <path d="M10 14V14.01M10 11C10 9.5 12 9.5 12 8C12 7 11 6 10 6C9 6 8 7 8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </button>

          <!-- Settings -->
          <button class="nav-item ${this.activeItem === 'settings' ? 'active' : ''}" data-item="settings">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="2" stroke="currentColor" stroke-width="1.5"/>
                <path d="M10 3V5M10 15V17M3 10H5M15 10H17M5.5 5.5L6.9 6.9M13.1 13.1L14.5 14.5M14.5 5.5L13.1 6.9M6.9 13.1L5.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </button>

          <!-- Avatar with Badge -->
          <div class="nav-avatar">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%230F62FE' width='40' height='40'/%3E%3Ctext x='50%25' y='50%25' dy='.1em' fill='white' font-family='Arial' font-size='18' text-anchor='middle' dominant-baseline='middle'%3EJC%3C/text%3E%3C/svg%3E" alt="User avatar">
            <span class="nav-badge">12</span>
          </div>
        </div>
      </nav>
    `;
  }

  updateActiveState() {
    const items = this.shadowRoot.querySelectorAll('.nav-item');
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

