/* ═══════════════════════════════════════════════════════════════════
   PRAJNA 2026 — script.js
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
    const size = Math.random() * 4 + 1;
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
const navbar = document.getElementById("navbar");
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 60);
  if (scrollTopBtn)
    scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
});

/* ─────────────────────────────────────────────────────────────────
   3. MOBILE MENU TOGGLE
   ───────────────────────────────────────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("open");
    document.body.style.overflow = mobileMenu.classList.contains("open")
      ? "hidden"
      : "";
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
  document
    .querySelectorAll(".events-panel")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".toggle-btn")
    .forEach((b) => b.classList.remove("active"));
  const panel = document.getElementById(id);
  if (panel) panel.classList.add("active");
  if (btn) btn.classList.add("active");
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
  const revealEls = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right",
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const inPanel = entry.target.closest(".events-panel");
        const inGallery = entry.target.closest(".gallery-grid");
        const delay =
          inPanel || inGallery
            ? Array.from(entry.target.parentElement.children).indexOf(
                entry.target,
              ) * 80
            : 0;
        setTimeout(() => entry.target.classList.add("visible"), delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );
  revealEls.forEach((el) => observer.observe(el));
})();

/* ─────────────────────────────────────────────────────────────────
   7. EVENT SELECTOR TOGGLE
   ───────────────────────────────────────────────────────────────── */
(function initEventSelector() {
  const btn = document.getElementById("event-selector");
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
   8. DYNAMIC EVENT LIST + PARTICIPANT FIELDS
   ───────────────────────────────────────────────────────────────── */
(function initDynamicEvents() {
  /* ── Event configuration ─────────────────────────────────────── */
  const EVENT_PARTICIPANTS = {
    "Anime Whiz": 2,
    "Secret Vault": 2,
    Bgmi: 4,
    "It Quiz": 2,
    "Book Hunt": 2,
    "Shark Tank Competition": 2,
    "Biological Specimen Rangoli": 1,
    "Poster Making": 2,
    "Business Quiz": 2,
    "Best Mgt Team": 3,
    "Best Entrepreneur": 1,
    "Taxation Consultant Simulation": 2,
    "Best Event Mgt": 3,
    "Al go Rhythm": 2,
    "Vanaspati Shodha": 2,
    "Elemental Encounters": 2,
    "Reaction Race": 2,
    "Mock Press": 1,
    "Quiz Competition": 2,
    "Sanskrit Elocution": 1,
    "Sanskrit General Quiz": 2,
    "Story Writing": 1,
    "Turn Coat": 1,
    "Vichaar yudh": 2,
    Antakshari: 2,
    Physicon: 2,
    "Collage(Artificial Intelligence)": 2,
    "Collage Making": 2,
    Skit: 10,
    "Data Interpretation": 2,
    Padachitra: 1,
    "Hani Hani Kavithe": 1,
    "Documentary Making": 2,
    "Nrithya Laasya ": 8,
    Akarshati: 1,
    "Vridavana Vaibhava": 8,
    Swaranjali: 5,
    Jagruti: 8,
    "Ramakathamritam": 8,
  };

  /* ── Fee map (₹ per event) — adjust as needed ────────────────── */
  const FEE_MAP = {
    "Anime Whiz": 100,
    "Secret Vault": 100,
    Bgmi: 100,
    "It Quiz": 100,
    "Book Hunt": 100,
    "Shark Tank Competition": 100,
    "Biological Specimen Rangoli": 50,
    "Poster Making": 100,
    "Business Quiz": 100,
    "Best Mgt Team": 100,
    "Best Entrepreneur": 50,
    "Taxation Consultant Simulation": 100,
    "Best Event Mgt": 100,
    "Al go Rhythm": 100,
    "Vanaspati Shodha": 100,
    "Elemental Encounters": 100,
    "Reaction Race": 100,
    "Mock Press": 50,
    "Quiz Competition": 100,
    "Sanskrit Elocution": 50,
    "Sanskrit General Quiz": 100,
    "Story Writing": 50,
    "Turn Coat": 50,
    "Vichaar yudh": 100,
    Antakshari: 100,
    Physicon: 100,
    "Collage(Artificial Intelligence)": 100,
    "Collage Making": 100,
    Skit: 100,
    "Data Interpretation": 100,
    Padachitra: 50,
    "Hani Hani Kavithe": 50,
    "Nrithya Laasya ": 100,
    Akarshati: 50,
    "Vridavana Vaibhava": 100,
    Swaranjali: 100,
    Jagruti: 100,
    "Ramakathamritam": 100,
  };

  /* ── Category grouping ───────────────────────────────────────── */
  const CATEGORIES = {
    "Academic Events": [
      "Anime Whiz",
      "Secret Vault",
      "Bgmi",
      "It Quiz",
      "Book Hunt",
      "Shark Tank Competition",
      "Biological Specimen Rangoli",
      "Poster Making",
      "Business Quiz",
      "Best Mgt Team",
      "Best Entrepreneur",
      "Taxation Consultant Simulation",
      "Best Event Mgt",
      "Al go Rhythm",
      "Vanaspati Shodha",
      "Elemental Encounters",
      "Reaction Race",
      "Mock Press",
      "Quiz Competition",
      "Sanskrit Elocution",
      "Sanskrit General Quiz",
      "Story Writing",
      "Turn Coat",
      "Vichaar yudh",
      "Antakshari",
      "Physicon",
      "Collage(Artificial Intelligence)",
      "Collage Making",
      "Skit",
      "Data Interpretation",
      "Padachitra",
      "Hani Hani Kavithe",
      "Documentary Making",
    ],
    "Cultural Events": [
      "Nrithya Laasya ",
      "Akarshati",
      "Vridavana Vaibhava",
      "Swaranjali",
      "Jagruti",
      "Ramakathamritam",
    ],
  };

  /* ── Helpers ─────────────────────────────────────────────────── */
  function slugify(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }

  function buildParticipantRows(eventName, count) {
    let html = `<p class="participants-heading">Participants (${count > 1 ? "Team of " + count : "Individual"})</p>`;
    for (let i = 1; i <= count; i++) {
      html += `
        <div class="participant-row">
          <input
            type="text"
            class="participant-name"
            data-event="${eventName}"
            data-index="${i}"
            placeholder="Participant ${i} – Full Name" />
          <input
            type="tel"
            class="participant-phone"
            data-event="${eventName}"
            data-index="${i}"
            placeholder="Participant ${i} – Phone" />
        </div>`;
    }
    return html;
  }

  /* ── Render checkboxes + panels into #dynamic-event-list ─────── */
  const container = document.getElementById("dynamic-event-list");
  if (!container) return;

  let html = "";
  Object.entries(CATEGORIES).forEach(([category, events]) => {
    html += `<p class="event-category-label">${category}</p>`;
    events.forEach((eventName) => {
      const slug = slugify(eventName);
      const fee = FEE_MAP[eventName] || 0;
      const pCount = EVENT_PARTICIPANTS[eventName] || 1;

      html += `
        <label class="checkbox-item">
          <span class="checkmark-box"></span>
          <input type="checkbox" name="event[]" value="${eventName}" id="chk-${slug}" data-fee="${fee}" />
          <span>${eventName} <em class="fee-plain">₹${fee}</em></span>
        </label>
        <div class="event-reg" id="reg-${slug}">
          ${buildParticipantRows(eventName, pCount)}
        </div>`;
    });
  });

  container.innerHTML = html;

  /* ── Fee display ─────────────────────────────────────────────── */
  const feeDisplay = document.getElementById("feeDisplay");

  function updateFee() {
    let total = 0;
    document.querySelectorAll('input[name="event[]"]:checked').forEach((cb) => {
      total += FEE_MAP[cb.value] || 0;
    });
    if (feeDisplay) feeDisplay.textContent = total.toLocaleString("en-IN");
  }

  /* ── Checkbox change → show/hide panel + clear inputs ───────── */
  container.addEventListener("change", function (e) {
    const cb = e.target;
    if (cb.type !== "checkbox" || cb.name !== "event[]") return;

    const slug = slugify(cb.value);
    const panel = document.getElementById("reg-" + slug);
    if (!panel) return;

    if (cb.checked) {
      panel.classList.add("visible");
    } else {
      panel.classList.remove("visible");
      panel.querySelectorAll("input").forEach((inp) => (inp.value = ""));
    }
    updateFee();
  });
})();

/* ─────────────────────────────────────────────────────────────────
   9. FORM SUBMISSION
   ───────────────────────────────────────────────────────────────── */
(function initRegistration() {
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwwQ0sldSlm54zthLOihLCMByaLb8tgxyOC5gfVDNsv-jLL9c7PWsdzBYqR6O89YtML/exec";
  const WHATSAPP_NUMBER = "919019177440";

  const FEE_MAP = {
     "Anime Whiz": 100,
    "Secret Vault": 100,
    Bgmi: 100,
    "It Quiz": 100,
    "Book Hunt": 100,
    "Shark Tank Competition": 100,
    "Biological Specimen Rangoli": 50,
    "Poster Making": 100,
    "Business Quiz": 100,
    "Best Mgt Team": 100,
    "Best Entrepreneur": 50,
    "Taxation Consultant Simulation": 100,
    "Best Event Mgt": 100,
    "Al go Rhythm": 100,
    "Vanaspati Shodha": 100,
    "Elemental Encounters": 100,
    "Reaction Race": 100,
    "Mock Press": 50,
    "Quiz Competition": 100,
    "Sanskrit Elocution": 50,
    "Sanskrit General Quiz": 100,
    "Story Writing": 50,
    "Turn Coat": 50,
    "Vichaar yudh": 100,
    Antakshari: 100,
    Physicon: 100,
    "Collage (Artificial Intelligence)": 100,
    "Collage Making": 100,
    Skit: 100,
    "Data Interpretation": 100,
    Padachitra: 50,
    "Hani Hani Kavithe": 50,
    "Nrithya Laasya ": 100,
    Akarshati: 50,
    "Vridavana Vaibhava": 100,
    Swaranjali: 100,
    Jagruti: 100,
    "Ramakathamritam": 100,
  };

  const form = document.getElementById("regForm");
  const submitBtn = document.getElementById("btn-submit");
  const successEl = document.getElementById("successMsg");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submitBtn.disabled) return;

    const name = document.getElementById("fname").value.trim();
    const college = document.getElementById("college").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const selectedEvents = [];
    document.querySelectorAll('input[name="event[]"]:checked').forEach((cb) => {
      selectedEvents.push(cb.value);
    });

    if (selectedEvents.length === 0) {
      alert("Please select at least one event before registering.");
      return;
    }

    /* Build participants grouped by event */
    const participantsByEvent = {};
    selectedEvents.forEach((eventName) => {
      const nameInputs = document.querySelectorAll(
        `.participant-name[data-event="${eventName}"]`,
      );
      const phoneInputs = document.querySelectorAll(
        `.participant-phone[data-event="${eventName}"]`,
      );
      const participants = [];
      nameInputs.forEach((inp, idx) => {
        const pName = inp.value.trim();
        const pPhone = phoneInputs[idx] ? phoneInputs[idx].value.trim() : "";
        if (pName) participants.push({ name: pName, phone: pPhone });
      });
      participantsByEvent[eventName] = participants;
    });

    const totalFee = selectedEvents.reduce(
      (sum, ev) => sum + (FEE_MAP[ev] || 0),
      0,
    );

    submitBtn.disabled = true;
    submitBtn.querySelector("span").textContent = "Registering\u2026 \u25c6";

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("college", college);
    formData.append("events", selectedEvents.join(", "));
    formData.append("totalFee", totalFee);
    formData.append("timestamp", new Date().toLocaleString("en-IN"));
    formData.append("participantsJSON", JSON.stringify(participantsByEvent));

    fetch(SCRIPT_URL, { method: "POST", body: formData })
      .then((res) => res.text())
      .then(() => {
        let participantLines = "";
        selectedEvents.forEach((ev) => {
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
          `Name: ${name}\nCollege: ${college}\nPhone: ${phone}\nEmail: ${email}\n\n` +
          `*Events & Participants*${participantLines}\n` +
          `*Total Fee: \u20b9${totalFee.toLocaleString("en-IN")}*\n\n` +
          `Time: ${new Date().toLocaleString("en-IN")}`;

        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
          "_blank",
        );

        form.style.display = "none";
        if (successEl) successEl.style.display = "block";
      })
      .catch((err) => {
        console.error("Registration error:", err);
        submitBtn.disabled = false;
        submitBtn.querySelector("span").textContent =
          "Register Now \u00a0\u25c6";
        alert("Something went wrong. Please try again.");
      });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   EVENTS POPUP — ADD THIS BLOCK TO YOUR script.js
   ═══════════════════════════════════════════════════════════════ */

(function initEventPopup() {
  const overlay = document.getElementById("eventOverlay");
  const closeBtn = document.getElementById("popupClose");
  const popupName = document.getElementById("popupEventName");
  const popupImg = document.getElementById("popupImage");
  const popupDets = document.getElementById("popupDetails");

  if (!overlay) return;

  /* Open: fired by any "Explore More" button click */
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".explore-btn");
    if (!btn) return;

    const card = btn.closest(".event-card");
    if (!card) return;

    /* Pull data from card's data attributes */
    popupName.textContent = card.dataset.name || "";
    popupImg.src = card.dataset.img || "";
    popupImg.alt = card.dataset.name || "";

    /* Clone the hidden .event-details innerHTML into the popup */
    const detailsEl = card.querySelector(".event-details");
    popupDets.innerHTML = detailsEl ? detailsEl.innerHTML : "";

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  /* Close: X button */
  closeBtn.addEventListener("click", closePopup);

  /* Close: click outside the popup box */
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closePopup();
  });

  /* Close: Escape key */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePopup();
  });

  function closePopup() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  const eventDate = new Date("April 6, 2026 00:00:00").getTime();

  const timer = setInterval(function () {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
      clearInterval(timer);
      document.getElementById("countdown").innerHTML = "Event Started";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }, 1000);
});
