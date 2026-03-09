/**
 * Back-to-top button — appears after scrolling down 300px.
 * Uses requestAnimationFrame-throttled scroll listener for performance.
 */
(function () {
  "use strict";

  const SCROLL_THRESHOLD = 300;

  function init() {
    // Create the button
    const btn = document.createElement("button");
    btn.id = "back-to-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.setAttribute("title", "Back to top");
    btn.textContent = "\u21D1"; // ⇑ upwards double arrow
    document.body.appendChild(btn);

    // Show/hide based on scroll position
    let ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            if (window.pageYOffset > SCROLL_THRESHOLD) {
              btn.classList.add("visible");
            } else {
              btn.classList.remove("visible");
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );

    // Smooth scroll to top on click
    btn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
