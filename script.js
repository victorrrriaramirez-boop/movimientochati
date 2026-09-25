const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const clamp = (a,b,v) => Math.max(a, Math.min(b,v));
const reveals = document.querySelectorAll('.reveal');
const statement = document.querySelector('.statement');
// Animate each thought as it enters without changing its accessible text.
statement.querySelectorAll('br').forEach(br => { const prev = br.previousSibling; if (prev?.nodeType === Node.TEXT_NODE && prev.textContent.trim()) { const span = document.createElement('span'); span.className='line-reveal'; span.textContent=prev.textContent; prev.replaceWith(span); } });
const phrase = statement.querySelector('em'); phrase.classList.add('line-reveal');
if (reduceMotion.matches || !('IntersectionObserver' in window)) document.querySelectorAll('.reveal,.line-reveal').forEach(el => el.classList.add('visible'));
else {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), {threshold: .12, rootMargin: '0px 0px -30px 0px'});
  document.querySelectorAll('.reveal,.line-reveal').forEach(el => observer.observe(el));
}
const progress = document.querySelector('.progress');
const hero = document.querySelector('.hero-image');
const dish = document.querySelector('.dish-photo');
const dishSection = document.querySelector('.dish-section');
const space = document.querySelector('.space-photo');
const portal = document.querySelector('.portal');
const portalWindow = document.querySelector('.portal-window');
const portalRing = document.querySelector('.portal-ring');
const words = document.querySelector('.words');
const wordElements = [...document.querySelectorAll('.word')];
const chapter = document.querySelector('.chapter-number');
let ticking = false;
function sectionProgress(el) { const r=el.getBoundingClientRect(); return clamp(0,1,-r.top/Math.max(1,r.height-innerHeight)); }
function update() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  const sections=['.hero','.manifesto','.dish-section','.space','.reservation'];
  let current=1; sections.forEach((selector,i)=>{if(document.querySelector(selector).getBoundingClientRect().top<innerHeight*.5)current=i+1}); chapter.textContent=String(current).padStart(2,'0');
  if (!reduceMotion.matches) {
    hero.style.transform = `scale(${1.1 + Math.min(scrollY / innerHeight, 1) * .13}) translateY(${Math.min(scrollY * .09, 100)}px)`;
    const d=sectionProgress(dishSection); dish.style.transform=`scale(${1.18-d*.18}) translateY(${(d-.5)*4}%)`;
    document.querySelector('.dish-progress span').style.transform=`scaleX(${d})`;
    const p=sectionProgress(portal); const zoom=1+p*7.5;
    portalWindow.style.transform=`scale(${zoom}) rotate(${(p-.5)*5}deg)`;
    portalWindow.style.borderRadius=`${45*(1-p)}% ${45*(1-p)}% ${4*(1-p)}% ${4*(1-p)}%`;
    portalRing.style.transform=`scale(${1+p*1.2})`;
    document.querySelector('.portal-copy').style.opacity=String(clamp(0,1,1-Math.abs(p-.48)*2.1));
    const w=sectionProgress(words)*3;
    wordElements.forEach((el,i)=>{
      const distance=Math.abs(w-(i+.5)); const opacity=clamp(0,1,1-distance*1.8);
      el.style.opacity=opacity; el.style.transform=`translateY(${(i+.5-w)*105}%) rotate(${(i+.5-w)*7}deg) scale(${.82+opacity*.18})`;
    });
    const s=space.parentElement.getBoundingClientRect(); space.style.transform=`scale(1.12) translateY(${clamp(-4,4,-s.top/innerHeight*4)}%)`;
  }
  ticking=false;
}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});
addEventListener('resize',update); update();
// Cursor halo and gently magnetic call-to-action, only for fine pointers.
if (matchMedia('(pointer:fine)').matches && !reduceMotion.matches) {
  const glow=document.querySelector('.cursor-glow');
  addEventListener('pointermove',e=>{glow.classList.add('active');glow.style.left=`${e.clientX}px`;glow.style.top=`${e.clientY}px`},{passive:true});
  document.querySelectorAll('.reserve-button,.header-cta').forEach(el=>{
    el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.translate=`${(e.clientX-r.left-r.width/2)*.12}px ${(e.clientY-r.top-r.height/2)*.18}px`});
    el.addEventListener('pointerleave',()=>el.style.translate='0 0');
  });
}
// Sparse particles over the opening scene. Pauses when offscreen or motion is reduced.
const canvas=document.querySelector('#embers');
if (!reduceMotion.matches && canvas.getContext) {
  const ctx=canvas.getContext('2d'); let active=false, running=false, particles=[],width=0,height=0;
  function size(){const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);particles=Array.from({length:Math.min(75,Math.round(width/19))},()=>({x:Math.random()*width,y:Math.random()*height,r:Math.random()*1.6+.3,s:Math.random()*.55+.15,a:Math.random()*.5+.15}))}
  size();addEventListener('resize',size);
  new IntersectionObserver(([e])=>{active=e.isIntersecting;if(active&&!running){running=true;requestAnimationFrame(draw)}}).observe(canvas);
  function draw(){if(!active){running=false;return}ctx.clearRect(0,0,width,height);for(const p of particles){p.y-=p.s;if(p.y<0){p.y=height;p.x=Math.random()*width}ctx.fillStyle=`rgba(215,178,255,${p.a})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}
}
