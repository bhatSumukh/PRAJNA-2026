/* ─── PARTICLES ─── */
const heroBg = document.getElementById("heroBg");
const colors = ["rgba(201,168,76,", "rgba(212,82,26,", "rgba(26,124,124,"];
for (let i = 0; i < 25; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  const size = Math.random() * 4 + 1;
  const color = colors[Math.floor(Math.random() * colors.length)];
  p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      background:${color}0.7)};
      animation-duration:${8 + Math.random() * 12}s;
      animation-delay:${Math.random() * 10}s;
      box-shadow: 0 0 ${size * 3}px ${color}0.5)};
    `;
  heroBg.appendChild(p);
}

/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
  document
    .getElementById("scrollTop")
    .classList.toggle("visible", window.scrollY > 400);
});

/* ─── MOBILE MENU ─── */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("open");
  document.body.style.overflow = mobileMenu.classList.contains("open")
    ? "hidden"
    : "";
});
function closeMobile() {
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
}

/* ─── EVENTS TAB ─── */
function showTab(id, btn) {
  document
    .querySelectorAll(".events-panel")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".toggle-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  btn.classList.add("active");
}

/* ─── SCROLL TO TOP ─── */
document.getElementById("scrollTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ─── REVEAL ON SCROLL ─── */
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay =
          entry.target.closest(".events-panel") ||
          entry.target.closest(".gallery-grid")
            ? Array.from(entry.target.parentElement.children).indexOf(
                entry.target,
              ) * 80
            : 0;
        setTimeout(() => entry.target.classList.add("visible"), delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);
revealEls.forEach((el) => observer.observe(el));

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  Logger.log(e.parameter.totalFee);

  sheet.appendRow([
    e.parameter.name,
    e.parameter.phone,
    e.parameter.email,
    e.parameter.college,
    e.parameter.event,
    e.parameter.totalFee,
    new Date(),

    
  ]);

  return ContentService.createTextOutput("Success");
}

let eventSbtn = document.getElementById("event-selector");
let eventContainer = document.getElementById("event-selector-container");

eventSbtn.addEventListener("click", () => {
  eventContainer.style.display = "block";
});
