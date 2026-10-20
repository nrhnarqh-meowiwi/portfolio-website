// Nurhanna Ariqah's portfolio interactions


document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");
  const themeToggle = document.getElementById("themeToggle");
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");
  const backToTop = document.getElementById("backToTop");
  const currentYear = document.getElementById("currentYear");
  const copyEmailButton = document.getElementById("copyEmailButton");
  const copyStatus = document.getElementById("copyStatus");
  const emailLink = document.getElementById("emailLink");

  // Feature 1: Mobile navigation menu opens and closes.
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  // Close the mobile menu after a visitor selects a section.
  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  // Feature 2: Light/dark theme toggle. The preference is saved in local storage.
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeToggle.textContent = "☀";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  }

  themeToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-theme");
    themeToggle.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  });

  // Feature 3: Project category filters.
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });

      projectCards.forEach((card) => {
        const shouldShow = selectedFilter === "all" || card.dataset.category === selectedFilter;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  // Feature 4: Back-to-top button appears after the visitor scrolls down.
  const updateBackToTop = () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  };
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Feature 5: Reveal content as sections enter the viewport.
  const revealTargets = document.querySelectorAll(
    ".about-card, .skills-panel, .project-card, .timeline-item, .contact-card"
  );
  if ("IntersectionObserver" in window) {
    revealTargets.forEach((item) => item.classList.add("reveal"));
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((item) => revealObserver.observe(item));
  }

  // Feature 6: Automatically show the current year in the footer.
  currentYear.textContent = new Date().getFullYear();

  // Feature 7: Copy contact email once the owner replaces the placeholder.
  // Update the email in the HTML href and this value before publishing.
  const emailAddress = "nrhnarqh@gmail.com";
  copyEmailButton.dataset.email = emailAddress;
  copyEmailButton.addEventListener("click", async () => {
    if (emailAddress === "nrhnarqh@gmail.com") {
      copyStatus.textContent = "Please replace the placeholder with your email address first.";
      return;
    }
    try {
      await navigator.clipboard.writeText(emailAddress);
      copyStatus.textContent = "Email address copied!";
    } catch (error) {
      copyStatus.textContent = "Copy was not available in this browser. Please use the email link.";
    }
  });

  // Keep the mail link aligned with the email constant above.
  emailLink.href = `mailto:${emailAddress}`;
});
