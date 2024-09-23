// Scroll effect for hiding/showing the navbar
let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  // Show navbar when at the top
  if (scrollTop === 0) {
    navbar.classList.remove("hidden");
    navbar.classList.add("visible");

    // Highlight 'Home' link manually when at the top
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === "#home") {
        link.classList.add("text-green-500");
      } else {
        link.classList.remove("text-green-500");
      }
    });
  } else if (scrollTop > lastScrollTop) {
    navbar.classList.add("visible");
    navbar.classList.remove("hidden");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

  // Highlight the current section link

  if (sections.length > 0) {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      // Set currentSection based on scroll position
      if (scrollTop >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute("id");
      }
    });

    // Highlight the nav link based on the current section
    navLinks.forEach((link) => {
      link.classList.remove("text-green-500");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("text-green-500");
      }
    });
  }
});

// Smooth scrolling for nav links
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("nav a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);

      if (targetId === "home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navHeight = navbar.offsetHeight;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.scrollY -
            navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
});

// JavaScript for the hamburger menu
const menu = document.getElementById("menu");
const navLinks = document.getElementById("nav-links");

menu.addEventListener("click", () => {
  navLinks.classList.toggle("hidden");
  navLinks.classList.toggle("flex");
});

//FAQ hide and view
function toggleContent(element) {
  // Find the content section in the current container
  const content = element.nextElementSibling;
  const icon = element.querySelector("span");

  // If the content is hidden, we calculate its height and then show it smoothly
  if (content.classList.contains("hidden")) {
    content.classList.remove("hidden");
    // Trigger reflow to enable transition
    content.offsetHeight; // This forces a reflow
    content.style.maxHeight = content.scrollHeight + "px"; // Set to its full height for transition
    icon.textContent = "-"; // Change icon to minus
  } else {
    // Set to its current height before collapsing
    content.style.maxHeight = content.scrollHeight + "px"; // Set the height to its current height

    // Trigger reflow again for smooth transition
    setTimeout(() => {
      content.style.maxHeight = "0px"; // Collapse smoothly to 0px
    }, 10); // Small timeout for smooth effect

    setTimeout(() => {
      content.classList.add("hidden"); // Add hidden class after transition
    }, 300); // Match this timeout with CSS transition duration

    icon.textContent = "+"; // Change icon to plus
  }
}
