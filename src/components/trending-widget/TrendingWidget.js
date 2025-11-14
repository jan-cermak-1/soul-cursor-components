import { trendsData } from './trends-data.js';

class TrendingWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentCountry = 'DE';
    this.isDropdownOpen = false;
    this.countries = [
      { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
      { code: 'AL', name: 'Albania', flag: '🇦🇱' },
      { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
      { code: 'AD', name: 'Andorra', flag: '🇦🇩' },
      { code: 'AO', name: 'Angola', flag: '🇦🇴' },
      { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
      { code: 'AM', name: 'Armenia', flag: '🇦🇲' },
      { code: 'AU', name: 'Australia', flag: '🇦🇺' },
      { code: 'AT', name: 'Austria', flag: '🇦🇹' },
      { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
      { code: 'BS', name: 'Bahamas', flag: '🇧🇸' },
      { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
      { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
      { code: 'BB', name: 'Barbados', flag: '🇧🇧' },
      { code: 'BY', name: 'Belarus', flag: '🇧🇾' },
      { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
      { code: 'BZ', name: 'Belize', flag: '🇧🇿' },
      { code: 'BJ', name: 'Benin', flag: '🇧🇯' },
      { code: 'BT', name: 'Bhutan', flag: '🇧🇹' },
      { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
      { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
      { code: 'BW', name: 'Botswana', flag: '🇧🇼' },
      { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
      { code: 'BN', name: 'Brunei', flag: '🇧🇳' },
      { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
      { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
      { code: 'BI', name: 'Burundi', flag: '🇧🇮' },
      { code: 'KH', name: 'Cambodia', flag: '🇰🇭' },
      { code: 'CM', name: 'Cameroon', flag: '🇨🇲' },
      { code: 'CA', name: 'Canada', flag: '🇨🇦' },
      { code: 'CV', name: 'Cape Verde', flag: '🇨🇻' },
      { code: 'CF', name: 'Central African Republic', flag: '🇨🇫' },
      { code: 'TD', name: 'Chad', flag: '🇹🇩' },
      { code: 'CL', name: 'Chile', flag: '🇨🇱' },
      { code: 'CN', name: 'China', flag: '🇨🇳' },
      { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
      { code: 'KM', name: 'Comoros', flag: '🇰🇲' },
      { code: 'CG', name: 'Congo', flag: '🇨🇬' },
      { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
      { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
      { code: 'CU', name: 'Cuba', flag: '🇨🇺' },
      { code: 'CY', name: 'Cyprus', flag: '🇨🇾' },
      { code: 'CZ', name: 'Czechia', flag: '🇨🇿' },
      { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
      { code: 'DJ', name: 'Djibouti', flag: '🇩🇯' },
      { code: 'DM', name: 'Dominica', flag: '🇩🇲' },
      { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴' },
      { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
      { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
      { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
      { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶' },
      { code: 'ER', name: 'Eritrea', flag: '🇪🇷' },
      { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
      { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
      { code: 'FJ', name: 'Fiji', flag: '🇫🇯' },
      { code: 'FI', name: 'Finland', flag: '🇫🇮' },
      { code: 'FR', name: 'France', flag: '🇫🇷' },
      { code: 'GA', name: 'Gabon', flag: '🇬🇦' },
      { code: 'GM', name: 'Gambia', flag: '🇬🇲' },
      { code: 'GE', name: 'Georgia', flag: '🇬🇪' },
      { code: 'DE', name: 'Germany', flag: '🇩🇪' },
      { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
      { code: 'GR', name: 'Greece', flag: '🇬🇷' },
      { code: 'GD', name: 'Grenada', flag: '🇬🇩' },
      { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
      { code: 'GN', name: 'Guinea', flag: '🇬🇳' },
      { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼' },
      { code: 'GY', name: 'Guyana', flag: '🇬🇾' },
      { code: 'HT', name: 'Haiti', flag: '🇭🇹' },
      { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
      { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
      { code: 'IS', name: 'Iceland', flag: '🇮🇸' },
      { code: 'IN', name: 'India', flag: '🇮🇳' },
      { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
      { code: 'IR', name: 'Iran', flag: '🇮🇷' },
      { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
      { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
      { code: 'IL', name: 'Israel', flag: '🇮🇱' },
      { code: 'IT', name: 'Italy', flag: '🇮🇹' },
      { code: 'JM', name: 'Jamaica', flag: '🇯🇲' },
      { code: 'JP', name: 'Japan', flag: '🇯🇵' },
      { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
      { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
      { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
      { code: 'KI', name: 'Kiribati', flag: '🇰🇮' },
      { code: 'KP', name: 'North Korea', flag: '🇰🇵' },
      { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
      { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
      { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬' },
      { code: 'LA', name: 'Laos', flag: '🇱🇦' },
      { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
      { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
      { code: 'LS', name: 'Lesotho', flag: '🇱🇸' },
      { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
      { code: 'LY', name: 'Libya', flag: '🇱🇾' },
      { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮' },
      { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
      { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
      { code: 'MK', name: 'North Macedonia', flag: '🇲🇰' },
      { code: 'MG', name: 'Madagascar', flag: '🇲🇬' },
      { code: 'MW', name: 'Malawi', flag: '🇲🇼' },
      { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
      { code: 'MV', name: 'Maldives', flag: '🇲🇻' },
      { code: 'ML', name: 'Mali', flag: '🇲🇱' },
      { code: 'MT', name: 'Malta', flag: '🇲🇹' },
      { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭' },
      { code: 'MR', name: 'Mauritania', flag: '🇲🇷' },
      { code: 'MU', name: 'Mauritius', flag: '🇲🇺' },
      { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
      { code: 'FM', name: 'Micronesia', flag: '🇫🇲' },
      { code: 'MD', name: 'Moldova', flag: '🇲🇩' },
      { code: 'MC', name: 'Monaco', flag: '🇲🇨' },
      { code: 'MN', name: 'Mongolia', flag: '🇲🇳' },
      { code: 'ME', name: 'Montenegro', flag: '🇲🇪' },
      { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
      { code: 'MZ', name: 'Mozambique', flag: '🇲🇿' },
      { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
      { code: 'NA', name: 'Namibia', flag: '🇳🇦' },
      { code: 'NR', name: 'Nauru', flag: '🇳🇷' },
      { code: 'NP', name: 'Nepal', flag: '🇳🇵' },
      { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
      { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
      { code: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
      { code: 'NE', name: 'Niger', flag: '🇳🇪' },
      { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
      { code: 'NO', name: 'Norway', flag: '🇳🇴' },
      { code: 'OM', name: 'Oman', flag: '🇴🇲' },
      { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
      { code: 'PW', name: 'Palau', flag: '🇵🇼' },
      { code: 'PS', name: 'Palestine', flag: '🇵🇸' },
      { code: 'PA', name: 'Panama', flag: '🇵🇦' },
      { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬' },
      { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
      { code: 'PE', name: 'Peru', flag: '🇵🇪' },
      { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
      { code: 'PL', name: 'Poland', flag: '🇵🇱' },
      { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
      { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
      { code: 'RO', name: 'Romania', flag: '🇷🇴' },
      { code: 'RU', name: 'Russia', flag: '🇷🇺' },
      { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
      { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
      { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨' },
      { code: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
      { code: 'WS', name: 'Samoa', flag: '🇼🇸' },
      { code: 'SM', name: 'San Marino', flag: '🇸🇲' },
      { code: 'ST', name: 'Sao Tome and Principe', flag: '🇸🇹' },
      { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
      { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
      { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
      { code: 'SC', name: 'Seychelles', flag: '🇸🇨' },
      { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
      { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
      { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
      { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
      { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧' },
      { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
      { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
      { code: 'SS', name: 'South Sudan', flag: '🇸🇸' },
      { code: 'ES', name: 'Spain', flag: '🇪🇸' },
      { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
      { code: 'SD', name: 'Sudan', flag: '🇸🇩' },
      { code: 'SR', name: 'Suriname', flag: '🇸🇷' },
      { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
      { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
      { code: 'SY', name: 'Syria', flag: '🇸🇾' },
      { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
      { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯' },
      { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
      { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
      { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱' },
      { code: 'TG', name: 'Togo', flag: '🇹🇬' },
      { code: 'TO', name: 'Tonga', flag: '🇹🇴' },
      { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹' },
      { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
      { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
      { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲' },
      { code: 'TV', name: 'Tuvalu', flag: '🇹🇻' },
      { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
      { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
      { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
      { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
      { code: 'US', name: 'United States', flag: '🇺🇸' },
      { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
      { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
      { code: 'VU', name: 'Vanuatu', flag: '🇻🇺' },
      { code: 'VA', name: 'Vatican City', flag: '🇻🇦' },
      { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
      { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
      { code: 'YE', name: 'Yemen', flag: '🇾🇪' },
      { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
      { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' }
    ];
  }

  static get observedAttributes() {
    return ['country'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'country' && newValue !== oldValue) {
      this.currentCountry = newValue;
      if (this.shadowRoot.querySelector('.trends-container')) {
        this.renderTrends();
      }
    }
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  // Public API
  setCountry(countryCode) {
    this.setAttribute('country', countryCode);
  }

  getCountry() {
    return this.currentCountry;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
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
        font-family: 'Inter', sans-serif;
      }

      .x-trending-widget {
        width: 456px;
        height: 492px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 
          0px 0px 0.5px 0px rgba(0, 0, 0, 0.3),
          0px 1px 3px 0px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
      }

      .x-trending-widget::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        box-shadow: 
          inset 0px 0.25px 0px 0.25px rgba(0, 0, 0, 0.05),
          inset 0px 0px 1px 0px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        z-index: 10;
      }

      .widget-header {
        display: flex;
        gap: 6px;
        align-items: center;
        padding: 6px 12px;
        flex-shrink: 0;
        position: relative;
        z-index: 3;
      }

      .x-icon {
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .x-icon svg {
        width: 12px;
        height: 12px;
      }

      .header-text {
        display: flex;
        align-items: center;
        gap: 0;
      }

      .header-title {
        font-size: 13px;
        font-weight: 700;
        line-height: 18px;
        color: #24242b;
      }

      .country-select {
        display: flex;
        flex-direction: column;
        gap: 6px;
        overflow: visible;
        position: relative;
      }

      .select-button {
        display: flex;
        gap: 6px;
        align-items: center;
        padding: 6px;
        border-radius: 6px;
        background: transparent;
        border: none;
        cursor: pointer;
        transition: background 0.2s;
        font-family: 'Inter', sans-serif;
      }

      .select-button:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      .select-button.active {
        background: rgba(0, 0, 0, 0.1);
      }

      .select-button span {
        font-size: 13px;
        font-weight: 600;
        line-height: 18px;
        color: #24242b;
      }

      .caret-icon {
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
      }

      .select-button.active .caret-icon {
        transform: rotate(180deg);
      }

      .dropdown-overlay {
        position: fixed;
        inset: 0;
        z-index: 100;
        display: none;
      }

      .dropdown-overlay.active {
        display: block;
      }

      .select-dropdown {
        position: absolute;
        top: 44px;
        left: 109px;
        width: 300px;
        max-height: 400px;
        background: #ffffff;
        border-radius: 6px;
        box-shadow: 
          0px 0px 0.5px 0px rgba(0, 0, 0, 0.3),
          0px 1px 5px 0px rgba(0, 0, 0, 0.2),
          0px 10px 16px 0px rgba(0, 0, 0, 0.1);
        display: none;
        flex-direction: column;
        z-index: 101;
        overflow: hidden;
      }

      .select-dropdown::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        box-shadow: 
          inset 0px 0.25px 0px 0.25px rgba(0, 0, 0, 0.05),
          inset 0px 0px 1px 0px rgba(0, 0, 0, 0.05);
        border-radius: 6px;
      }

      .select-dropdown.active {
        display: flex;
      }

      .dropdown-header {
        padding: 12px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        flex-shrink: 0;
      }

      .search-wrapper {
        position: relative;
      }

      .search-input {
        width: 100%;
        padding: 9px 9px 9px 33px;
        border: 1px solid #003beb;
        border-radius: 6px;
        background: #ffffff;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        line-height: 18px;
        color: #24242b;
        outline: none;
      }

      .search-input::placeholder {
        color: #9d9da0;
      }

      .search-icon {
        position: absolute;
        left: 9px;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        pointer-events: none;
      }

      .dropdown-items {
        flex: 1;
        overflow-y: auto;
        padding: 12px;
      }

      .dropdown-items::-webkit-scrollbar {
        width: 12px;
      }

      .dropdown-items::-webkit-scrollbar-track {
        background: transparent;
      }

      .dropdown-items::-webkit-scrollbar-thumb {
        background: #9d9da0;
        border-radius: 999px;
        border: 3px solid transparent;
        background-clip: content-box;
      }

      .dropdown-item {
        display: flex;
        gap: 6px;
        align-items: center;
        padding: 9px;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.2s;
      }

      .dropdown-item:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      .dropdown-item.selected {
        font-weight: 700;
      }

      .dropdown-item.hidden {
        display: none;
      }

      .flag-icon {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .country-name {
        font-size: 13px;
        line-height: 18px;
        color: #24242b;
        font-weight: 400;
      }

      .dropdown-item.selected .country-name {
        font-weight: 700;
      }

      .trends-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 6px 12px;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        z-index: 1;
      }

      .trends-container::-webkit-scrollbar {
        width: 12px;
      }

      .trends-container::-webkit-scrollbar-track {
        background: transparent;
      }

      .trends-container::-webkit-scrollbar-thumb {
        background: #9d9da0;
        border-radius: 999px;
        border: 3px solid transparent;
        background-clip: content-box;
      }

      .trend-item {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 0 6px;
        border-radius: 8px;
      }

      .trend-content {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }

      .trend-title {
        font-size: 13px;
        font-weight: 700;
        line-height: 18px;
        color: #24242b;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .trend-description {
        font-size: 11px;
        font-weight: 400;
        line-height: 16px;
        color: #505057;
        letter-spacing: 0.005px;
      }

      .trend-keywords {
        font-size: 11px;
        line-height: 16px;
        color: #505057;
        letter-spacing: 0.005px;
      }

      .trend-keywords strong {
        font-weight: 700;
      }

      .trend-divider {
        width: 100%;
        height: 1px;
        background: rgba(0, 0, 0, 0.2);
        margin: 6px 0;
      }
    `;
  }

  getHTML() {
    const country = this.countries.find(c => c.code === this.currentCountry);
    return `
      <div class="x-trending-widget">
        <div class="widget-header">
          <div class="x-icon">
            <svg viewBox="0 0 12 12" fill="#000">
              <path d="M7.09 5.5l3.86-4.5h-.92L6.8 4.84 4.36 1H1l4.06 5.9L1 11.5h.92l3.43-4 2.6 4H11L7.08 5.5h.01zm-1.21 1.42l-.4-.57L2.54 1.85h1.36l2.57 3.68.4.57 3.32 4.75H8.83L5.88 6.92z"/>
            </svg>
          </div>
          <div class="header-text">
            <span class="header-title">Trending in </span>
            <div class="country-select">
              <button class="select-button" id="selectButton">
                <span id="selectedCountry">${country.name}</span>
                <div class="caret-icon">
                  <svg width="7" height="4" viewBox="0 0 7 4" fill="none">
                    <path d="M0.5 0.5L3.5 3.5L6.5 0.5" stroke="#24242b" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div class="dropdown-overlay" id="dropdownOverlay"></div>

        <div class="select-dropdown" id="selectDropdown">
          <div class="dropdown-header">
            <div class="search-wrapper">
              <svg class="search-icon" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M6.5 11.5C9.26142 11.5 11.5 9.26142 11.5 6.5C11.5 3.73858 9.26142 1.5 6.5 1.5C3.73858 1.5 1.5 3.73858 1.5 6.5C1.5 9.26142 3.73858 11.5 6.5 11.5Z" stroke="#24242b" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.5 13.5L10 10" stroke="#24242b" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <input type="text" class="search-input" id="searchInput" placeholder="Search…">
            </div>
          </div>
          <div class="dropdown-items" id="dropdownItems">
            ${this.renderDropdownItems()}
          </div>
        </div>

        <div class="trends-container" id="trendsContainer">
          ${this.renderTrendsHTML()}
        </div>
      </div>
    `;
  }

  renderDropdownItems() {
    return this.countries.map(country => `
      <div class="dropdown-item ${country.code === this.currentCountry ? 'selected' : ''}" data-country="${country.code}">
        <div class="flag-icon">${country.flag}</div>
        <div class="country-name">${country.name}</div>
      </div>
    `).join('');
  }

  renderTrendsHTML() {
    const trends = trendsData[this.currentCountry] || trendsData.DEFAULT || [];
    return trends.map(trend => `
      <div class="trend-item">
        <div class="trend-content">
          <div class="trend-title">${trend.title}</div>
          <div class="trend-description">${trend.description}</div>
        </div>
        <div class="trend-keywords"><strong>Keywords:</strong> ${trend.keywords}</div>
        <div class="trend-divider"></div>
      </div>
    `).join('');
  }

  renderTrends() {
    const container = this.shadowRoot.querySelector('#trendsContainer');
    if (container) {
      container.innerHTML = this.renderTrendsHTML();
    }
  }

  attachEventListeners() {
    const selectButton = this.shadowRoot.querySelector('#selectButton');
    const dropdownOverlay = this.shadowRoot.querySelector('#dropdownOverlay');
    const searchInput = this.shadowRoot.querySelector('#searchInput');
    const dropdownItems = this.shadowRoot.querySelector('#dropdownItems');

    selectButton?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    dropdownOverlay?.addEventListener('click', () => this.closeDropdown());

    searchInput?.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const items = this.shadowRoot.querySelectorAll('.dropdown-item');
      
      items.forEach(item => {
        const countryName = item.querySelector('.country-name').textContent.toLowerCase();
        item.classList.toggle('hidden', !countryName.includes(searchTerm));
      });
    });

    dropdownItems?.addEventListener('click', (e) => {
      const item = e.target.closest('.dropdown-item');
      if (!item) return;

      const countryCode = item.dataset.country;
      const countryName = item.querySelector('.country-name').textContent;

      this.shadowRoot.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');

      this.shadowRoot.querySelector('#selectedCountry').textContent = countryName;
      this.currentCountry = countryCode;

      this.renderTrends();
      this.closeDropdown();
      
      this.dispatchEvent(new CustomEvent('country-change', {
        detail: { country: countryCode },
        bubbles: true,
        composed: true
      }));
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    const dropdown = this.shadowRoot.querySelector('#selectDropdown');
    const overlay = this.shadowRoot.querySelector('#dropdownOverlay');
    const button = this.shadowRoot.querySelector('#selectButton');
    const searchInput = this.shadowRoot.querySelector('#searchInput');

    if (this.isDropdownOpen) {
      dropdown.classList.add('active');
      overlay.classList.add('active');
      button.classList.add('active');
      searchInput.value = '';
      searchInput.focus();
      
      this.shadowRoot.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('hidden');
      });
    } else {
      dropdown.classList.remove('active');
      overlay.classList.remove('active');
      button.classList.remove('active');
    }
  }

  closeDropdown() {
    this.isDropdownOpen = false;
    const dropdown = this.shadowRoot.querySelector('#selectDropdown');
    const overlay = this.shadowRoot.querySelector('#dropdownOverlay');
    const button = this.shadowRoot.querySelector('#selectButton');

    dropdown?.classList.remove('active');
    overlay?.classList.remove('active');
    button?.classList.remove('active');
  }
}

customElements.define('trending-widget', TrendingWidget);

export default TrendingWidget;

