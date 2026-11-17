const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');

document.querySelector('#year').textContent = new Date().getFullYear();
const syncHeader=()=>header.classList.toggle('scrolled',window.scrollY>24);
addEventListener('pageshow',syncHeader);requestAnimationFrame(syncHeader);

const motionPreference=matchMedia('(prefers-reduced-motion:reduce)');
const firstLine=document.querySelector('.hero-line-left'),secondLine=document.querySelector('.hero h1 strong'),heroCopy=document.querySelector('.hero-copy');
let scrollFrame=0,pointerFrame=0;
window.addEventListener('scroll',()=>{if(scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;syncHeader();});},{passive:true});
let mouseX=innerWidth*.7,mouseY=innerHeight*.1;
window.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse'||motionPreference.matches)return;mouseX=event.clientX;mouseY=event.clientY;if(!pointerFrame)pointerFrame=requestAnimationFrame(()=>{pointerFrame=0;document.documentElement.style.setProperty('--mouse-x',`${mouseX}px`);document.documentElement.style.setProperty('--mouse-y',`${mouseY}px`);});},{passive:true});
motionPreference.addEventListener('change',()=>{if(motionPreference.matches){[firstLine,secondLine,heroCopy].forEach(el=>{if(el)el.style.transform='';});document.querySelectorAll('.magnetic').forEach(el=>el.style.translate='');}});

menuButton.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
  header.querySelector('.nav').inert=!open;
});

document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  header.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  header.querySelector('.nav').inert=innerWidth<=760;
}));

document.querySelectorAll('.note-filters button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.note-filters .active').classList.remove('active');
    button.classList.add('active');
    document.querySelectorAll('.note-filters button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    const filter = button.dataset.filter;
    const rows=[...document.querySelectorAll('.note-row')],before=new Map(rows.filter(r=>!r.classList.contains('hidden')).map(r=>[r,r.getBoundingClientRect()]));
    rows.forEach(row=>{row.getAnimations().forEach(a=>a.cancel());row.classList.toggle('hidden',filter!=='all'&&!row.dataset.category.split(' ').includes(filter));if(!row.classList.contains('hidden'))row.classList.add('visible');});
    if(!motionPreference.matches){const after=rows.filter(r=>!r.classList.contains('hidden')).map(row=>[row,row.getBoundingClientRect()]);after.forEach(([row,rect])=>{const old=before.get(row);row.animate(old?[{transform:`translate(${old.left-rect.left}px,${old.top-rect.top}px)`,opacity:.7},{transform:'translate(0,0)',opacity:1}]:[{transform:'translateY(12px)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:420,easing:'cubic-bezier(.22,1,.36,1)'});});}
  });
});

document.querySelectorAll('.note-filters button').forEach(b=>b.setAttribute('aria-pressed',String(b.classList.contains('active'))));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&header.classList.contains('menu-open')){header.classList.remove('menu-open');menuButton.setAttribute('aria-expanded','false');header.querySelector('.nav').inert=innerWidth<=760;menuButton.focus();}});
const wordmark=document.querySelector('.footer-wordmark');
function updateWordmark(){if(!wordmark)return;const r=wordmark.getBoundingClientRect();const p=Math.max(0,Math.min(1,(innerHeight-r.top)/(r.height+innerHeight*.15)));wordmark.style.setProperty('--wordmark-fill',`${p*100}%`);}
addEventListener('scroll',updateWordmark,{passive:true});addEventListener('resize',updateWordmark);updateWordmark();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('.magnetic').forEach((element) => {
  element.addEventListener('pointermove', (event) => {
    if (motionPreference.matches || event.pointerType !== 'mouse') return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * .08;
    const y = (event.clientY - rect.top - rect.height / 2) * .12;
    element.style.translate = `${x}px ${y}px`;
  });
  element.addEventListener('pointerleave', () => { element.style.translate = '0 0'; });
});

// 全站共享的轻量点阵渲染。
const waveCanvas=document.querySelector('#waveDots');if(waveCanvas)PortfolioMotion.wave(waveCanvas);
