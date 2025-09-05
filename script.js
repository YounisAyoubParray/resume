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


  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.hash.slice(1);
      const targetSection = document.getElementById(targetId);
      

      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Close mobile menu
      navLinks.classList.remove("show");
      navContainer.classList.remove("menu-open");
    });
  });

window.addEventListener("load", () => {
    // Force Chrome to recalc layout in "Desktop site" mode
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 50);
  });

  const tips = [
      "🧠 Tip: Keep scrolling — great things come at the end.",
      "✨ Small details make a big difference.",
      "🎯 Precision beats power. Timing beats speed.",
      "💻 Built with love and a little bit of caffeine.",
      "🔍 Attention to detail is a developer's superpower.",
      "🚀 Pushing pixels and pulling Git commits.",
      "📚 Learning never stops, even after deployment.",
      "🛠️ Debugging: being the detective in a crime movie where you are also the murderer."
    ];


    const tipElement = document.querySelector('.easter-egg p');
  if (tipElement) {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    tipElement.textContent = randomTip;
  }



});
