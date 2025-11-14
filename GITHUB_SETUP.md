# 🚀 GitHub Setup Guide

Tento návod vás provede nastavením projektu na GitHubu a publikací na NPM.

## 1. Vytvoření GitHub Repository

### Krok 1: Vytvořte nový repository na GitHubu

1. Jděte na [github.com](https://github.com)
2. Klikněte na "+" v pravém horním rohu → "New repository"
3. Nazvěte ho: `soul-cursor-components`
4. Ponechte ho jako **Public** (důležité pro GitHub Pages)
5. **NEPOVOLUJTE** "Initialize with README" (už máme lokální repository)
6. Klikněte na "Create repository"

### Krok 2: Propojte lokální repository s GitHub

```bash
cd /Users/jancermak/dev/soul-cursor-components

# Přidejte GitHub jako remote (nahraďte 'yourusername' vaším GitHub uživatelským jménem)
git remote add origin https://github.com/yourusername/soul-cursor-components.git

# Nahrajte kód na GitHub
git push -u origin main
```

## 2. Nastavení GitHub Pages

### Krok 1: Povolte GitHub Pages

1. Jděte do vašeho repository na GitHubu
2. Klikněte na **Settings** (Nastavení)
3. V levém menu klikněte na **Pages**
4. V sekci **Build and deployment**:
   - Source: **GitHub Actions**
5. Uložte

### Krok 2: Spuštění GitHub Actions

Po prvním push do `main` větve se automaticky spustí GitHub Action, která:
- Sestaví projekt (`npm run build`)
- Sestaví demo stránku (`npm run demo:build`)
- Nahraje ji na GitHub Pages

Demo stránka bude dostupná na:
```
https://yourusername.github.io/soul-cursor-components/
```

## 3. Publikace na NPM (Volitelné)

### Krok 1: Vytvoření NPM účtu

Pokud ještě nemáte NPM účet:
1. Jděte na [npmjs.com](https://www.npmjs.com/)
2. Zaregistrujte se

### Krok 2: Přihlášení

```bash
npm login
```

### Krok 3: Aktualizace package.json

Před publikací aktualizujte `package.json`:

```json
{
  "name": "@yourusername/components",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/soul-cursor-components.git"
  },
  "homepage": "https://yourusername.github.io/soul-cursor-components/"
}
```

### Krok 4: Publikace

```bash
# První publikace
npm publish --access public

# Další verze (po změnách)
npm version patch  # 1.0.0 → 1.0.1
npm publish
```

## 4. Sdílení s kolegy

### Instalace přes NPM (po publikaci)

```bash
npm install @yourusername/components
```

### Instalace přímo z GitHubu (před publikací na NPM)

```bash
npm install git+https://github.com/yourusername/soul-cursor-components.git
```

### Import z CDN

```html
<script type="module" src="https://unpkg.com/@yourusername/components"></script>
```

## 5. Kontinuální vývoj

### Přidání nových komponent

1. Vytvořte nový adresář v `src/components/`
2. Vytvořte Web Component soubor
3. Exportujte ji v `src/index.js`
4. Přidejte dokumentaci do `demo/index.html`
5. Commitněte a pushněte:

```bash
git add .
git commit -m "feat: Add new component"
git push
```

### Aktualizace verze

```bash
# Patch (1.0.0 → 1.0.1) - Malé opravy
npm version patch

# Minor (1.0.0 → 1.1.0) - Nové funkce
npm version minor

# Major (1.0.0 → 2.0.0) - Zásadní změny
npm version major

# Push včetně tagů
git push && git push --tags

# Publikace na NPM
npm publish
```

## 6. Ochrana Main větve (Doporučeno)

1. Jděte do Settings → Branches
2. Přidejte branch protection rule pro `main`
3. Zaškrtněte:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging

## 7. Užitečné příkazy

```bash
# Lokální vývoj
npm run dev              # Vývoj knihovny
npm run demo:dev         # Vývoj demo stránky

# Build
npm run build            # Build knihovny
npm run demo:build       # Build demo stránky

# Preview
npm run preview          # Preview produkčního buildu
```

## 8. Checklist před publikací

- [ ] Aktualizujte `yourusername` na své GitHub uživatelské jméno
- [ ] Aktualizujte `package.json` (name, repository, homepage)
- [ ] Vytvořte GitHub repository
- [ ] Pushněte kód na GitHub
- [ ] Nastavte GitHub Pages
- [ ] Otestujte demo stránku
- [ ] (Volitelné) Publikujte na NPM
- [ ] Sdílejte URL s kolegy

## 9. Kontakt a podpora

- **GitHub Issues**: [github.com/yourusername/soul-cursor-components/issues](https://github.com/yourusername/soul-cursor-components/issues)
- **Demo**: [yourusername.github.io/soul-cursor-components](https://yourusername.github.io/soul-cursor-components/)
- **NPM**: [npmjs.com/package/@yourusername/components](https://www.npmjs.com/package/@yourusername/components)

---

🎉 **Hotovo!** Vaše komponenty jsou nyní sdílené a připravené k použití!

