const API_URL = "https://algoexperts-2.onrender.com";
const form = document.getElementById("leadForm");
const status = document.getElementById("formStatus");
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-menu");

menuButton?.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.innerHTML = `<i class="fa-solid fa-${isOpen ? "xmark" : "bars"}"></i>`;
});

menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  menu.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  if (menuButton) menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
}));

form?.addEventListener("submit", async event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const mobile = data.mobile.replace(/\D/g, "");
  if (mobile.length !== 10) {
    status.textContent = "Please enter a valid 10-digit mobile number.";
    status.className = "form-status error";
    return;
  }
  data.mobile = mobile;
  const submitButton = form.querySelector("button[type=submit]");
  submitButton.disabled = true;
  submitButton.innerHTML = 'Sending request <i class="fa-solid fa-spinner fa-spin"></i>';
  status.textContent = "";
  try {
    const response = await fetch(`${API_URL}/lead`, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)});
    if (!response.ok) throw new Error("Request failed");
    form.reset();
    status.textContent = "Thank you — your request has been sent successfully.";
    status.className = "form-status success";
  } catch (error) {
    status.textContent = "We couldn't send your request right now. Please use WhatsApp or try again shortly.";
    status.className = "form-status error";
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Request a free consultation <i class="fa-solid fa-arrow-right"></i>';
  }
});
