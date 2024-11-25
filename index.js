// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get elements with error handling
  const navbar = document.querySelector("nav") || document.createElement("nav");
  const menu = document.getElementById("menu");
  const navLinks = document.getElementById("nav-links");
  const mobileNavLinks = document.getElementById("nav-links-mobile");

  // Function to highlight home link when at the top
  function highlightHomeAtTop() {
    const navLinks = document.querySelectorAll("nav a");
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop === 0) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === "#home") {
          link.classList.add("text-green-500");
        } else {
          link.classList.remove("text-green-500");
        }
      });
    }
  }

  // Set initial state when page loads
  highlightHomeAtTop();

  // Scroll event handler
  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");
    
    if (scrollTop === 0) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === "#home") {
          link.classList.add("text-green-500");
        } else {
          link.classList.remove("text-green-500");
        }
      });
    } else {
      let currentSection = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          scrollTop >= sectionTop - sectionHeight / 3 &&
          scrollTop < sectionTop + sectionHeight - sectionHeight / 3
        ) {
          currentSection = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("text-green-500");
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("text-green-500");
        }
      });
    }
  });

  // Smooth scrolling for nav links
const anchors = document.querySelectorAll("nav a[href^='#'], .w-full a[href^='#']"); // Select both nav and quick links
anchors.forEach((anchor) => {
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
                const navHeight = navbar.offsetHeight; // Make sure navbar is defined
                const targetPosition =
                    targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        }

        // Close the mobile menu after a link is clicked (if applicable)
        if (mobileNavLinks) {
            mobileNavLinks.classList.add("hidden"); // Hide menu
            mobileNavLinks.classList.remove("flex"); // Ensure flex is removed
        }
    });
});

  //mobileview
  // Hamburger menu functionality
  if (menu && navLinks && mobileNavLinks) {
    menu.addEventListener("click", () => {
      console.log('Menu clicked!'); // Debugging log
      mobileNavLinks.classList.toggle("hidden"); // Toggle hidden class
      mobileNavLinks.classList.toggle("flex");   // Toggle flex class for display
    });
  }
});


//pos open and close
function toggleContent(element) {
  if (!element) return;

  // Get all FAQ content sections
  const allContents = document.querySelectorAll('.content');
  const allIcons = document.querySelectorAll('.flex span');

  // Get the current content section and icon
  const content = element.nextElementSibling;
  const icon = element.querySelector("span");

  if (!content || !icon) return;

  // Close all other open content sections except the clicked one
  allContents.forEach((otherContent, index) => {
    if (otherContent !== content) {
      otherContent.style.maxHeight = "0px";
      setTimeout(() => {
        otherContent.classList.add("hidden");
      }, 300);
      allIcons[index].textContent = "+";
    }
  });

  // Toggle the clicked content
  if (content.classList.contains("hidden")) {
    content.classList.remove("hidden");
    content.style.maxHeight = content.scrollHeight + "px"; // Smooth expansion
    icon.textContent = "-";
  } else {
    content.style.maxHeight = "0px"; // Collapse smoothly
    setTimeout(() => {
      content.classList.add("hidden");
    }, 300); // Wait for transition to complete
    icon.textContent = "+";
  }
}

//footer hide show
const footer = document.getElementById('footer');
        let lastScrollTop = 0;
        let isFooterVisible = false;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Check if we're at the bottom of the page
            if ((windowHeight + scrollTop) >= (documentHeight - 10)) {
                if (!isFooterVisible) {
                    footer.classList.remove('translate-y-full');
                    isFooterVisible = true;
                }
            } else if (scrollTop < lastScrollTop) {
                // Scrolling up
                if (isFooterVisible) {
                    footer.classList.add('translate-y-full');
                    isFooterVisible = false;
                }
            }

            lastScrollTop = scrollTop;
        });

