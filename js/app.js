// HOME slideshow data
const slides = [
    {
        // 1) Space Feeders
        src: "./img/spacefeeders1.png",
        alt: "Space Feeders thumbnail",
        title: "Space Feeders",
        caption: "Fast-paced arcade shooter with increasingly chaotic space enemies.",
        link: "./projects/Space-Feeders/"
    },
    {
        // 2) 3DPrinted ESP32 Lamp
        src: "./img/ledbox1.png",
        alt: "3D Printed ESP32 Lamp thumbnail",
        title: "3DPrinted-ESP32-Lamp",
        caption: "Custom 3D printed smart lamp powered by an ESP32 and addressable LEDs.",
        link: "./projects/3DPrinted-ESP32-Lamp/"
    },
    {
        // 3) Contact slide – logo + CTA
        src: "/img/logo.png",
        alt: "Matthew Walker logo",
        title: "Get in touch",
        caption: "Contact me about projects, collaboration, or anything interesting.",
        link: "./contact/"
    }
];

let current = 0;
let timer = null;
const AUTO_ADVANCE_MS = 6000; // 0 to disable auto-advance

const elImg = document.getElementById("slideImage");
const elTitle = document.getElementById("slideTitle");
const elCaption = document.getElementById("slideCaption");
const elDots = document.getElementById("slideDots");
const elLink = document.getElementById("slideLink");

function renderDots() {
    if (!elDots) return;
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
    if (elImg) {
        elImg.src = s.src;
        elImg.alt = s.alt || "";
    }
    if (elTitle) elTitle.textContent = s.title || "";
    if (elCaption) elCaption.textContent = s.caption || "";

    if (elLink) {
        if (s.link) {
            elLink.href = s.link;
            elLink.style.cursor = "pointer";
        } else {
            elLink.removeAttribute("href");
            elLink.style.cursor = "default";
        }
    }

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

// Wire up controls (only if they exist on this page)
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => prev(true));
    nextBtn.addEventListener("click", () => next(true));
}

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

// Init slideshow if we're on the home page
if (elImg && elTitle && elCaption) {
    renderSlide();
    restartAuto();
}
