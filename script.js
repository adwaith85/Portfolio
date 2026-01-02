// Reveal Animations on Scroll
const revealElements = document.querySelectorAll(".reveal, .reveal-up");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");

      // Trigger skill bars animation (start to end)
      const bars = entry.target.querySelectorAll(".bar");
      bars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        // Ensure it starts from 0 every time it might be triggered, 
        // but here it's cleaner to just set the target
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 200);
      });
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(el => revealObserver.observe(el));

// EmailJS Form Handling
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Change button state
    const submitBtn = contactForm.querySelector(".submit-btn-premium");
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
    // For demonstration, since I don't have the user's specific IDs:
    // You need to replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual values from EmailJS dashboard.

    emailjs.sendForm('service_id', 'template_id', this)
      .then(function () {
        formStatus.textContent = "Thank you! I will get back to you soon.";
        formStatus.style.color = "var(--accent)";
        contactForm.reset();
      }, function (error) {
        formStatus.textContent = "Something went wrong. Please try again.";
        formStatus.style.color = "#ff4d4d";
      })
      .finally(() => {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        setTimeout(() => {
          formStatus.textContent = "";
        }, 5000);
      });
  });
}
