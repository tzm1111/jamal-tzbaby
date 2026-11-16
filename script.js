const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const rail = document.querySelector('#projectRail');
const cards = [...document.querySelectorAll('.project-card')];
const current = document.querySelector('#railCurrent');

document.querySelector('#year').textContent = new Date().getFullYear();
const syncHeader=()=>header.classList.toggle('scrolled',window.scrollY>24);
addEventListener('pageshow',syncHeader);requestAnimationFrame(syncHeader);

const motionPreference=matchMedia('(prefers-reduced-motion:reduce)');
const firstLine=document.querySelector('.hero-line-left'),secondLine=document.querySelector('.hero h1 strong'),heroCopy=document.querySelector('.hero-copy');
let scrollFrame=0,pointerFrame=0;
window.addEventListener('scroll',()=>{if(scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;syncHeader();const progress=Math.min(scrollY/620,1);if(firstLine&&secondLine&&heroCopy&&!motionPreference.matches){firstLine.style.transform=`translate3d(${-progress*48}px,${-progress*8}px,0)`;secondLine.style.transform=`translate3d(${progress*34}px,${-progress*14}px,0)`;heroCopy.style.transform=`translate3d(0,${-progress*14}px,0)`;}});},{passive:true});
let mouseX=innerWidth*.7,mouseY=innerHeight*.1;
window.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse'||motionPreference.matches)return;mouseX=event.clientX;mouseY=event.clientY;if(!pointerFrame)pointerFrame=requestAnimationFrame(()=>{pointerFrame=0;document.documentElement.style.setProperty('--mouse-x',`${mouseX}px`);document.documentElement.style.setProperty('--mouse-y',`${mouseY}px`);});},{passive:true});
motionPreference.addEventListener('change',()=>{if(motionPreference.matches)[firstLine,secondLine,heroCopy].forEach(el=>{if(el)el.style.transform='';});});

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

const scrollToCard = (index) => {
  const safeIndex = Math.min(Math.max(index, 0), cards.length - 1);
  const left = cards[safeIndex].getBoundingClientRect().left - rail.getBoundingClientRect().left + rail.scrollLeft;
  rail.scrollTo({left,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
};

const getActiveCard = () => {
  if(rail.scrollWidth>rail.clientWidth+2&&rail.scrollLeft>=rail.scrollWidth-rail.clientWidth-2)return cards.length-1;
  return cards.reduce((best, card, index) => {
    const distance = Math.abs(card.getBoundingClientRect().left - rail.getBoundingClientRect().left);
    return distance < best.distance ? { index, distance } : best;
  }, { index: 0, distance: Infinity }).index;
};

const moveRail=direction=>rail.scrollBy({left:direction*(cards[0].clientWidth+parseFloat(getComputedStyle(rail).columnGap)),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
document.querySelector('#projectPrev').addEventListener('click', () => moveRail(-1));
document.querySelector('#projectNext').addEventListener('click', () => moveRail(1));
let railFrame=0;
rail.addEventListener('scroll', () => {
  if(!railFrame)railFrame=requestAnimationFrame(()=>{railFrame=0;updateRailControls();});
}, { passive: true });

function updateRailControls(){current.textContent=String(getActiveCard()+1).padStart(2,'0');document.querySelector('#projectPrev').disabled=rail.scrollLeft<2;document.querySelector('#projectNext').disabled=rail.scrollLeft>=rail.scrollWidth-rail.clientWidth-2;}
rail.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();moveRail(1);}if(e.key==='ArrowLeft'){e.preventDefault();moveRail(-1);}if(e.key==='Home'){e.preventDefault();scrollToCard(0);}if(e.key==='End'){e.preventDefault();scrollToCard(cards.length-1);}});
let dragStart=0,dragScroll=0,dragActive=false,dragMoved=false,suppressClickUntil=0;
rail.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;dragActive=true;dragMoved=false;dragStart=e.clientX;dragScroll=rail.scrollLeft;});
rail.addEventListener('pointermove',e=>{if(!dragActive)return;const dx=e.clientX-dragStart;if(Math.abs(dx)>7&&!dragMoved){dragMoved=true;rail.classList.add('dragging');rail.setPointerCapture(e.pointerId);}if(dragMoved){e.preventDefault();rail.scrollLeft=dragScroll-dx;}});
function stopDrag(){if(!dragActive)return;const moved=dragMoved;if(moved)suppressClickUntil=Date.now()+300;dragActive=false;rail.classList.remove('dragging');if(moved)scrollToCard(getActiveCard());updateRailControls();}
addEventListener('pointerup',stopDrag);addEventListener('pointercancel',stopDrag);
rail.addEventListener('pointerup',stopDrag);rail.addEventListener('pointercancel',stopDrag);rail.addEventListener('lostpointercapture',stopDrag);rail.addEventListener('click',e=>{if(Date.now()<suppressClickUntil){e.preventDefault();e.stopPropagation();}},true);rail.addEventListener('dragstart',e=>e.preventDefault());addEventListener('resize',updateRailControls);updateRailControls();

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
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * .08;
    const y = (event.clientY - rect.top - rect.height / 2) * .12;
    element.style.translate = `${x}px ${y}px`;
  });
  element.addEventListener('pointerleave', () => { element.style.translate = '0 0'; });
});

// 全站共享的轻量点阵渲染。
const waveCanvas=document.querySelector('#waveDots');if(waveCanvas)PortfolioMotion.wave(waveCanvas);
