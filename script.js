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

  // New: Robust scroll-highlight based on offsetTop
/*  const sections = document.querySelectorAll("section[id]");

  const navbarHeight = 80; // match your CSS navbar height

  const highlightOnScroll = () => {
    const scrollY = window.pageYOffset + navbarHeight;
    let currentId = sections[0].id;

    sections.forEach((sec) => {
      if (scrollY >= sec.offsetTop) {
        currentId = sec.id;
      }
    });

    links.forEach((link) => {
      link.classList.toggle(
        "active-link",
        link.getAttribute("href") === `#${currentId}`
      );
    });
  };

  window.addEventListener("scroll", highlightOnScroll);
  highlightOnScroll(); // highlight on load if page is mid-scroll
*/
  // Smooth Scroll & Click Handling for nav links
  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.hash.slice(1);
      const targetSection = document.getElementById(targetId);

      // Update active class immediately
    //  links.forEach((l) => l.classList.remove("active-link"));
    //  this.classList.add("active-link");

      // Smooth scroll
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

      // Close mobile menu
      navLinks.classList.remove("show");
      navContainer.classList.remove("menu-open");
    });
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
