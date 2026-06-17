document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggle) navToggle.checked = false;
    });
  });

  const revealItems = document.querySelectorAll(".section, .notice-band, .pledge-section, .page-hero");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => {
      item.classList.add("reveal");
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  document.querySelectorAll(".video-card video, .hero-video").forEach((video) => {
    video.addEventListener("play", () => {
      document.querySelectorAll(".video-card video, .hero-video").forEach((other) => {
        if (other !== video && !other.classList.contains("hero-video")) other.pause();
      });
    });
  });

  document.querySelectorAll("[data-pledge-button]").forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = "已签署";
      button.classList.add("signed");
      button.setAttribute("aria-pressed", "true");
    });
  });

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });
});
