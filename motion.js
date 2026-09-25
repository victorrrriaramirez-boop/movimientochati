const motionOff=matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(v,min=0,max=1)=>Math.max(min,Math.min(max,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const story=document.querySelector('.story-track');
const panels=[...document.querySelectorAll('.story-panel')];
const transition=document.querySelector('.chapter-transition');
const portal=document.querySelector('.transition-window');
const ring=document.querySelector('.transition-ring');
const hero=document.querySelector('.hero-bg');
const nav=document.querySelector('.nav');
const progress=document.querySelector('.scroll-progress');
let target=scrollY, smooth=scrollY, ticking=false;
const range=(el,y)=>{const top=el.getBoundingClientRect().top+y;return clamp((y-top)/Math.max(el.offsetHeight-innerHeight,1))};
function render(){target=scrollY;smooth=motionOff?target:lerp(smooth,target,.13);if(Math.abs(smooth-target)<.4)smooth=target;
 const max=document.documentElement.scrollHeight-innerHeight;
 progress.style.transform=`scaleX(${max?target/max:0})`;
 nav.classList.toggle('scrolled',target>100);
 let scene=1;document.querySelectorAll('[data-scene]').forEach(el=>{if(el.getBoundingClientRect().top<innerHeight*.5)scene=Number(el.dataset.scene)});document.querySelector('#scene-number').textContent=String(scene).padStart(2,'0');
 if(!motionOff){
  hero.style.transform=`scale(${1.08+clamp(smooth/innerHeight)*.13}) translateY(${clamp(smooth/innerHeight)*5}%)`;
  const st=range(story,smooth), phase=st*3;
  panels.forEach((el,i)=>{const diff=Math.abs(phase-(i+.46));const opacity=clamp(1.9-diff*1.45);el.style.opacity=opacity;el.style.transform=`translateY(${(i+.46-phase)*6}%)`;el.querySelector('.story-photo').style.transform=`scale(${1.17-opacity*.1}) translateY(${(phase-i-.46)*3}%)`});
  document.querySelector('.story-meter span').style.transform=`scaleX(${st})`;
  const pt=range(transition,smooth);portal.style.transform=`scale(${1+pt*8}) rotate(${(pt-.5)*4}deg)`;portal.style.borderRadius=`${48*(1-pt)}% ${48*(1-pt)}% ${4*(1-pt)}% ${4*(1-pt)}%`;ring.style.transform=`scale(${1+pt*1.4})`;
 }
 if(Math.abs(smooth-target)>.4)requestAnimationFrame(render);else ticking=false;
}
function requestRender(){if(!ticking){ticking=true;requestAnimationFrame(render)}}
addEventListener('scroll',requestRender,{passive:true});addEventListener('resize',requestRender);requestRender();
if('IntersectionObserver' in window && !motionOff){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -20px 0px'});
 document.querySelectorAll('.section-rule,.intro-grid,.editorial,.photo-spread,.menu-intro,.menu-section,.experience-grid,.reserve-grid,.gallery,.location-grid').forEach(el=>observer.observe(el));
 document.querySelectorAll('.menu-row').forEach(el=>{el.classList.add('reveal-row');observer.observe(el)});
}else document.querySelectorAll('.section-rule,.intro-grid,.editorial,.photo-spread,.menu-intro,.menu-section,.experience-grid,.reserve-grid,.gallery,.location-grid').forEach(el=>el.classList.add('in-view'));
const toggle=document.querySelector('.mobile-toggle'),mobile=document.querySelector('#mobile-navigation');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');toggle.textContent=open?'×':'☰';mobile.hidden=!open});
mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');toggle.textContent='☰'}));
addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobile.hidden){mobile.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.focus()}});
if(!motionOff && matchMedia('(pointer:fine)').matches){const cursor=document.querySelector('.ambient-cursor');addEventListener('pointermove',e=>{cursor.classList.add('active');cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'},{passive:true});document.querySelectorAll('.ghost,.nav-reserve,.reserve-location').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.translate=`${(e.clientX-r.left-r.width/2)*.1}px ${(e.clientY-r.top-r.height/2)*.15}px`});el.addEventListener('pointerleave',()=>el.style.translate='0 0')})}
// Sparse warm sparks in the opening scene. Rendering stops when the scene leaves the viewport.
const canvas=document.querySelector('#hero-particles');
if(!motionOff&&canvas?.getContext){const ctx=canvas.getContext('2d');let active=false,running=false,points=[],w=0,h=0;function resize(){const r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);w=r.width;h=r.height;canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);points=Array.from({length:Math.min(65,Math.round(w/23))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+.3,v:Math.random()*.42+.12,a:Math.random()*.45+.1}))}resize();addEventListener('resize',resize);new IntersectionObserver(([entry])=>{active=entry.isIntersecting;if(active&&!running){running=true;requestAnimationFrame(draw)}}).observe(canvas);function draw(){if(!active){running=false;return}ctx.clearRect(0,0,w,h);for(const p of points){p.y-=p.v;if(p.y<0){p.y=h;p.x=Math.random()*w}ctx.fillStyle=`rgba(238,183,120,${p.a})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}}
