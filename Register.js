const scriptURL =
  "https://script.google.com/macros/s/AKfycbyiLByFfni-6qmCL29zdLN7WYH0PNe6q8_aZrfMIPSoNccEj26meN3Hyt87-HpDBDNU/exec";

const form = document.getElementById("regForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const btn = document.getElementById("btn-submit");

  if (btn.disabled) return;

  btn.disabled = true;
  btn.innerHTML = "Registering... ◆";

  // collect selected events
  const events = [];
  document.querySelectorAll('input[name="event[]"]:checked').forEach((el) => {
    events.push(el.value);
  });

  const eventsString = events.join(", ");

  const feeMap = {
    "Battlegrounds Mobile": 100,
    TechXcellence: 200,
    "Web Techno": 300,
    Hackathon: 400,
    "Digital Heist": 500,
    "Patriotic Songs": 600,
    "Classical Dance": 700,
    "Folk Dance": 800,
  };

  const totalFee = events.reduce((sum, event) => sum + (feeMap[event] || 0), 0);

  const formData = new FormData(form);
  // convert array to string
  formData.append("event", eventsString);

  formData.append("totalFee", totalFee);

  fetch(scriptURL, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((data) => {
      const WHATSAPP_NUMBER = "919019177440";
      const name = document.getElementById("fname").value.trim();
      const college = document.getElementById("college").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();

      const message =
        `*NEW EVENT REGISTRATION*\n\n` +
        `Name: ${name}\n` +
        `College: ${college}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email}\n` +
        `Events: ${eventsString}\n\n` +
        `Total Fee: ₹${totalFee}\n\n` +
        `Registration Time: ${new Date().toLocaleString("en-IN")}`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");

      console.log("Success:", data);
      form.style.display = "none";
      document.getElementById("successMsg").style.display = "block";
    })
    .catch((error) => {
      console.error("Error!", error);
      btn.disabled = false; // let them try again
      btn.innerHTML = "Register Now &nbsp;◆";
    });
});
