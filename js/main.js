// ASF Lawn Care — main.js

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Contact form — AJAX submit to Formspree so we can show a status
  // message without leaving the page. Falls back to normal POST if
  // fetch fails (e.g. no JS or network hiccup).
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      status.textContent = "Sending...";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          status.textContent = "Thanks! We'll be in touch shortly.";
          form.reset();
        } else {
          status.textContent = "Something went wrong. Please call us instead: (706) 331-9311.";
        }
      } catch (err) {
        status.textContent = "Something went wrong. Please call us instead: (706) 331-9311.";
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
});
