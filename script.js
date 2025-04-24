document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed.");

  // Elements for mobile menu functionality
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navContainer = document.querySelector(".nav-container");

  if (!menuToggle) console.error("Menu toggle element not found!");
  if (!navLinks) console.error("Navigation links container not found!");
  if (!navContainer) console.error("Navigation container element not found!");

  // Mobile Menu: Click event for hamburger toggle
  if (menuToggle && navLinks && navContainer) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("show");
      navContainer.classList.toggle("menu-open");
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navContainer && !navContainer.contains(e.target)) {
      navLinks.classList.remove("show");
      navContainer.classList.remove("menu-open");
    }
  });

  // Section Highlighting System (top section only)
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");
  let isManualScroll = false;

  // Ignore initial scroll jump
  const pageLoadTime = Date.now();

  const highlightTopSection = () => {
    if (isManualScroll) return;
    let closestSection = null;
    let minDistance = Infinity;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top);
      if (rect.top <= 100 && distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    });

    if (closestSection) {
      const currentId = closestSection.id;
      navItems.forEach(link => {
        link.classList.toggle("active-link", link.hash === `#${currentId}`);
      });
    }
  };

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedHighlight = debounce(highlightTopSection, 100);
  window.addEventListener("scroll", () => {
    // Skip highlight on the initial browser jump
    if (Date.now() - pageLoadTime < 200) return;
    debouncedHighlight();
  });

  // Smooth Scroll & Click Handling for nav links
  navItems.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      isManualScroll = true;
      const targetId = this.hash.slice(1);
      const targetSection = document.getElementById(targetId);

      // Update active class immediately
      navItems.forEach(l => l.classList.remove("active-link"));
      this.classList.add("active-link");

      // Smooth scroll
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

      // Close mobile menu
      navLinks.classList.remove("show");
      navContainer.classList.remove("menu-open");

      setTimeout(() => {
        isManualScroll = false;
      }, 1500);
    });
  });
});
