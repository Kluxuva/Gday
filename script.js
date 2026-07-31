/* ============================================
   EDIT THIS TO ADD / CHANGE PHOTOS
   Put your image files in the /images folder,
   then add a line below for each one.
   src      -> filename inside /images
   caption  -> the little handwritten note under the photo
   rotate   -> tilt in degrees, keep it small (-6 to 6) for realism
   ============================================ */
const galleryImages = [
  { src: "images/photo-02.jpg", caption: "just being you", rotate: -3 },
  { src: "images/photo-03.jpg", caption: "cheesecake > me, apparently", rotate: 2 },
  { src: "images/photo-04.jpg", caption: "lazy mornings", rotate: -2 },
  { src: "images/photo-05.jpg", caption: "comfort zone", rotate: 3 },
  { src: "images/photo-06.jpg", caption: "flower behind your ear", rotate: -4 },
  { src: "images/photo-07.jpg", caption: "that wink", rotate: 2 },
  { src: "images/photo-08.jpg", caption: "close like this, always", rotate: -2 },
  { src: "images/photo-09.jpg", caption: "chopstick chaos", rotate: 4 },
];

/* ============================================
   BUILD GALLERY
   ============================================ */
function buildGallery(){
  const grid = document.getElementById("polaroidGrid");
  if(!grid) return;
  galleryImages.forEach((item, i) => {
    const fig = document.createElement("figure");
    fig.className = "polaroid";
    fig.style.setProperty("--tilt", `${item.rotate}deg`);
    fig.style.transitionDelay = `${(i % 6) * 0.08}s`;

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.caption || "us";
    img.loading = "lazy";

    const cap = document.createElement("figcaption");
    cap.textContent = item.caption || "";

    fig.appendChild(img);
    fig.appendChild(cap);
    grid.appendChild(fig);
  });
}

/* ============================================
   AMBIENT FALLING PETALS
   Two layers: soft painterly petal-shapes (near)
   and tiny blurred glyphs (far), for real depth.
   Petals sway side to side instead of drifting
   in one straight diagonal line.
   ============================================ */
const petalPalette = [
  ["#F3CBD3", "#C4415F"],
  ["#F6DDC6", "#CE9C4A"],
  ["#F0B8C6", "#8E2A45"],
  ["#FBE4E9", "#C4415F"],
];

function makePetal(field, { far = false } = {}){
  const p = document.createElement("span");
  p.className = "petal" + (far ? " petal--far" : "");

  const [from, to] = petalPalette[Math.floor(Math.random() * petalPalette.length)];
  const size = far ? 6 + Math.random() * 6 : 14 + Math.random() * 14;
  const duration = far ? 16 + Math.random() * 14 : 9 + Math.random() * 10;
  const sway = 40 + Math.random() * 90;
  const spin = (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360);

  p.style.left = Math.random() * 100 + "vw";
  p.style.width = size + "px";
  p.style.height = size * 1.3 + "px";
  p.style.setProperty("--from", from);
  p.style.setProperty("--to", to);
  p.style.setProperty("--sway1", sway + "px");
  p.style.setProperty("--sway2", -sway * 0.7 + "px");
  p.style.setProperty("--spin", spin + "deg");
  p.style.opacity = far ? 0.25 + Math.random() * 0.2 : 0.55 + Math.random() * 0.35;
  p.style.animationDuration = duration + "s, " + (duration * 0.9) + "s";
  p.style.animationDelay = (Math.random() * -duration) + "s";

  field.appendChild(p);
  return p;
}

function spawnPetals(){
  const field = document.getElementById("petalField");
  if(!field) return;
  const isSmall = window.innerWidth < 600;
  const nearCount = isSmall ? 10 : 18;
  const farCount = isSmall ? 8 : 14;

  for(let i = 0; i < nearCount; i++) makePetal(field, { far: false });
  for(let i = 0; i < farCount; i++) makePetal(field, { far: true });
}

/* ============================================
   INTERACTIVE PETAL BURST
   Tap/click anywhere on the page and a little
   cluster of petals bursts outward from that
   point, then joins the ambient drift.
   ============================================ */
function initPetalBurst(){
  const field = document.getElementById("petalField");
  if(!field) return;

  document.addEventListener("click", (e) => {
    // don't hijack real buttons/links
    if(e.target.closest("button, a")) return;

    const burstCount = 6;
    for(let i = 0; i < burstCount; i++){
      const p = document.createElement("span");
      p.className = "petal petal--burst";
      const [from, to] = petalPalette[Math.floor(Math.random() * petalPalette.length)];
      const size = 8 + Math.random() * 10;
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 90;

      p.style.left = e.clientX + "px";
      p.style.top = e.clientY + "px";
      p.style.width = size + "px";
      p.style.height = size * 1.3 + "px";
      p.style.setProperty("--from", from);
      p.style.setProperty("--to", to);
      p.style.setProperty("--bx", Math.cos(angle) * dist + "px");
      p.style.setProperty("--by", Math.sin(angle) * dist + "px");
      p.style.setProperty("--bspin", (Math.random() * 360 - 180) + "deg");

      field.appendChild(p);
      p.addEventListener("animationend", () => p.remove());
    }
  });
}

/* ============================================
   GATE PETAL RING (decorative, around the mascot)
   ============================================ */
function buildPetalRing(){
  const ring = document.getElementById("petalRing");
  if(!ring) return;
  const petalCount = 10;
  for(let i = 0; i < petalCount; i++){
    const s = document.createElement("span");
    const angle = (360 / petalCount) * i;
    s.style.transform = `translate(-50%,-100%) rotate(${angle}deg) translateY(-70px)`;
    s.dataset.angle = angle;
    ring.appendChild(s);
  }
}

/* ============================================
   GATE OPEN INTERACTION
   ============================================ */
function initGate(){
  const gate = document.getElementById("gate");
  const bouquet = document.getElementById("gateBouquet");
  const openBtn = document.getElementById("openGate");
  const ring = document.getElementById("petalRing");
  if(!gate || !bouquet || !openBtn) return;

  document.body.style.overflow = "hidden";

  const openFlowers = () => {
    if(bouquet.classList.contains("blooming")) return;
    bouquet.classList.add("blooming");

    // send the ring petals flying outward
    if(ring){
      Array.from(ring.children).forEach((s) => {
        const angle = parseFloat(s.dataset.angle);
        const dist = 260 + Math.random() * 120;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * dist;
        const y = Math.sin(rad) * dist;
        s.style.transition = "transform 1.1s cubic-bezier(.22,1,.36,1), opacity 1s ease";
        s.style.transform = `translate(${x}px, ${y}px) rotate(${angle + 180}deg) scale(.6)`;
        s.style.opacity = "0";
      });
    }

    setTimeout(() => {
      gate.classList.add("opened");
      document.body.style.overflow = "";
    }, 750);
  };

  openBtn.addEventListener("click", openFlowers);
  bouquet.addEventListener("click", openFlowers);
}

/* ============================================
   HERO PHOTO PARALLAX
   Gentle tilt that follows the cursor, disabled
   for touch devices and reduced-motion users.
   ============================================ */
function initHeroParallax(){
  const frame = document.querySelector(".hero-frame");
  const photo = document.querySelector(".hero-photo");
  if(!frame || !photo) return;
  if(window.matchMedia("(hover: none)").matches) return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  frame.addEventListener("mousemove", (e) => {
    const rect = frame.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    photo.style.transform = `rotate(-2deg) rotateX(${py * -8}deg) rotateY(${px * 10}deg) scale(1.02)`;
  });
  frame.addEventListener("mouseleave", () => {
    photo.style.transform = "rotate(-2deg)";
  });
}

/* ============================================
   GALLERY SCROLL REVEAL
   Polaroids drift and fade up into place as
   they enter the viewport, staggered.
   ============================================ */
function initGalleryReveal(){
  const cards = document.querySelectorAll(".polaroid");
  if(!cards.length) return;

  if(!("IntersectionObserver" in window)){
    cards.forEach((c) => c.classList.add("in-view"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -40px 0px" });

  cards.forEach((c) => io.observe(c));
}

/* ============================================
   INIT
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  buildPetalRing();
  buildGallery();
  spawnPetals();
  initPetalBurst();
  initGate();
  initHeroParallax();
  initGalleryReveal();
});
