# 🎨 Soul Components

Modern, reusable Web Components library built with vanilla JavaScript. Framework-agnostic components that work seamlessly with React, Vue, Angular, or any JavaScript framework.

## ✨ Features

- 🚀 **Framework Agnostic** - Works with any framework or vanilla JS
- 🎨 **Shadow DOM** - Fully encapsulated styles, no conflicts
- ⚡ **Zero Dependencies** - Pure Web Components standard
- 📱 **Responsive** - Mobile-first design
- 🌍 **Accessible** - Built with accessibility in mind
- 📦 **Tree-shakeable** - Import only what you need

## 📦 Installation

### NPM

```bash
npm install @soul/components
```

### Yarn

```bash
yarn add @soul/components
```

### PNPM

```bash
pnpm add @soul/components
```

### CDN

```html
<script type="module" src="https://unpkg.com/@soul/components"></script>
```

## 🚀 Quick Start

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import '@soul/components';
  </script>
</head>
<body>
  <trending-widget country="DE"></trending-widget>
</body>
</html>
```

### React

```jsx
import '@soul/components';
import { useRef, useEffect } from 'react';

function App() {
  const widgetRef = useRef(null);
  
  useEffect(() => {
    const widget = widgetRef.current;
    
    widget.addEventListener('country-change', (e) => {
      console.log('Country changed to:', e.detail.country);
    });
  }, []);
  
  return <trending-widget ref={widgetRef} country="US" />;
}
```

### Vue

```vue
<template>
  <trending-widget 
    :country="selectedCountry" 
    @country-change="handleCountryChange"
  />
</template>

<script>
import '@soul/components';

export default {
  data() {
    return {
      selectedCountry: 'DE'
    };
  },
  methods: {
    handleCountryChange(event) {
      console.log('Country:', event.detail.country);
    }
  }
};
</script>
```

### Angular

```typescript
import '@soul/components';

@Component({
  selector: 'app-root',
  template: `<trending-widget [country]="selectedCountry"></trending-widget>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  selectedCountry = 'DE';
}
```

## 📚 Components

### Trending Widget

Display trending topics from social media platform X (formerly Twitter) for any country.

#### Usage

```html
<trending-widget country="DE"></trending-widget>
```

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `country` | `string` | `'DE'` | ISO 3166-1 alpha-2 country code |

#### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `setCountry()` | `countryCode: string` | `void` | Set the current country |
| `getCountry()` | - | `string` | Get the current country code |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `country-change` | `{ country: string }` | Fired when country selection changes |

#### Example with Events

```javascript
const widget = document.querySelector('trending-widget');

widget.addEventListener('country-change', (event) => {
  console.log('New country:', event.detail.country);
});

// Programmatically change country
widget.setCountry('US');
```

#### Supported Countries

The widget supports all 195 countries with:
- 🚩 Country flags
- 🔍 Search functionality
- 📊 Trend data for each country

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/soul-cursor-components.git

# Navigate to the directory
cd soul-cursor-components

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Build demo site
npm run demo:build
```

### Project Structure

```
soul-cursor-components/
├── src/
│   ├── components/
│   │   └── trending-widget/
│   │       ├── TrendingWidget.js
│   │       └── trends-data.js
│   └── index.js
├── demo/
│   └── index.html
├── dist/               # Build output
├── package.json
├── vite.config.js
└── README.md
```

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Designed with [Figma](https://www.figma.com/)
- Icons from [Heroicons](https://heroicons.com/)

## 🔗 Links

- [Documentation](https://yourusername.github.io/soul-cursor-components/)
- [NPM Package](https://www.npmjs.com/package/@soul/components)
- [GitHub Repository](https://github.com/yourusername/soul-cursor-components)
- [Issue Tracker](https://github.com/yourusername/soul-cursor-components/issues)

---

Made with ❤️ by Soul Team

