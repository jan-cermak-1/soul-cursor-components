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
        align-items: center;
        padding: 12px;
        box-sizing: border-box;
        gap: 12px;
      }
      
      :host([fixed]) .nav-container {
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
      }

      .nav-logo {
        width: 36px;
        height: 36px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: transparent;
        flex-shrink: 0;
      }

      .nav-logo img {
        width: 24.889px;
        height: 24.889px;
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
        padding: 6px;
        flex-shrink: 0;
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
        position: relative;
      }

      .nav-item:hover .nav-icon {
        color: #F9F9FA;
      }

      .nav-item.active .nav-icon {
        color: #F9F9FA;
      }

      /* Plus Button */
      .nav-add-button {
        width: 100%;
        height: 36px;
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: #0F62FE;
        border: none;
        padding: 3px;
        flex-shrink: 0;
        transition: background 0.2s ease;
      }

      .nav-add-button:hover {
        background: #0353E9;
      }

      .nav-add-button .nav-icon {
        color: #F9F9FA;
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
        width: 36px;
        height: 36px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: transparent;
        padding: 6px;
        transition: background 0.2s ease;
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

      /* SVG Icons */
      svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
      }
    `;
  }

  getHTML() {
    // Avatar image as data URL
    const avatarDataUrl = 'data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABkAGQDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAABAUCAwYBAAf/xAA7EAACAQMDAgQDBgQFBAMAAAABAgMABBEFEiExQQYTUWEicYEUMpGhscEHI0LRUmLh8PEVcoKSM0Oy/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAhEQACAgICAgMBAAAAAAAAAAAAAQIRAyESMUFRBBMiYf/aAAwDAQACEQMRAD8A+P0UUUhBRRRSEFFFFIQUUUUhBRRRSEFFFFIQUUUUhBRRRSEFFFFIQUUUUhBRRRSEFFFFIQUUUUhBRRRSEFFFFIQUUUUhH/9k=';
    
    return `
      <nav class="nav-container">
        <!-- Logo -->
        <div class="nav-logo" data-item="logo" title="Emplifi">
          <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 0C5.6 0 0 5.6 0 12.5S5.6 25 12.5 25 25 19.4 25 12.5 19.4 0 12.5 0z" fill="#000066"/>
          </svg>
        </div>

        <!-- Divider -->
        <div class="nav-divider"></div>

        <!-- Scroll Area with Navigation Items -->
        <div class="nav-scroll-area">
          <div class="nav-items">
            <!-- Command Center -->
            <button class="nav-item ${this.activeItem === 'command-center' ? 'active' : ''}" data-item="command-center" title="Command Center">
              <div class="nav-icon">
                <svg viewBox="0 0 18 18" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2C0 0.89543 0.895431 0 2 0H16C17.1046 0 18 0.895431 18 2V16C18 17.1046 17.1046 18 16 18H2C0.89543 18 0 17.1046 0 16V2ZM16 9.00146C16 12.8675 12.866 16.0015 9 16.0015C5.13401 16.0015 2 12.8675 2 9.00146C2 5.13547 5.13401 2.00146 9 2.00146C12.866 2.00146 16 5.13547 16 9.00146Z" fill="currentColor"/>
                  <path d="M5.80682 11.8538C6.14963 12.0053 6.54262 12.081 6.9858 12.081C7.44035 12.081 7.84281 12.0072 8.19319 11.8594C8.54546 11.7098 8.82008 11.5053 9.01705 11.2458C9.21591 10.9844 9.31535 10.6852 9.31535 10.3481C9.31724 9.99012 9.20266 9.69183 8.9716 9.45319C8.74243 9.21456 8.40247 9.06872 7.95171 9.01569V8.97024C8.28883 8.92099 8.5644 8.79031 8.77841 8.57819C8.99432 8.36607 9.10133 8.09618 9.09944 7.76853C9.09944 7.45224 9.01137 7.1691 8.83523 6.9191C8.6591 6.66721 8.41288 6.46834 8.0966 6.32251C7.78031 6.17668 7.41383 6.10376 6.99716 6.10376C6.5786 6.10376 6.2055 6.17857 5.87785 6.32819C5.55209 6.47781 5.29451 6.6852 5.10512 6.95035C4.91572 7.21361 4.81913 7.51853 4.81535 7.86512H6.1591C6.16288 7.73255 6.20171 7.61607 6.27557 7.51569C6.34944 7.41531 6.44887 7.33766 6.57387 7.28274C6.70076 7.22781 6.84186 7.20035 6.99716 7.20035C7.14489 7.20035 7.27463 7.22781 7.38637 7.28274C7.5 7.33766 7.58807 7.41531 7.65057 7.51569C7.71497 7.61418 7.74622 7.72876 7.74432 7.85944C7.74622 7.99391 7.71023 8.11323 7.63637 8.2174C7.5625 8.31967 7.45928 8.39921 7.32671 8.45603C7.19603 8.51285 7.04451 8.54126 6.87216 8.54126H6.30682V9.54126H6.87216C7.06913 9.54126 7.23959 9.57062 7.38353 9.62933C7.52936 9.68804 7.64205 9.77043 7.7216 9.87649C7.80114 9.98255 7.83997 10.1038 7.83807 10.2401C7.83997 10.3765 7.80493 10.4977 7.73296 10.6038C7.66099 10.7079 7.56061 10.7903 7.43182 10.8509C7.30493 10.9096 7.15815 10.939 6.99148 10.939C6.82481 10.939 6.67614 10.9115 6.54546 10.8566C6.41478 10.8017 6.31156 10.7259 6.2358 10.6293C6.16004 10.5308 6.11932 10.4182 6.11364 10.2913H4.69887C4.70266 10.6416 4.80303 10.9513 5 11.2202C5.19697 11.4892 5.46591 11.7004 5.80682 11.8538Z" fill="#111114"/>
                  <path d="M12.799 12.0015V6.18331H11.495L10.0604 7.07535V8.29126L11.3615 7.49581H11.3956V12.0015H12.799Z" fill="#111114"/>
                </svg>
              </div>
            </button>

            <!-- Dashboard -->
            <button class="nav-item ${this.activeItem === 'dashboard' ? 'active' : ''}" data-item="dashboard" title="Dashboard">
              <div class="nav-icon">
                <svg viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="2" width="16" height="3" rx="1" fill="currentColor"/>
                  <rect x="2" y="8.5" width="7" height="9.5" rx="1" fill="currentColor"/>
                  <rect x="11" y="8.5" width="7" height="9.5" rx="1" fill="currentColor"/>
                </svg>
              </div>
            </button>

            <!-- Analytics -->
            <button class="nav-item ${this.activeItem === 'analytics' ? 'active' : ''}" data-item="analytics" title="Unified Analytics">
              <div class="nav-icon">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M2 18V4C2 2.89543 2.89543 2 4 2H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M5.5 13L8.5 10L11 12.5L16 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="5.5" cy="13" r="1.5" fill="currentColor"/>
                  <circle cx="8.5" cy="10" r="1.5" fill="currentColor"/>
                  <circle cx="11" cy="12.5" r="1.5" fill="currentColor"/>
                  <circle cx="16" cy="6" r="1.5" fill="currentColor"/>
                </svg>
              </div>
            </button>

            <!-- Publisher -->
            <button class="nav-item ${this.activeItem === 'publisher' ? 'active' : ''}" data-item="publisher" title="Publisher">
              <div class="nav-icon">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M4 4H16V16H4L4 4Z" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M8 4V16" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M4 8H16" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M4 12H16" stroke="currentColor" stroke-width="1.5"/>
                </svg>
              </div>
            </button>

            <!-- Community -->
            <button class="nav-item ${this.activeItem === 'community' ? 'active' : ''}" data-item="community" title="Community">
              <div class="nav-icon">
                <svg viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="6" r="3" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="5" cy="11" r="2" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="15" cy="11" r="2" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M10 9C12 9 14 10.5 14 13V17H6V13C6 10.5 8 9 10 9Z" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M4 15C3.5 14 3 13 3 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M16 15C16.5 14 17 13 17 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
            </button>

            <!-- Care -->
            <button class="nav-item ${this.activeItem === 'care' ? 'active' : ''}" data-item="care" title="Care">
              <div class="nav-icon">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M10 17L4 11C2.5 9.5 2 8 2 6.5C2 4 4 2 6.5 2C8 2 9 2.5 10 3.5C11 2.5 12 2 13.5 2C16 2 18 4 18 6.5C18 8 17.5 9.5 16 11L10 17Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
              </div>
            </button>

            <!-- Content -->
            <button class="nav-item ${this.activeItem === 'content' ? 'active' : ''}" data-item="content" title="Content">
              <div class="nav-icon">
                <svg viewBox="0 0 18 20" fill="none">
                  <path d="M2 2H12L16 6V18H2V2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                  <path d="M12 2V6H16" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                  <path d="M5 10H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M5 13H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
            </button>

            <!-- UCG -->
            <button class="nav-item ${this.activeItem === 'ucg' ? 'active' : ''}" data-item="ucg" title="UCG">
              <div class="nav-icon">
                <svg viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="6" r="3" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M4 17V14C4 12 6 11 8 11H12C14 11 16 12 16 14V17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M7 17L8 14M13 17L12 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
            </button>

            <!-- Bot -->
            <button class="nav-item ${this.activeItem === 'bot' ? 'active' : ''}" data-item="bot" title="Bot">
              <div class="nav-icon">
                <svg viewBox="0 0 20 18" fill="none">
                  <rect x="4" y="4" width="12" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="7.5" cy="8.5" r="1" fill="currentColor"/>
                  <circle cx="12.5" cy="8.5" r="1" fill="currentColor"/>
                  <path d="M10 1V4M7 1H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M4 10H2M18 10H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
            </button>

            <!-- Ratings & Reviews -->
            <button class="nav-item ${this.activeItem === 'reviews' ? 'active' : ''}" data-item="reviews" title="Rating & Reviews">
              <div class="nav-icon">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.39 7.09L18 7.91L14 11.79L14.82 17.36L10 14.77L5.18 17.36L6 11.79L2 7.91L7.61 7.09L10 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                  <path d="M10 7V10L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </button>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="nav-bottom">
          <!-- Add Button -->
          <button class="nav-add-button" data-item="add" title="Add">
            <div class="nav-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
          </button>

          <!-- Divider -->
          <div class="nav-divider"></div>

          <!-- Bottom Items -->
          <div class="nav-bottom-items">
            <!-- Help -->
            <button class="nav-item ${this.activeItem === 'help' ? 'active' : ''}" data-item="help" title="Help">
              <div class="nav-icon">
                <svg viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M10 14V14.01M10 11.5C10 10 12 10 12 8.5C12 7.5 11 6.5 10 6.5C9 6.5 8 7.5 8 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
            </button>

            <!-- Settings -->
            <button class="nav-item ${this.activeItem === 'settings' ? 'active' : ''}" data-item="settings" title="Settings">
              <div class="nav-icon">
                <svg viewBox="0 0 20 20" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7289 12.3719L18.7875 11.5601C18.5078 11.3188 18.3001 10.8254 18.3272 10.4644L18.3291 9.53379C18.3029 9.17188 18.5096 8.67937 18.7894 8.4381L19.7289 7.62812C20.0086 7.38685 20.0844 6.93243 19.8973 6.61859L17.9698 3.38322C17.7826 3.06939 17.3391 2.90522 16.9835 3.0195L15.7896 3.40317C15.435 3.51746 14.8904 3.4449 14.5797 3.24172L13.7479 2.78005C13.412 2.62132 13.0751 2.20045 12.9994 1.84581L12.7449 0.645805C12.67 0.291156 12.3023 0 11.928 0H8.07388C7.6996 0 7.33188 0.291156 7.25609 0.645805L7.00064 1.84127C6.92485 2.19683 6.588 2.61678 6.25209 2.77642L5.42213 3.24082C5.11148 3.44399 4.56784 3.51565 4.21228 3.40136L3.01647 3.01769C2.66091 2.9034 2.21739 3.06757 2.03025 3.38141L0.103661 6.61678C-0.0834769 6.93061 -0.00768595 7.38503 0.27115 7.6263L1.21246 8.4381C1.49223 8.67937 1.69902 9.17279 1.67282 9.53469L1.67001 10.4644C1.69621 10.8263 1.48848 11.3197 1.20965 11.561L0.27115 12.3719C-0.00862164 12.6132 -0.0844126 13.0676 0.102726 13.3814L2.03025 16.6168C2.21739 16.9306 2.66091 17.0939 3.01553 16.9805L4.20854 16.5977C4.56317 16.4834 5.10774 16.556 5.41839 16.7592L6.25022 17.2209C6.58707 17.3796 6.92392 17.8005 6.99971 18.156L7.25515 19.3542C7.33094 19.7088 7.69867 20 8.07294 20H11.9271C12.3013 20 12.6691 19.7098 12.7449 19.3542L13.0003 18.1587C13.0761 17.8032 13.4129 17.3832 13.7488 17.2236L14.5788 16.7592C14.8895 16.5569 15.4331 16.4844 15.7887 16.5986L16.9845 16.9823C17.34 17.0957 17.7835 16.9324 17.9698 16.6186L19.8973 13.3832C20.0844 13.0676 20.0086 12.6132 19.7289 12.3719ZM10.0005 15.61C6.80415 15.61 4.21322 13.0975 4.21322 9.99909C4.21322 6.90068 6.80415 4.38821 10.0005 4.38821C13.1968 4.38821 15.7877 6.89977 15.7877 9.99909C15.7877 13.0984 13.1968 15.61 10.0005 15.61Z" fill="currentColor"/>
                </svg>
              </div>
            </button>

            <!-- Avatar with Badge -->
            <div class="nav-avatar-wrapper" data-item="profile" title="Profile">
              <div class="nav-avatar">
                <img src="${avatarDataUrl}" alt="User avatar">
                <span class="nav-badge">12</span>
              </div>
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
