// REFERENCE BY devsyedmohsin ON GITHUB: https://github.com/devsyedmohsin/portfolio-template

const nav = document.querySelector(".nav");
const navMenu = document.querySelector(".nav-items");
const btnToggleNav = document.querySelector(".menu-btn");
const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");
const mainEl = document.querySelector("main");
const yearEl = document.querySelector(".footer-text span");

function copyText() {
  var email = "datb9a2@gmail.com";
  navigator.clipboard.writeText(email).then(function () {
    alert("Copied email address: " + email);
  }, function (err) {
    console.error('Could not copy text: ', err);
  });
}

const toggleNav = () => {
  nav.classList.toggle("hidden");

  // Prevent screen from scrolling when menu is opened
  document.body.classList.toggle("lock-screen");

  if (nav.classList.contains("hidden")) {
    btnToggleNav.textContent = "menu";
  } else {
    // When menu is opened after transition change text respectively
    setTimeout(() => {
      btnToggleNav.textContent = "close";
    }, 475);
  }
};

btnToggleNav.addEventListener("click", toggleNav);

navMenu.addEventListener("click", (e) => {
  if (e.target.localName === "a") {
    toggleNav();
  }
});

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !nav.classList.contains("hidden")) {
    toggleNav();
  }
});

// Animating work instances on scroll

workImgs.forEach((workImg) => workImg.classList.add("transform"));

let observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    const [textbox, picture] = Array.from(entry.target.children);
    if (entry.isIntersecting) {
      picture.classList.remove("transform");
      Array.from(textbox.children).forEach(
        (el) => (el.style.animationPlayState = "running")
      );
    }
  },
  { threshold: 0.3 }
);

workEls.forEach((workEl) => {
  observer.observe(workEl);
});

// Toggle theme and store user preferred theme for future

const switchThemeEl = document.querySelector('input[type="checkbox"]');
const storedTheme = localStorage.getItem("theme");

switchThemeEl.checked = storedTheme === "dark" || storedTheme === null;

switchThemeEl.addEventListener("click", () => {
  const isChecked = switchThemeEl.checked;

  if (!isChecked) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    switchThemeEl.checked = false;
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

// Trap the tab when menu is opened

const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
    e.preventDefault();
    btnToggleNav.focus();
  }
});

// Rotating logos animation

const logosWrappers = document.querySelectorAll(".logo-group");

const sleep = (number) => new Promise((res) => setTimeout(res, number));

logosWrappers.forEach(async (logoWrapper, i) => {
  var intervalTime = 1000;
  const logos = Array.from(logoWrapper.children);
  await sleep(intervalTime * i);
  setInterval(() => {
    let temp = logos[0];
    logos[0] = logos[1];
    logos[1] = logos[2];
    logos[2] = temp;
    logos[0].classList.add("hide", "to-top");
    logos[1].classList.remove("hide", "to-top", "to-bottom");
    logos[2].classList.add("hide", "to-bottom");
  }, 5000);
});

yearEl.textContent = new Date().getFullYear();

// test

const ImageLoop = (() => {
  let s;

  return {
    settings() {
      return {
        image: document.querySelectorAll('.team__img'),
        link: document.querySelectorAll('.team__link'),
        intervalTime: 1200
      };
    },

    init() {
      s = this.settings();
      this.bindEvents();
    },

    bindEvents() {
      this.hideImg();
      this.hoverImg();
    },

    hideImg() {
      [].forEach.call(s.image, img => {
        [].forEach.call(img.children, (moreImg, idx) => {
          if (idx !== 0) {
            moreImg.style.display = 'none';
          }
        });
      });
    },

    hoverImg() {
      [].forEach.call(s.link, link => {
        let interval;
        let count = 0;

        link.addEventListener('mouseenter', e => {
          const target = e.target.children[0];
          // Idx 1 because of the span tag/preloader
          const img = target.children[1].children;
          const length = img.length;

          interval = setInterval(() => {
            img[count].style.display = 'none';

            if (count === length - 1) {
              count = 0;
            } else {
              count++;
            }

            img[count].style.display = 'block';
          }, s.intervalTime);
        });

        link.addEventListener('mouseleave', () => {
          clearInterval(interval);
        });
      });
    }
  };
})();

ImageLoop.init();
