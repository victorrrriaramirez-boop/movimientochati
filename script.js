const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const reveals = document.querySelectorAll('.reveal');
if (reduceMotion.matches || !('IntersectionObserver' in window)) reveals.forEach(el => el.classList.add('visible'));
else {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), {threshold: .12, rootMargin: '0px 0px -30px 0px'});
  reveals.forEach(el => observer.observe(el));
}
const progress = document.querySelector('.progress');
const hero = document.querySelector('.hero-image');
const dish = document.querySelector('.dish-photo');
const dishSection = document.querySelector('.dish-section');
const space = document.querySelector('.space-photo');
let ticking = false;
function update() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  if (!reduceMotion.matches) {
    hero.style.transform = `scale(${1.1 + Math.min(scrollY / innerHeight, 1) * .13}) translateY(${Math.min(scrollY * .09, 100)}px)`;
    const d = dishSection.getBoundingClientRect();
    const t = Math.max(0, Math.min(1, -d.top / Math.max(1, d.height - innerHeight)));
    dish.style.transform = `scale(${1.18 - t * .18}) translateY(${(t - .5) * 4}%)`;
    const s = space.parentElement.getBoundingClientRect();
    space.style.transform = `scale(1.12) translateY(${Math.max(-4, Math.min(4, -s.top / innerHeight * 4))}%)`;
  }
  ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, {passive:true});
addEventListener('resize', update); update();
