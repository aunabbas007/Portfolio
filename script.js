/* Typing Effect */
window.addEventListener("load", () => {
  const roles = [
    "Python Backend Engineer",
    "AI / ML Enthusiast",
    "FastAPI Developer",
    "Generative AI Builder"
  ];

  const typing = document.getElementById("typing");
  let i = 0, j = 0, del = false;

  function type() {
    const word = roles[i];
    typing.textContent = word.slice(0, j);

    if (!del && j < word.length) j++;
    else if (del && j > 0) j--;
    else {
      del = !del;
      if (!del) i = (i + 1) % roles.length;
    }
    setTimeout(type, del ? 60 : 100);
  }
  type();
});

/* Network Background */
/* ================= AI NETWORK ANIMATION ================= */

/* ================= AI NETWORK BACKGROUND ================= */

const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

let width, height;
let nodes = [];
const NODE_COUNT = 80;
let mouse = { x: null, y: null };

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Node {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.r = 2;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(37,99,235,0.8)";
    ctx.fill();
  }
}

function connect() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 140) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(37,99,235,${1 - dist / 140})`;
        ctx.stroke();
      }
    }

    if (mouse.x && mouse.y) {
      const dx = nodes[i].x - mouse.x;
      const dy = nodes[i].y - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);

      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = "rgba(99,102,241,0.6)";
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  nodes.forEach(n => {
    n.move();
    n.draw();
  });
  connect();
  requestAnimationFrame(animate);
}

nodes = Array.from({ length: NODE_COUNT }, () => new Node());
animate();



/* ================= SCROLL REVEAL ================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 120) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

