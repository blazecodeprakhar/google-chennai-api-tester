# 🌟 Chennai AI Tester
### *The Ultimate Gemini 2.0 Flash Testing Suite*

[![GitHub Stars](https://img.shields.io/github/stars/blazecodeprakhar/google-chennai-api-tester?style=for-the-badge&color=blue)](https://github.com/blazecodeprakhar/google-chennai-api-tester)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Pure HTML/CSS](https://img.shields.io/badge/Build-Pure_HTML%2FCSS-orange?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/HTML)

Chennai AI Tester is a **premium, zero-dependency** web interface designed for high-performance interaction with the Google Gemini 2.0 API. Built with a focus on speed, privacy, and aesthetic excellence, it allows you to test AI prompts instantly without any local setup or installation.

![Chennai AI Mockup](assets/mockup.png)

---

## ✨ Premium Features

- **🚀 Instant Launch**: No `npm install`, no `node_modules`. Just open `index.html`.
- **🎨 Glassmorphism Design**: A sleek, modern UI with `backdrop-filter` effects and smooth transitions.
- **🌗 Smart Dark Mode**: Seamlessly toggle between light and dark themes with system preference detection.
- **🔒 Privacy Centric**: Your API keys are stored only in your browser's `localStorage`. No server ever sees your data.
- **⚡ Optimized for Gemini 2.0**: Pre-configured to leverage the latest high-speed Gemini Flash models.
- **📱 Fully Responsive**: Works perfectly on Desktops, Tablets, and Smartphones.

---

## 🛠️ How It Works

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant GoogleAPI
    
    User->>Browser: Enters API Key & Message
    Browser->>Browser: Stores Key in LocalStorage
    Browser->>GoogleAPI: POST /v1beta/models/gemini-2.0-flash
    GoogleAPI-->>Browser: AI JSON Response
    Browser->>User: Renders Beautiful Markdown/Text
```

---

## 🚀 Getting Started

### 1. Installation
Simply clone the repository and you are ready to go:
```bash
git clone https://github.com/blazecodeprakhar/google-chennai-api-tester.git
```

### 2. Usage
- Open `index.html` in your favorite browser (Chrome, Edge, Brave, Safari).
- Click the **Settings** icon.
- Paste your **Google AI Studio Key** (Get one [here](https://aistudio.google.com/)).
- Start chatting!

### 3. Deploy to GitHub Pages
This project is **built for GitHub Pages**. 
1. Push to your repo.
2. Go to `Settings > Pages`.
3. Enable it for the `main` branch.
4. Your site is live!

---

## 🛠️ Tech Stack
- **Structure**: Semantic [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Modern Utility-first CSS)
- **Icons**: [Lucide Icons](https://lucide.dev/) (Clean Vector Icons)
- **Engine**: Vanilla JavaScript (ES6+)
- **API**: Google Generative AI (Gemini)

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with precision by <b>Blazecode Prakhar</b></p>
  <a href="https://github.com/blazecodeprakhar">
    <img src="https://img.shields.io/badge/GitHub-Profile-181717?style=flat-square&logo=github" alt="GitHub">
  </a>
</div>
