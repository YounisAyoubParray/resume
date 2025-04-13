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

  // Intersection Observer configuration for section highlighting
  const observer = new IntersectionObserver(
    debounce((entries) => {
      if (isManualScroll) return;

      let mostVisibleEntry = null;
      let maxVisibility = 0;
      entries.forEach(entry => {
        const visibility = entry.intersectionRatio;
        if (visibility > maxVisibility) {
          mostVisibleEntry = entry;
          maxVisibility = visibility;
        }
      });
      if (mostVisibleEntry) {
        const targetId = mostVisibleEntry.target.id;
        navItems.forEach(link => {
          const isActive = link.hash === `#${targetId}`;
          link.classList.toggle("active-link", isActive);
        });
        console.log("Section in view:", mostVisibleEntry.target.id);
      }
    }, 100),
    {
      threshold: [0, 0.5, 1],
      rootMargin: "-100px 0px -25% 0px"
    }
  );

  // Observe all sections
  sections.forEach(section => observer.observe(section));

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
