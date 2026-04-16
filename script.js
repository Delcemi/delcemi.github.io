const cursor = document.getElementById('cursor');
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const sections = document.querySelectorAll('section[id]');
const heroName = document.getElementById('heroName');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

function syncActiveLink() {
  const y = window.scrollY + 80;
  for (const s of sections) {
    const link = document.querySelector(`.nav-link[href="#${s.id}"]`);
    if (!link) continue;
    link.classList.toggle('active', y >= s.offsetTop && y < s.offsetTop + s.offsetHeight);
  }
}

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  syncActiveLink();
}, { passive: true });

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('.nav-link').forEach(l =>
  l.addEventListener('click', () => navLinks.classList.remove('open'))
);

// fade-in sections as they scroll into view
const io = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (!e.isIntersecting) return;
    setTimeout(() => e.target.classList.add('visible'), i * 60);
    io.unobserve(e.target);
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// hero name scramble, runs on load + on hover
const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const scrambleTarget = heroName.textContent;
let scrambleTimer = null;

function runScramble() {
  let i = 0;
  clearInterval(scrambleTimer);
  scrambleTimer = setInterval(() => {
    heroName.textContent = scrambleTarget
      .split('')
      .map((c, idx) => idx < i ? scrambleTarget[idx] : scrambleChars[Math.random() * scrambleChars.length | 0])
      .join('');
    if (i >= scrambleTarget.length) clearInterval(scrambleTimer);
    i += 0.4;
  }, 28);
}

runScramble();
heroName.addEventListener('mouseenter', runScramble);
