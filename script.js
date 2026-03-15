/* ═══════════════════════════════════════════════════════════════════
   PRAJNA 2026 — script.js  (single merged file)
   ═══════════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────────────────
   1. HERO PARTICLES
   ───────────────────────────────────────────────────────────────── */
(function initParticles() {
  const heroBg = document.getElementById("heroBg");
  if (!heroBg) return;
  const colors = ["rgba(201,168,76,", "rgba(212,82,26,", "rgba(26,124,124,"];
  for (let i = 0; i < 25; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size  = Math.random() * 4 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      background:${color}0.7);
      animation-duration:${8 + Math.random() * 12}s;
      animation-delay:${Math.random() * 10}s;
      box-shadow:0 0 ${size * 3}px ${color}0.5);
    `;
    heroBg.appendChild(p);
  }
})();


/* ─────────────────────────────────────────────────────────────────
   2. NAVBAR SCROLL BEHAVIOUR
   ───────────────────────────────────────────────────────────────── */
const navbar       = document.getElementById("navbar");
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (navbar)       navbar.classList.toggle("scrolled", window.scrollY > 60);
  if (scrollTopBtn) scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
});


/* ─────────────────────────────────────────────────────────────────
   3. MOBILE MENU TOGGLE
   ───────────────────────────────────────────────────────────────── */
const hamburger  = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("open");
    document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
  });
}

function closeMobile() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
}


/* ─────────────────────────────────────────────────────────────────
   4. EVENTS TAB SWITCHER
   ───────────────────────────────────────────────────────────────── */
function showTab(id, btn) {
  document.querySelectorAll(".events-panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("active"));
  const panel = document.getElementById(id);
  if (panel) panel.classList.add("active");
  if (btn)   btn.classList.add("active");
}


/* ─────────────────────────────────────────────────────────────────
   5. SCROLL-TO-TOP BUTTON
   ───────────────────────────────────────────────────────────────── */
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* ─────────────────────────────────────────────────────────────────
   6. REVEAL ON SCROLL ANIMATION
   ───────────────────────────────────────────────────────────────── */
(function initReveal() {
  const revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  const observer  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const inPanel   = entry.target.closest(".events-panel");
      const inGallery = entry.target.closest(".gallery-grid");
      const delay = (inPanel || inGallery)
        ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
        : 0;
      setTimeout(() => entry.target.classList.add("visible"), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));
})();


/* ─────────────────────────────────────────────────────────────────
   7. EVENT SELECTOR TOGGLE
   ───────────────────────────────────────────────────────────────── */
(function initEventSelector() {
  const btn       = document.getElementById("event-selector");
  const container = document.getElementById("event-selector-container");
  if (!btn || !container) return;
  btn.addEventListener("click", () => {
    const isOpen = container.classList.contains("open");
    container.classList.toggle("open", !isOpen);
    btn.querySelector("span").textContent = isOpen
      ? "Select Events \u00a0\u25c6"
      : "Hide Events \u00a0\u25c6";
  });
})();


/* ─────────────────────────────────────────────────────────────────
   8. EVENT CHECKBOX → PARTICIPANT PANEL + LIVE FEE
   ───────────────────────────────────────────────────────────────── */
(function initEventCheckboxes() {
  const EVENT_CONFIG = {
    "Battlegrounds Mobile": { regId: "bgmi-reg",   fee: 100 },
    "TechXcellence":        { regId: "techx-reg",  fee: 200 },
    "Web Techno":           { regId: "web-reg",    fee: 300 },
    "Hackathon":            { regId: "hack-reg",   fee: 400 },
    "Digital Heist":        { regId: "dheist-reg", fee: 500 },
    "Patriotic Songs":      { regId: "pat-reg",    fee: 600 },
    "Classical Dance":      { regId: "cdance-reg", fee: 700 },
    "Folk Dance":           { regId: "fdance-reg", fee: 800 },
  };

  const feeDisplay = document.getElementById("feeDisplay");

  function updateFee() {
    let total = 0;
    document.querySelectorAll('input[name="event[]"]:checked').forEach(cb => {
      const cfg = EVENT_CONFIG[cb.value];
      if (cfg) total += cfg.fee;
    });
    if (feeDisplay) feeDisplay.textContent = total.toLocaleString("en-IN");
  }

  document.querySelectorAll('input[name="event[]"]').forEach(cb => {
    cb.addEventListener("change", function () {
      const cfg = EVENT_CONFIG[this.value];
      if (!cfg) return;
      const panel = document.getElementById(cfg.regId);
      if (panel) {
        panel.classList.toggle("visible", this.checked);
        if (!this.checked) {
          panel.querySelectorAll("input").forEach(inp => (inp.value = ""));
        }
      }
      updateFee();
    });
  });
})();


/* ─────────────────────────────────────────────────────────────────
   9. FORM SUBMISSION
   ─ Participants are sent as JSON grouped by event name so the
     Google Apps Script knows exactly which participants belong
     to which event — no more mixing across sheets.
   ───────────────────────────────────────────────────────────────── */
(function initRegistration() {

  const SCRIPT_URL      = "https://script.google.com/macros/s/AKfycbxiwFAVuJMjT9wF0S5-2Fp0EUGS7bR3qMH4cOfZPaBq0rSmhjbdOpvxpV50BvZrbnOi/exec";
  const WHATSAPP_NUMBER = "919019177440";

  const FEE_MAP = {
    "Battlegrounds Mobile": 100,
    "TechXcellence":        200,
    "Web Techno":           300,
    "Hackathon":            400,
    "Digital Heist":        500,
    "Patriotic Songs":      600,
    "Classical Dance":      700,
    "Folk Dance":           800,
  };

  const form      = document.getElementById("regForm");
  const submitBtn = document.getElementById("btn-submit");
  const successEl = document.getElementById("successMsg");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submitBtn.disabled) return;

    /* Leader details */
    const name    = document.getElementById("fname").value.trim();
    const college = document.getElementById("college").value.trim();
    const email   = document.getElementById("email").value.trim();
    const phone   = document.getElementById("phone").value.trim();

    /* Selected events */
    const selectedEvents = [];
    document.querySelectorAll('input[name="event[]"]:checked').forEach(cb => {
      selectedEvents.push(cb.value);
    });

    if (selectedEvents.length === 0) {
      alert("Please select at least one event before registering.");
      return;
    }

    /* ── KEY FIX ──────────────────────────────────────────────────
       Build a JSON object where each KEY is the event name and
       each VALUE is an array of { name, phone } objects.
       This way the Apps Script receives perfectly grouped data.
       Example:
       {
         "Battlegrounds Mobile": [
           { "name": "Player 1", "phone": "9012384756" },
           { "name": "Player 2", "phone": "1234567890" }
         ],
         "TechXcellence": [
           { "name": "Player 3", "phone": "9876543210" }
         ]
       }
    ─────────────────────────────────────────────────────────────── */
    const participantsByEvent = {};

    selectedEvents.forEach(eventName => {
      const nameInputs  = document.querySelectorAll(`.participant-name[data-event="${eventName}"]`);
      const phoneInputs = document.querySelectorAll(`.participant-phone[data-event="${eventName}"]`);

      const participants = [];
      nameInputs.forEach((inp, idx) => {
        const pName  = inp.value.trim();
        const pPhone = phoneInputs[idx] ? phoneInputs[idx].value.trim() : "";
        if (pName) {
          participants.push({ name: pName, phone: pPhone });
        }
      });

      participantsByEvent[eventName] = participants;
    });

    /* Total fee */
    const totalFee = selectedEvents.reduce((sum, ev) => sum + (FEE_MAP[ev] || 0), 0);

    /* Disable button */
    submitBtn.disabled = true;
    submitBtn.querySelector("span").textContent = "Registering\u2026 \u25c6";

    /* Build FormData */
    const formData = new FormData();
    formData.append("name",    name);
    formData.append("phone",   phone);
    formData.append("email",   email);
    formData.append("college", college);
    formData.append("events",  selectedEvents.join(", "));
    formData.append("totalFee", totalFee);
    formData.append("timestamp", new Date().toLocaleString("en-IN"));

    /* Send participants as a clean JSON string — grouped by event */
    formData.append("participantsJSON", JSON.stringify(participantsByEvent));

    /* POST to Google Apps Script */
    fetch(SCRIPT_URL, { method: "POST", body: formData })
      .then(res => res.text())
      .then(() => {

        /* WhatsApp message */
        let participantLines = "";
        selectedEvents.forEach(ev => {
          const list = participantsByEvent[ev];
          participantLines += `\n*${ev}*\n`;
          if (list && list.length > 0) {
            list.forEach((p, i) => {
              participantLines += `  ${i + 1}. ${p.name}${p.phone ? " \u2013 " + p.phone : ""}\n`;
            });
          } else {
            participantLines += "  (no participants listed)\n";
          }
        });

        const message =
          `*\ud83c\udf93 NEW REGISTRATION \u2013 PRAJNA 2026*\n\n` +
          `*Team Leader / Faculty*\n` +
          `Name: ${name}\n` +
          `College: ${college}\n` +
          `Phone: ${phone}\n` +
          `Email: ${email}\n\n` +
          `*Events & Participants*${participantLines}\n` +
          `*Total Fee: \u20b9${totalFee.toLocaleString("en-IN")}*\n\n` +
          `Time: ${new Date().toLocaleString("en-IN")}`;

        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
          "_blank"
        );

        form.style.display = "none";
        if (successEl) successEl.style.display = "block";
      })
      .catch(err => {
        console.error("Registration error:", err);
        submitBtn.disabled = false;
        submitBtn.querySelector("span").textContent = "Register Now \u00a0\u25c6";
        alert("Something went wrong. Please try again.");
      });
  });
})();