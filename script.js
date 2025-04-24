document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed.");

  // Elements for mobile menu functionality
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navContainer = document.querySelector(".nav-container");

  if (!menuToggle) {
    console.error("Menu toggle element not found!");
  } else {
    console.log("Found menu-toggle element.");
  }
  if (!navLinks) {
    console.error("Navigation links container not found!");
  } else {
    console.log("Found nav-links container.");
  }
  if (!navContainer) {
    console.error("Navigation container element not found!");
  } else {
    console.log("Found nav-container element.");
  }

  // Mobile Menu: Click event for hamburger toggle
  if (menuToggle && navLinks && navContainer) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("Menu toggle clicked.");
      navLinks.classList.toggle("show");
      navContainer.classList.toggle("menu-open");
      console.log("nav-links class list:", navLinks.classList);
      console.log("nav-container class list:", navContainer.classList);
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navContainer && !navContainer.contains(e.target)) {
      console.log("Clicked outside nav-container, closing menu.");
      navLinks.classList.remove("show");
      navContainer.classList.remove("menu-open");
    }
  });

  // Section Highlighting System and Smooth Scroll
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");
  let isManualScroll = false;

  // Debounce function to limit the frequency of the observer callback
  const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  window.addEventListener("scroll", () => {
    if (isManualScroll) return;

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = scrollY + viewportHeight;

    let currentSectionId = null;
    let minOffset = Number.POSITIVE_INFINITY;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const offset = Math.abs(rect.top);

      if (rect.top <= 100 && offset < minOffset) {
        minOffset = offset;
        currentSectionId = section.id;
      }
    });

    const isAtBottom = scrollPosition >= documentHeight - 2;

    if (!currentSectionId && isAtBottom) {
      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        currentSectionId = lastSection.id;
        console.log("At bottom → forcing last section as active:", currentSectionId);
      }
    }

    if (currentSectionId) {
      console.log("Highlighting section:", currentSectionId); // ✅ Moved inside
      navItems.forEach(link => {
        const isActive = link.hash === `#${currentSectionId}`;
        link.classList.toggle("active-link", isActive);
      });
    }
  });
















  // Smooth Scroll & Click Handling for nav links
  navItems.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      isManualScroll = true;
      const targetId = this.hash.slice(1);
      const targetSection = document.getElementById(targetId);
      console.log("Nav link clicked, scrolling to:", targetId);

      // Update active class
      navItems.forEach(l => l.classList.remove("active-link"));
      this.classList.add("active-link");

      // Smooth scroll to section
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Close mobile menu
      navLinks.classList.remove("show");
      navContainer.classList.remove("menu-open");

      // Re-enable observer after scroll
      setTimeout(() => {
        isManualScroll = false;
        console.log("Manual scroll finished.");
      }, 1500);
    });
  });










  























});
