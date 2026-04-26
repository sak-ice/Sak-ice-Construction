
document.addEventListener("DOMContentLoaded", function () {
  /* --------------------------------------------------
       NAVIGATION — Mobile Toggle
    -------------------------------------------------- */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navClose = document.getElementById("nav-close");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.getElementById("navbar");

  function openMenu() {
    navMenu.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    navMenu.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (hamburger) hamburger.addEventListener("click", openMenu);
  if (navClose) navClose.addEventListener("click", closeMenu);

  // Close on nav link click
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on outside click
  document.addEventListener("click", function (e) {
    if (navMenu && navMenu.classList.contains("open")) {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    }
  });

  /* --------------------------------------------------
       NAVBAR — Scroll shadow
    -------------------------------------------------- */
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  /* --------------------------------------------------
       SCROLL TO TOP BUTTON
    -------------------------------------------------- */
  const scrollTopBtn = document.getElementById("scroll-top");

  if (scrollTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    });

    scrollTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --------------------------------------------------
       ACTIVE NAV LINK — Highlight on scroll (homepage)
    -------------------------------------------------- */
  const sections = document.querySelectorAll("section[id]");

  function highlightNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      }
    });
  }

  if (sections.length > 0) {
    window.addEventListener("scroll", highlightNav);
  }

  /* --------------------------------------------------
       PROJECT FILTER TABS
    -------------------------------------------------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(
    "#projects-list .project-card",
  );

  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        filterBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const filter = this.dataset.filter;

        projectCards.forEach((card) => {
          const cat = card.dataset.cat || "";
          if (filter === "all" || cat === filter) {
            card.style.display = "";
            card.style.opacity = "0";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transition = "opacity 0.4s";
            }, 10);
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  /* --------------------------------------------------
       NEWSLETTER FORMS — Feedback
    -------------------------------------------------- */
  document
    .querySelectorAll(".newsletter-form button, .sidebar-newsletter .btn")
    .forEach((btn) => {
      btn.addEventListener("click", function () {
        const form = this.closest(".newsletter-form, .sidebar-newsletter");
        const input = form ? form.querySelector('input[type="email"]') : null;
        if (input && input.value.trim() && input.value.includes("@")) {
          const originalHTML = this.innerHTML;
          this.innerHTML = '<i class="fa-solid fa-check"></i>';
          this.style.background = "#10b981";
          input.value = "";
          setTimeout(() => {
            this.innerHTML = originalHTML;
            this.style.background = "";
          }, 2500);
        } else if (input) {
          input.style.borderColor = "#e53e3e";
          input.focus();
          setTimeout(() => {
            input.style.borderColor = "";
          }, 2000);
        }
      });
    });

  /* --------------------------------------------------
       SMOOTH SCROLL for anchor links
    -------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset =
          parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--nav-height",
            ),
          ) || 80;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* --------------------------------------------------
       FADE-IN ANIMATION on scroll (Intersection Observer)
    -------------------------------------------------- */
  const fadeEls = document.querySelectorAll(
    ".about-card, .service-card, .project-card, .blog-card, .testi-card, .team-card, .astat, .info-strip-item",
  );

  if ("IntersectionObserver" in window && fadeEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(
              () => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
              },
              (idx % 4) * 80,
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    fadeEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
      observer.observe(el);
    });
  }
});
// ===== HERO SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".hero-dot");
let sliderInterval = setInterval(() => changeSlide(1), 5000);

function goToSlide(index) {
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");
  currentSlide = index;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
  resetInterval();
}

function changeSlide(direction) {
  let next = (currentSlide + direction + slides.length) % slides.length;
  goToSlide(next);
}

function resetInterval() {
  clearInterval(sliderInterval);
  sliderInterval = setInterval(() => changeSlide(1), 5000);
}
// Loading Screen
window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loader").classList.add("hide");
  }, 1500);
});
