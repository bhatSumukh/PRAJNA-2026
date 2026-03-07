// // Configuration
// const WHATSAPP_NUMBER = "919019177440";

// document.getElementById("regForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const formData = {
//     name: document.getElementById("fname").value.trim(),
//     college: document.getElementById("college").value.trim(),
//     phone: document.getElementById("phone").value.trim(),
//     email: document.getElementById("email").value.trim(),
//     event: document.getElementById("event").value,
//   };

//   const events = [];
//   document.querySelectorAll('input[name="event"]:checked').forEach((el) => {
//     events.push(el.value);
//   });

//   const message = `
// *NEW EVENT REGISTRATION*

// Name: ${formData.name}
// College: ${formData.college}
// Phone: ${formData.phone}
// Email: ${formData.email}
// Events: ${events.join(", ")}

// Registration Time: ${new Date().toLocaleString("en-IN")}
// `;

//   const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

//   window.open(url, "_blank");

//   document.getElementById("successMsg").style.display = "block";

//   document.getElementById("regForm").reset();
// });
