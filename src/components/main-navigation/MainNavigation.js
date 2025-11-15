import { SVG_ICONS } from './icons-generated.js';

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
        width: 60px;
        height: 100%;
        background: #111114;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 12px;
        box-sizing: border-box;
        gap: 12px;
        transition: width 0.3s ease;
        overflow: hidden;
      }

      .nav-container:hover {
        width: 210px;
      }
      
      :host([fixed]) .nav-container {
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
      }

      .nav-logo {
        width: 100%;
        height: 36px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 9px;
        cursor: pointer;
        background: transparent;
        flex-shrink: 0;
        padding: 6px;
        overflow: hidden;
      }

      .nav-logo-icon {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .nav-logo-icon svg {
        width: 24.889px;
        height: 24.889px;
      }

      .nav-logo-text {
        font-size: 16px;
        font-weight: 700;
        color: #F9F9FA;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s ease 0.1s;
      }

      .nav-container:hover .nav-logo-text {
        opacity: 1;
      }

      .nav-divider {
        width: 100%;
        height: 1px;
        background: rgba(255, 255, 255, 0.2);
        flex-shrink: 0;
      }

      .nav-scroll-area {
        flex: 1;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        min-height: 0;
      }

      /* Custom scrollbar */
      .nav-scroll-area::-webkit-scrollbar {
        width: 4px;
      }

      .nav-scroll-area::-webkit-scrollbar-track {
        background: transparent;
      }

      .nav-scroll-area::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
      }

      .nav-scroll-area::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      .nav-items {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
      }

      .nav-item {
        width: 100%;
        min-height: 36px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 9px;
        cursor: pointer;
        transition: background 0.2s ease, color 0.2s ease;
        background: transparent;
        border: none;
        padding: 6px;
        flex-shrink: 0;
        overflow: hidden;
      }

      /* Hover effect on items - works in both closed and open states */
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
        position: relative;
        flex-shrink: 0;
      }

      /* Hover effect on individual items - works when nav is open */
      .nav-item:hover .nav-icon {
        color: #F9F9FA;
      }

      .nav-item.active .nav-icon {
        color: #F9F9FA;
      }

      .nav-label {
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 10px;
        line-height: 12px;
        letter-spacing: 0.01px;
        text-transform: uppercase;
        color: #9D9DA0;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s ease 0.1s, color 0.2s ease;
      }

      /* Show labels when nav container is hovered (open state) */
      .nav-container:hover .nav-label {
        opacity: 1;
      }

      /* Hover effect on individual items - change label color */
      .nav-item:hover .nav-label {
        color: #F9F9FA;
      }

      .nav-item.active .nav-label {
        color: #F9F9FA;
        opacity: 1;
      }

      /* Plus Button */
      .nav-add-button {
        width: 100%;
        height: 36px;
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        cursor: pointer;
        background: #0F62FE;
        border: none;
        padding: 3px 6px;
        flex-shrink: 0;
        transition: background 0.2s ease;
        overflow: hidden;
      }

      .nav-add-button:hover {
        background: #0353E9;
      }

      .nav-add-button .nav-icon {
        color: #F9F9FA;
        width: 18px;
        height: 18px;
      }

      .nav-add-button .nav-label {
        color: #F9F9FA;
        opacity: 0;
        transition: opacity 0.3s ease 0.1s;
        text-align: center;
      }

      .nav-container:hover .nav-add-button .nav-label {
        opacity: 1;
      }

      /* Bottom Section */
      .nav-bottom {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12px;
        flex-shrink: 0;
      }

      .nav-bottom-items {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
      }

      .nav-avatar-wrapper {
        width: 100%;
        height: 36px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 9px;
        cursor: pointer;
        background: transparent;
        padding: 6px;
        transition: background 0.2s ease;
        overflow: hidden;
      }

      .nav-avatar-wrapper:hover {
        background: rgba(255, 255, 255, 0.05);
      }

      .nav-avatar {
        width: 24px;
        height: 24px;
        border-radius: 999px;
        overflow: hidden;
        position: relative;
        flex-shrink: 0;
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
        min-width: 14px;
        height: 14px;
        background: #DA2828;
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 700;
        color: #F9F9FA;
        padding: 0 2px;
        line-height: 12px;
      }

      .nav-user-name {
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 10px;
        line-height: 12px;
        letter-spacing: 0.01px;
        text-transform: uppercase;
        color: #9D9DA0;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s ease 0.1s, color 0.2s ease;
        flex: 1;
      }

      .nav-container:hover .nav-user-name {
        opacity: 1;
      }

      /* Hover effect on avatar wrapper - change user name color */
      .nav-avatar-wrapper:hover .nav-user-name {
        color: #F9F9FA;
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
    const avatarPath = new URL('./assets/avatar.png', import.meta.url).href;
    
    return `
      <nav class="nav-container">
        <!-- Logo -->
        <div class="nav-logo" data-item="logo" title="Emplifi">
          <div class="nav-logo-icon">
            ${SVG_ICONS['logo']}
          </div>
          <span class="nav-logo-text">emplifi</span>
        </div>

        <!-- Divider -->
        <div class="nav-divider"></div>

        <!-- Scroll Area with Navigation Items -->
        <div class="nav-scroll-area">
          <div class="nav-items">
            <!-- Command Center -->
            <button class="nav-item ${this.activeItem === 'command-center' ? 'active' : ''}" data-item="command-center" title="Command Center">
              <div class="nav-icon">
                ${SVG_ICONS["command-center"]}
              </div>
              <span class="nav-label">Command Center</span>
            </button>

            <!-- Dashboard -->
            <button class="nav-item ${this.activeItem === 'dashboard' ? 'active' : ''}" data-item="dashboard" title="Dashboard">
              <div class="nav-icon">
                ${SVG_ICONS["dashboard"]}
              </div>
              <span class="nav-label">Dashboard</span>
            </button>

            <!-- Analytics -->
            <button class="nav-item ${this.activeItem === 'analytics' ? 'active' : ''}" data-item="analytics" title="Unified Analytics">
              <div class="nav-icon">
                ${SVG_ICONS["analytics"]}
              </div>
              <span class="nav-label">Unified Analytics</span>
            </button>

            <!-- Publisher -->
            <button class="nav-item ${this.activeItem === 'publisher' ? 'active' : ''}" data-item="publisher" title="Publisher">
              <div class="nav-icon">
                ${SVG_ICONS["publisher"]}
              </div>
              <span class="nav-label">Publisher</span>
            </button>

            <!-- Community -->
            <button class="nav-item ${this.activeItem === 'community' ? 'active' : ''}" data-item="community" title="Community">
              <div class="nav-icon">
                ${SVG_ICONS["community"]}
              </div>
              <span class="nav-label">Community</span>
            </button>

            <!-- Care -->
            <button class="nav-item ${this.activeItem === 'care' ? 'active' : ''}" data-item="care" title="Care">
              <div class="nav-icon">
                ${SVG_ICONS["care"]}
              </div>
              <span class="nav-label">Care</span>
            </button>

            <!-- Content -->
            <button class="nav-item ${this.activeItem === 'content' ? 'active' : ''}" data-item="content" title="Content">
              <div class="nav-icon">
                ${SVG_ICONS["content"]}
              </div>
              <span class="nav-label">Content</span>
            </button>

            <!-- UCG -->
            <button class="nav-item ${this.activeItem === 'ucg' ? 'active' : ''}" data-item="ucg" title="UCG">
              <div class="nav-icon">
                ${SVG_ICONS["ucg"]}
              </div>
              <span class="nav-label">UCG</span>
            </button>

            <!-- Bot -->
            <button class="nav-item ${this.activeItem === 'bot' ? 'active' : ''}" data-item="bot" title="Bot">
              <div class="nav-icon">
                ${SVG_ICONS["bot"]}
              </div>
              <span class="nav-label">Bot</span>
            </button>

            <!-- Ratings & Reviews -->
            <button class="nav-item ${this.activeItem === 'reviews' ? 'active' : ''}" data-item="reviews" title="Rating & Reviews">
              <div class="nav-icon">
                ${SVG_ICONS["reviews"]}
              </div>
              <span class="nav-label">Rating & Reviews</span>
            </button>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="nav-bottom">
          <!-- Add Button -->
          <button class="nav-add-button" data-item="add" title="Add Data Sources">
            <div class="nav-icon">
                ${SVG_ICONS["plus"]}
            </div>
            <span class="nav-label">Add Data Sources</span>
          </button>

          <!-- Divider -->
          <div class="nav-divider"></div>

          <!-- Bottom Items -->
          <div class="nav-bottom-items">
            <!-- Help -->
            <button class="nav-item ${this.activeItem === 'help' ? 'active' : ''}" data-item="help" title="Help">
              <div class="nav-icon">
                ${SVG_ICONS["help"]}
              </div>
              <span class="nav-label">Help</span>
            </button>

            <!-- Settings -->
            <button class="nav-item ${this.activeItem === 'settings' ? 'active' : ''}" data-item="settings" title="Settings">
              <div class="nav-icon">
                ${SVG_ICONS["settings"]}
              </div>
              <span class="nav-label">Settings</span>
            </button>

            <!-- Avatar with Badge -->
            <div class="nav-avatar-wrapper" data-item="profile" title="Profile">
              <div class="nav-avatar">
                <img src="${avatarPath}" alt="User avatar">
                <span class="nav-badge">12</span>
              </div>
              <span class="nav-user-name">Kristin Watson</span>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  updateActiveState() {
    const items = this.shadowRoot.querySelectorAll('[data-item]');
    items.forEach(item => {
      if (item.dataset.item === this.activeItem) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  attachEventListeners() {
    const items = this.shadowRoot.querySelectorAll('[data-item]');
    
    items.forEach(item => {
      item.addEventListener('click', () => {
        const itemId = item.dataset.item;
        
        // Special handling for profile/avatar
        if (itemId === 'profile') {
          this.dispatchEvent(new CustomEvent('avatar-click', {
            bubbles: true,
            composed: true
          }));
          return;
        }
        
        this.activeItem = itemId;
        this.updateActiveState();
        
        this.dispatchEvent(new CustomEvent('nav-change', {
          detail: { item: itemId },
          bubbles: true,
          composed: true
        }));
      });
    });
  }
}

customElements.define('main-navigation', MainNavigation);

export default MainNavigation;
