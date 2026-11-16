// 全站动效只改变视觉反馈，保留浏览器原生滚动与导航。
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const ease = 'cubic-bezier(.22,1,.36,1)';
  const imageJobs = new WeakMap();
  function swapImage(image, src, alt, caption, text) {
    const token = {}; imageJobs.set(image, token);
    const preload = new Image(); preload.src = src;
    preload.decode().then(() => {
      if (imageJobs.get(image) !== token) return;
      image.getAnimations().forEach(a => a.cancel());
      image.src = src; image.alt = alt;
      if (caption) caption.textContent = text;
      if (!preference.matches) image.animate([{opacity:.35,transform:'scale(1.012)'},{opacity:1,transform:'scale(1)'}],{duration:420,easing:ease});
    }).catch(() => { if (imageJobs.get(image) === token) { image.src=src; image.alt=alt; if(caption) caption.textContent=text; } });
  }
  // 点阵路径按透明度分组绘制；暂停后台帧，按时间推进而非依赖屏幕刷新率。
  function wave(canvas, variant='home') {
    const ctx=canvas.getContext('2d'); if(!ctx)return;
    let w=0,h=0,points=[],frame=0,last=-Infinity;
    const pointer={x:innerWidth*.76,y:innerHeight*.18,tx:innerWidth*.76,ty:innerHeight*.18};
    function resize(){w=innerWidth;h=innerHeight;const ratio=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);points=[];const gap=w<760?18:20;for(let y=8;y<h+gap;y+=gap)for(let x=8;x<w+gap;x+=gap)points.push({x,y});last=-Infinity;}
    function draw(time=0){
      frame=0;if(document.hidden)return;
      if(time-last>=32||preference.matches){last=time;pointer.x+=(pointer.tx-pointer.x)*.12;pointer.y+=(pointer.ty-pointer.y)*.12;ctx.clearRect(0,0,w,h);const buckets=Array.from({length:12},()=>[]),phase=(preference.matches?0:time*.00032)+(variant==='home'?scrollY*.0012:0);
        for(const p of points){const oscillation=variant==='home'?Math.sin(p.x*.012+phase*2.1)+Math.cos(p.y*.016-phase*1.7)+Math.sin((p.x+p.y)*.006-phase):Math.sin(p.x*.006+p.y*.007+phase);const ridge=variant==='home'?Math.max(0,(oscillation+1.15)/4.15):(oscillation+1)/2,lift=variant==='home'?Math.max(0,1-Math.hypot(p.x-pointer.x,p.y-pointer.y)/310):0;const alpha=variant==='home'?.018+ridge*.105+lift*.07:.014+ridge*.055;const bucket=Math.min(11,Math.floor(alpha/.2*12));buckets[bucket].push([p.x+oscillation*1.5,p.y+oscillation*.67,.42+ridge*.72+lift*.25]);}
        buckets.forEach((dots,i)=>{if(!dots.length)return;ctx.beginPath();for(const [x,y,r]of dots){ctx.moveTo(x+r,y);ctx.arc(x,y,r,0,Math.PI*2);}ctx.fillStyle=`rgba(225,216,203,${(i+.5)/12*.2})`;ctx.fill();});
      }
      if(!preference.matches)frame=requestAnimationFrame(draw);
    }
    const restart=()=>{cancelAnimationFrame(frame);last=-Infinity;draw(performance.now());};
    addEventListener('pointermove',e=>{if(e.pointerType==='mouse'){pointer.tx=e.clientX;pointer.ty=e.clientY;}},{passive:true});
    addEventListener('resize',()=>{resize();restart();},{passive:true});
    document.addEventListener('visibilitychange',restart);preference.addEventListener('change',restart);resize();restart();
  }
  window.PortfolioMotion={swapImage,wave};
  function init(){
    // details 保留原生语义与键盘操作，快速反向点击从当前高度继续。
    document.querySelectorAll('details').forEach(details=>{
      const summary=details.querySelector('summary');if(!summary)return;
      const content=document.createElement('div');content.className='disclosure-content';
      [...details.childNodes].filter(node=>node!==summary).forEach(node=>content.append(node));details.append(content);
      let desired=details.open,animation;
      summary.addEventListener('click',e=>{
        if(preference.matches){desired=!details.open;return;}e.preventDefault();desired=!desired;
        const from=details.open?content.getBoundingClientRect().height:0;
        animation?.cancel();details.open=true;const to=desired?content.scrollHeight:0;
        content.style.overflow='hidden';
        animation=content.animate([{height:`${from}px`,opacity:from?1:0},{height:`${to}px`,opacity:desired?1:0}],{duration:Math.abs(to-from)<1?0:340,easing:ease});
        animation.onfinish=()=>{details.open=desired;content.style.overflow='';animation=null;};
      });
      preference.addEventListener('change',()=>{if(preference.matches){animation?.cancel();animation=null;details.open=desired;content.style.overflow='';}});
    });
    const header=document.querySelector('.site-header'),links=[...document.querySelectorAll('.site-header .nav a')],sections=[...document.querySelectorAll('main>section[id]')];
    if(header){const menu=header.querySelector('.nav'),button=header.querySelector('.menu-button');menu.id='site-navigation';button.setAttribute('aria-controls',menu.id);menu.inert=innerWidth<=760&&!header.classList.contains('menu-open');addEventListener('resize',()=>{if(innerWidth>760){header.classList.remove('menu-open');button.setAttribute('aria-expanded','false');}menu.inert=innerWidth<=760&&!header.classList.contains('menu-open');});document.addEventListener('pointerdown',e=>{if(header.classList.contains('menu-open')&&!header.contains(e.target)){header.classList.remove('menu-open');button.setAttribute('aria-expanded','false');menu.inert=innerWidth<=760;}});}
    if(header&&sections.length){let scheduled=false;function mark(){scheduled=false;let section=sections[0];for(const s of sections){if(s.getBoundingClientRect().top<=innerHeight*.35)section=s;}links.forEach(a=>{const active=a.hash===`#${section.id}`;a.classList.toggle('current',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(mark);}},{passive:true});mark();}
    // 新版 Chrome 支持原生页面转场；不拦截链接、不影响返回与打开新标签。
    document.documentElement.classList.add('motion-ready');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
