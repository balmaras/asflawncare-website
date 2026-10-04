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
    // Helper to swap the status message's text + visual style together,
    // so success/error/validation states are easy to tell apart at a glance
    // (not just a plain line of text under the button).
    const setStatus = (message, variant) => {
      status.textContent = message;
      status.classList.remove("form-status--success", "form-status--error", "form-status--info");
      if (variant) status.classList.add(`form-status--${variant}`);
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // The form has `novalidate` (so we can control validation styling
      // ourselves instead of relying only on default browser tooltips), but
      // that means required fields are NOT enforced automatically — we have
      // to check validity ourselves before submitting. Without this check,
      // an empty form would still POST to Formspree and show a false
      // "Thanks!" message. reportValidity() also triggers the browser's
      // built-in "please fill out this field" tooltip on the first invalid
      // field, pointing the person right at what's missing.
      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus("Please fill out all required fields before submitting.", "error");
        return;
      }

      const submitBtn = form.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      setStatus("Sending...", "info");

      // Build a clearer email subject from the customer's name so
      // notifications are easy to scan/triage in the inbox, e.g.
      // "New ASF Lawn Care lead: Jane Smith"
      const subjectField = document.getElementById("formSubject");
      if (subjectField) {
        const first = form.firstName.value.trim();
        const last = form.lastName.value.trim();
        const fullName = [first, last].filter(Boolean).join(" ");
        subjectField.value = fullName
          ? `New ASF Lawn Care lead: ${fullName}`
          : "New ASF Lawn Care website lead";
      }

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          setStatus("Thanks! We'll be in touch shortly.", "success");
          form.reset();
        } else {
          setStatus("Something went wrong. Please call us instead: (706) 331-9311.", "error");
        }
      } catch (err) {
        setStatus("Something went wrong. Please call us instead: (706) 331-9311.", "error");
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
});
