# PRAJNA 2026 — Official Fest Website

> **Think. Create. Celebrate.**  
> Official website for PRAJNA — the Annual State-Level Intercollegiate Fest organized by Poornaprajna College (Autonomous), Udupi.

---

## 🌐 Live Demo

🔗 [View Live Site](#) *(replace with your Vercel URL)*

---

## 📖 About

PRAJNA is the third edition of the annual state-level intercollegiate fest at Poornaprajna College (Autonomous), Udupi. Rooted in the concept of *Prajna* — wisdom and awareness — and inspired by the life and philosophy of Lord Krishna, the fest brings together students from institutions across Karnataka in a spirit of intellectual challenge, creativity, and cultural celebration.

The fest spans **two days**:
- **Day 1 (April 6)** — Academic Events across multiple departments
- **Day 2 (April 7)** — Cultural Events featuring music, dance, and artistic performances

---

## ✨ Features

- **Hero Section** — Animated particle background, live countdown timer, and event CTA buttons
- **Explore Section** — Fest overview and general participation guidelines with brochure download
- **Events Section** — Tabbed view of Academic and Cultural events with expandable detail modals, organized by department
- **Registration Form** — Dynamic form with per-event participant fields, real-time fee calculation, Google Sheets integration, and WhatsApp redirect for payment confirmation
- **Gallery** — Visual highlights from PRAJNA 2024 and 2025
- **About Section** — College history and background
- **Fully Responsive** — Mobile hamburger menu, fluid layouts across all screen sizes
- **Smooth UX** — Scroll-reveal animations, sticky navbar, scroll-to-top button, and event popup modals

---

## 🗂️ Project Structure

```
prajna-2026/
│
├── index.html          # Main page (all sections)
├── style.css           # All styles (custom CSS)
├── script.js           # All interactivity (vanilla JS)
│
├── Prajna-2024.html    # Gallery page – PRAJNA 2024
├── Prajna-2025.html    # Gallery page – PRAJNA 2025
│
└── Images/             # All images and assets
    ├── favicon.png
    ├── clg-logo.png
    ├── hero-logo2.png
    ├── logo2024.png
    ├── logo2025.png
    └── [event images...]
```

---

## 🧰 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Markup     | HTML5                             |
| Styling    | CSS3 (custom, no frameworks)      |
| Logic      | Vanilla JavaScript (ES6+)         |
| Fonts       | Google Fonts (Cinzel, Cormorant Garamond, Space Mono) |
| Icons      | Font Awesome 6                    |
| Backend    | Google Apps Script (form submissions → Google Sheets) |
| Hosting    | Vercel                            |
| Version Control | GitHub                       |

---

## 🎪 Events Overview

### Academic Events (Day 1 — April 6)

Organized across departments:

| Department | Events |
|---|---|
| Computer Science | Anime Whiz, Secret Vault, BGMI, Tech Symposium Quiz |
| Commerce | Shark Tank, Business Quiz, Best Mgt Team, Best Entrepreneur, Taxation Consultant Simulation, Best Event Mgt |
| Science | Vanaspati Shodha, Elemental Encounters, Reaction Race, Zoological Specimen Rangoli, Physicon |
| Arts | Mock Press, Quiz Competition, Story Writing, Turn Coat, Vichaar Yudh, Antakshari |
| Sanskrit | Sanskrit Elocution, Sanskrit General Quiz |
| Fine Arts | Poster Making, Collage (AI), Collage Making, Padachitra |
| Library | Book Hunt |
| Media | Documentary Making |
| Management | Al-Go-Rhythm, Data Interpretation, Skit |
| Kannada | Hani Hani Kavithe |

### Cultural Events (Day 2 — April 7)

| Event | Type |
|---|---|
| Nrithya Laasya | Classical/Folk Dance |
| Akarshati | Solo Performance |
| Vridavana Vaibhava | Group Cultural |
| Swaranjali | Music |
| Jagruti | Group Dance |
| Ramakathamritam | Narrative Arts |

---

## 🚀 Getting Started

No build tools or dependencies required. This is a pure HTML/CSS/JS project.

### Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/prajna-2026.git

# Open in browser
cd prajna-2026
open index.html
```

Or use a local dev server for best results:

```bash
# Using VS Code Live Server extension (recommended)
# Right-click index.html → "Open with Live Server"

# Or using Python
python -m http.server 3000
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## 📋 Registration Flow

1. Participant fills in their name, college, email, and phone
2. Clicks **Select Events** to expand the event list
3. Checks the events they want to register for — participant fields appear dynamically
4. Total fee is calculated automatically
5. On submit, data is sent to **Google Sheets** via Google Apps Script
6. Participant is redirected to **WhatsApp** for payment and confirmation

---

## 🤝 Contributing

This project was built by students for a real college event. If you'd like to contribute improvements or adapt it for your own fest:

1. Fork the repository
2. Create a new branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m "Add your feature"`
4. Push to the branch — `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Authors

Built with ❤️ by students of Poornaprajna College, Udupi.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🏫 About the College

**Poornaprajna College (Autonomous), Udupi** was founded in 1960 and is run by the Udupi Shree Adamaru Matha Education Council. Located in the heart of Udupi city, it is 1 km from the Udupi Bus Stand and 4 km from the Udupi Railway Station.

🌐 [ppc.ac.in](https://ppc.ac.in) &nbsp;|&nbsp;
📸 [Instagram](https://www.instagram.com/ppcudupi) &nbsp;|&nbsp;
▶️ [YouTube](https://youtube.com/@poornaprajnacollegeudupi8976) &nbsp;|&nbsp;
💼 [LinkedIn](https://www.linkedin.com/school/ppcudupi/)