# ⚡ Quick Start - Zprovoznění GitHub Pages

## Krok 1: Vytvoření GitHub Repository

1. Otevřete [github.com/new](https://github.com/new)
2. **Repository name**: `soul-cursor-components`
3. **Visibility**: Public ✅
4. **NEZAŠKRTÁVEJTE** "Add a README file"
5. Klikněte **"Create repository"**

## Krok 2: Upload kódu na GitHub

Zkopírujte a spusťte tyto příkazy (nahraďte `VÁŠ-USERNAME` vaším GitHub uživatelským jménem):

```bash
cd /Users/jancermak/dev/soul-cursor-components

# Přidejte GitHub jako remote
git remote add origin https://github.com/VÁŠ-USERNAME/soul-cursor-components.git

# Nahrajte kód
git push -u origin main
```

## Krok 3: Aktivace GitHub Pages

1. Jděte na vaše repository: `https://github.com/VÁŠ-USERNAME/soul-cursor-components`
2. Klikněte na **Settings** (nastavení)
3. V levém menu klikněte na **Pages**
4. V sekci "Build and deployment":
   - **Source**: Změňte na **GitHub Actions**
5. Hotovo! ✅

## Krok 4: Čekání na deploy (2-3 minuty)

1. Jděte na **Actions** tab ve vašem repository
2. Uvidíte běžící workflow "Deploy Demo to GitHub Pages"
3. Počkejte až bude zelený ✅

## 🎉 Hotovo!

Vaše demo stránka bude dostupná na:
```
https://VÁŠ-USERNAME.github.io/soul-cursor-components/
```

---

## 🔧 Alternativa: Pokud nemáte GitHub účet

Můžete použít jiné služby jako Netlify nebo Vercel:

### Netlify (jednodušší):
1. Jděte na [netlify.com](https://www.netlify.com/)
2. Přihlaste se přes GitHub
3. Drag & drop složku `dist-demo` (po buildu)

### Vercel:
1. Jděte na [vercel.com](https://vercel.com/)
2. Přihlaste se přes GitHub
3. Import projektu z GitHubu

