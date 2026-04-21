# 💒 Our Wedding — Reda & Rania

Welcome to the repository of our wedding invitation website. This project is more than just code: it's the digital invitation we designed to celebrate our upcoming union on **May 16, 2026**.

## 📖 The Project
The goal was to create an elegant, intimate, and practical experience for our loved ones. The website allows us to:
- Share our story and the day's schedule.
- Guide our guests with interactive maps (City Hall and Reception Venue).
- Seamlessly manage attendance confirmations (RSVP).
- Share a gallery of our most precious moments.

## 🛠️ Tech Stack
For this project, I prioritized simplicity and performance using a **Vanilla** approach:
- **Languages**: HTML5, CSS3, and JavaScript (ES6+). No heavy frameworks (React/Next.js) are used in production to ensure instant loading on all mobile devices.
- **Design**: A custom "Cream & Gold" design system featuring premium typography (*Cormorant Garamond*, *Montserrat*).
- **Data**: An architecture built around a `config.js` file that centralizes all information (names, dates, locations), making the project easily adaptable.
- **RSVP Logic**: A hybrid integration using `LocalStorage` for local persistence and a **Google Apps Script** API to sync responses directly into a Google Sheet.
- **Animations**: Fluid interactions powered by the *Intersection Observer* API and custom CSS animations.

## ⚙️ Exploration
If you wish to explore the code or reuse it for your own event:
1. Clone the repository.
2. Update `assets/js/config.js` with your specific details.
3. Open `index.html` in your browser.

---
*This project is my digital legacy for this very special day.* 💕
