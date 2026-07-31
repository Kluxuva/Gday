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
  { src: "images/photo-05.jpg", caption: "my favourite view", rotate: 3 },
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
    fig.style.transform = `rotate(${item.rotate}deg)`;
    fig.style.transitionDelay = `${i * 0.04}s`;

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
   ============================================ */
function spawnPetals(){
  const field = document.getElementById("petalField");
  if(!field) return;
  const glyphs = ["✿", "❀", "❁", "✾"];
  const count = window.innerWidth < 600 ? 14 : 24;

  for(let i = 0; i < count; i++){
    const p = document.createElement("span");
    p.className = "petal";
    p.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    p.style.left = Math.random() * 100 + "vw";
    p.style.setProperty("--drift", (Math.random() * 140 - 70) + "px");
    p.style.fontSize = (0.7 + Math.random() * 0.9) + "rem";
    p.style.animationDuration = (10 + Math.random() * 12) + "s";
    p.style.animationDelay = (Math.random() * -20) + "s";
    p.style.color = Math.random() > 0.5 ? "#C4415F" : "#CE9C4A";
    field.appendChild(p);
  }
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
   INIT
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  buildPetalRing();
  buildGallery();
  spawnPetals();
  initGate();
});
