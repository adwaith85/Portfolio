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

// Contact Form Handling (Using FormSubmit.co)
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Change button state
    const submitBtn = contactForm.querySelector(".submit-btn-premium");
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
      // Using FormSubmit.co for direct email delivery
      // The first time you use this, you'll need to confirm your email via a link sent by FormSubmit.
      const response = await fetch("https://formsubmit.co/ajax/adwaithadhu85227@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        formStatus.textContent = "Thank you! Your message has been sent.";
        formStatus.style.color = "var(--accent)";
        contactForm.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      formStatus.textContent = "Something went wrong. Please try again.";
      formStatus.style.color = "#ff4d4d";
    } finally {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;

      // Clear status after 5 seconds
      setTimeout(() => {
        formStatus.textContent = "";
      }, 5000);
    }
  });
}

