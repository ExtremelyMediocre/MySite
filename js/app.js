// HOME slideshow data: update paths + text to match your images.
// Put images in /img/ (or wherever you're already storing them).
const slides = [
    {
        src: "./img/slide-1.jpg",
        alt: "VR escape room project",
        title: "VR Escape Room",
        caption: "Unity + XR Interaction Toolkit. Puzzles, props, and interaction design."
    },
    {
        src: "./img/slide-2.jpg",
        alt: "3D printing and maker projects",
        title: "Maker + 3D Printing",
        caption: "Functional prints, prototyping, and interactive hardware bits."
    },
    {
        src: "./img/slide-3.jpg",
        alt: "Data viz dashboard",
        title: "Data Visualisation",
        caption: "Dashboards and UI work inspired by HCI + real datasets."
    }
];

let current = 0;
let timer = null;
const AUTO_ADVANCE_MS = 6000; // set to 0 to disable auto-advance

const elImg = document.getElementById("slideImage");
const elTitle = document.getElementById("slideTitle");
const elCaption = document.getElementById("slideCaption");
const elDots = document.getElementById("slideDots");

function renderDots() {
    elDots.innerHTML = "";
    slides.forEach((_, idx) => {
        const dot = document.createElement("button");
        dot.className = "slide-dot" + (idx === current ? " active" : "");
        dot.type = "button";
        dot.ariaLabel = `Go to slide ${idx + 1}`;
        dot.addEventListener("click", () => goTo(idx, true));
        elDots.appendChild(dot);
    });
}

function renderSlide() {
    const s = slides[current];
    elImg.src = s.src;
    elImg.alt = s.alt || "";
    elTitle.textContent = s.title || "";
    elCaption.textContent = s.caption || "";
    renderDots();
}

function goTo(idx, userInitiated = false) {
    current = (idx + slides.length) % slides.length;
    renderSlide();
    if (userInitiated) restartAuto();
}

function next(userInitiated = false) {
    goTo(current + 1, userInitiated);
}

function prev(userInitiated = false) {
    goTo(current - 1, userInitiated);
}

function restartAuto() {
    if (timer) clearInterval(timer);
    if (AUTO_ADVANCE_MS > 0) {
        timer = setInterval(() => next(false), AUTO_ADVANCE_MS);
    }
}

// Wire up controls (only if on the home page)
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => prev(true));
    nextBtn.addEventListener("click", () => next(true));
}

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

// Init
renderSlide();
restartAuto();
