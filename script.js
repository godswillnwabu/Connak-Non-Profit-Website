// SIDE NAVIGATION SLIDE
const hambugerIcon = document.getElementById("hamburger-icon");
const navMenu = document.getElementById("side-nav");
const navOverlay = document.getElementById("navOverlay");
const navClosure = document.querySelector(".close-btn");

hambugerIcon.addEventListener("click", slideMenu);
navClosure.addEventListener("click", closeMenu);

function slideMenu() {
  hambugerIcon.classList.toggle("active");
  navMenu.classList.toggle("active");
  navOverlay.classList.toggle("active");
}
function closeMenu() {
  hambugerIcon.classList.remove("active");
  navMenu.classList.remove("active");
  navOverlay.classList.remove("active");
}

// HEADER SLIDE DOWN ON SCROLL
const headerDiv = document.querySelector("#header");

window.addEventListener("scroll", function() {
  const scrollHeight = window.scrollY;
  const headerHeight = headerDiv.getBoundingClientRect().height;

  if (scrollHeight > headerHeight) {
    headerDiv.classList.add("fixedToTop");
    document.querySelector(".hero-stripes").style.opacity = "0";
  } else {
    headerDiv.classList.remove("fixedToTop");
    document.querySelector(".hero-stripes").style.opacity = "1";
  }
});

const initAnimatedCounts = () => {
    const ease = (n) => {
      // https://github.com/component/ease/blob/master/index.js
      return --n * n * n + 1;
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Once this element is in view and starts animating, remove the observer,
          // because it should only animate once per page load.
          observer.unobserve(entry.target);
          const countToString = entry.target.getAttribute('data-countTo');
          const countTo = parseFloat(countToString);
          const duration = parseFloat(entry.target.getAttribute('data-animateCount'));
          const countToParts = countToString.split('.');
          const precision = countToParts.length === 2 ? countToParts[1].length : 0;
          const startTime = performance.now();
          const step = (currentTime) => {
            const progress = Math.min(ease((currentTime  - startTime) / duration), 1);
            entry.target.textContent = (progress * countTo).toFixed(precision);
            if (progress < 1) {
              animationFrame = window.requestAnimationFrame(step);
            } else {
              window.cancelAnimationFrame(animationFrame);
            }
          };
          let animationFrame = window.requestAnimationFrame(step);
        }
      });
    });
    document.querySelectorAll('[data-animateCount]').forEach((target) => {
      target.setAttribute('data-countTo', target.textContent);
      target.textContent = '0';
      observer.observe(target);
    });
};
initAnimatedCounts();



// FADE/SLIDE JAVASCRIPT CUSTOMIZATION
// Get the scrollable elements in the document
const scrollElements = document.querySelectorAll(".js-scroll");

// Use the froEach method to style the elements to zero opacity 
scrollElements.forEach((el) => {
  el.style.opacity = 0;
  scrollElements.forEach(function(el) {
    el.onanimationend = () => {
      el.style.opacity = 1;
    }
  })
})

var throttleTimer;

const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
}

// Detecting When an Element Is in View
const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

// Assign a class name to the element 
const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};
// To reset the function back to default when it is out of view
// const hideScrollElement = (element) => {
//   element.classList.remove("scrolled");
// };

// We’ll then combine our logic with the display function and use the forEach method to call the function on all js-scroll element
const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    }
    //  else if (elementOutofView(el)) {
    //   hideScrollElement(el)
    // }
  })
}

// Add a function listener to the window on scroll
window.addEventListener("scroll", () => { 
  throttle(() => {
    handleScrollAnimation();
  }, 250);
});

// 