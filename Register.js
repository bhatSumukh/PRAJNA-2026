const scriptURL = "https://script.google.com/macros/s/AKfycbxZYcvoF3GhRcqGjtiDs3DfVH5RgApI3PXb_sbmYcljSJQanUaRzEedjeNwqv_LU0xf/exec";

const form = document.getElementById("regForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch(scriptURL, {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    console.log("Success:", data);
    form.style.display = "none";
    document.getElementById("successMsg").style.display = "block";
  })
  .catch(error => console.error("Error!", error));
});