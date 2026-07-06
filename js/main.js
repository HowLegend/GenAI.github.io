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

  document.querySelectorAll("[data-video-play]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".video-card");
      const video = card?.querySelector("video");
      if (!video) return;
      video.controls = true;
      card.classList.add("is-playing");
      video.play();
    });
  });

  document.querySelectorAll("[data-settings-save]").forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = "已保存";
      button.classList.add("signed");
      button.setAttribute("aria-live", "polite");
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
