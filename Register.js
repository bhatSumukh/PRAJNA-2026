const scriptURL =
  "https://script.google.com/macros/s/AKfycbxZYcvoF3GhRcqGjtiDs3DfVH5RgApI3PXb_sbmYcljSJQanUaRzEedjeNwqv_LU0xf/exec";

const form = document.getElementById("regForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const btn = document.getElementById("btn-submit");
  btn.disabled = true;
  btn.innerHTML = "Registering... ◆";

  // collect selected events
  const events = [];
  document.querySelectorAll('input[name="event[]"]:checked').forEach((el) => {
    events.push(el.value);
  });

  const eventsString = events.join(", ");

  const formData = new FormData(form);
  // convert array to string
  formData.append("event", eventsString);

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
