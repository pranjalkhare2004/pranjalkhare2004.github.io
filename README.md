# 🌐 Pranjal Khare — Personal Portfolio

A modern, responsive portfolio website built with **vanilla HTML, CSS, and JavaScript**. Designed as a clean, professional showcase for Software Engineering roles with focus on backend systems, cybersecurity, and AI.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Rotating Greeting** | Multi-language greeting cycles through 10 languages with smooth fade animation |
| **Typing Animation** | Letter-by-letter animated name reveal in the hero section |
| **Dark/Light Mode** | Theme toggle with system preference detection, `localStorage` persistence, and a sci-fi overlay transition |
| **Resume Side Panel** | Floating button opens a lazy-loaded PDF viewer from the right |
| **Skills Collapse** | Skills grid starts collapsed with a Show More/Less toggle for cleaner scanning |
| **Smooth Scrolling** | CSS `scroll-behavior: smooth` with proper `scroll-padding-top` for fixed navbar |
| **Certifications** | Cards for ML, GenAI (IBM Watsonx), and Cybersecurity (IBM) certifications |
| **Responsive Layout** | Mobile-first with profile image reordering on small screens |
| **Reveal Animations** | Scroll-triggered fade-in using `IntersectionObserver` |

---

## 📁 Project Structure

```
pk-portfolio/
├── index.html              # Single-page HTML (all sections)
├── css/
│   └── index.css           # Design system, components, responsive, dark mode
├── js/
│   └── main.js             # Greeting rotation, theme toggle, skills toggle, resume panel
├── assets/
│   └── images/             # Profile photo, icons
├── public/
│   └── resume/
│       └── pranjal-khare-resume.pdf
└── README.md
```

---

## 🧱 Sections

1. **Hero** — Greeting rotation, animated name, View Projects + GitHub CTAs
2. **About** — Professional summary with profile image
3. **Skills** — Collapsible grid (23 skills across Languages, Frameworks, Tools, Concepts)
4. **Experience** — Timeline with two internships (AlgoUniversity, Braud Gauge)
5. **Projects** — Codeopedia, JobMarshal, WannaCry Malware Analysis
6. **Achievements** — AlgoUniversity Elite, EY Techathon, VIT Best Project, 500+ DSA
7. **Competitive Programming** — LeetCode, Codeforces, GitHub, Hashnode profiles
8. **Blog** — Latest articles from Hashnode
9. **Certifications** — ML, GenAI IBM Watsonx, Cybersecurity IBM
10. **Contact** — Form + social links
11. **Footer** — All external profile links

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Color | `#125BFB` |
| Font | Inter (Google Fonts) |
| Icons | Material Symbols Outlined |
| Dark Background | `#0B0F19` |
| Border Radius | `12px` (lg), `20px` (xl), `999px` (pill) |
| Max Width | `1200px` |

---

## 🚀 Getting Started

### Local Development

```bash
# Clone the repository
git clone https://github.com/pranjalkhare2004/pk-portfolio.git
cd pk-portfolio

# Serve locally (any static server works)
npx -y http-server . -p 8080 -c-1

# Open in browser
# http://localhost:8080
```

### Deployment

This is a static site — deploy to any static hosting provider:

- **GitHub Pages** — Push to `main` branch, enable Pages in repository settings
- **Netlify** — Drag and drop the project folder
- **Vercel** — Import the Git repository

No build step required.

---

## 🌗 Dark Mode

The theme toggle:
- Detects system preference via `prefers-color-scheme`
- Saves choice to `localStorage`
- Shows a brief overlay animation on switch ("Dark Mode 🦉" / "Light Mode ☀️")
- All sections transition smoothly (400ms)

---

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `< 768px` | Single column, image-first hero, hamburger nav |
| `768px – 1023px` | Adjusted spacing, tablet-friendly grids |
| `≥ 1024px` | Two-column hero, full nav bar, larger profile image |

---

## 📄 Resume

Place your resume PDF at:
```
public/resume/pranjal-khare-resume.pdf
```
The floating Resume button (bottom-right) lazy-loads it into a slide-in side panel.

---

## 🔗 External Links

- [LinkedIn](https://www.linkedin.com/in/pranjalkhare16/)
- [GitHub](https://github.com/pranjalkhare2004/)
- [LeetCode](https://leetcode.com/u/pranjal_khare16/)
- [Codeforces](https://codeforces.com/profile/pranjal_khare16)
- [Hashnode](https://pranjalkhare.hashnode.dev/)

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
