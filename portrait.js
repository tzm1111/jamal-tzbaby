// 姓名字形只在尺寸或字体变化时采样，动画使用预计算点位。
(() => {
 const preference=matchMedia('(prefers-reduced-motion:reduce)');
 function lifecycle(canvas,resize,render){let visible=false,frame=0,last=0;
  function tick(time){frame=0;if(document.hidden||!visible)return;if(time-last>=32||preference.matches){const dt=Math.min(64,last?time-last:32);last=time;render(time,dt);}if(!preference.matches)frame=requestAnimationFrame(tick);}
  function restart(){cancelAnimationFrame(frame);frame=0;last=0;if(visible&&!document.hidden)tick(performance.now());}
  const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;restart();},{rootMargin:'40px'});io.observe(canvas);
  const ro=new ResizeObserver(()=>{cancelAnimationFrame(frame);frame=0;resize();restart();});ro.observe(canvas);
  document.fonts.ready.then(()=>{resize();restart();});document.addEventListener('visibilitychange',restart);preference.addEventListener('change',restart);resize();
 }
 document.querySelectorAll('.glyph-portrait').forEach(canvas=>{
  const ctx=canvas.getContext('2d'),mask=document.createElement('canvas'),mc=mask.getContext('2d');if(!ctx||!mc)return;let w=0,h=0,points=[];
  function resize(){w=Math.round(canvas.clientWidth);h=Math.round(canvas.clientHeight);if(!w||!h)return;const ratio=Math.min(devicePixelRatio||1,1.5);canvas.width=w*ratio;canvas.height=h*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);mask.width=w;mask.height=h;mc.fillStyle='white';mc.textAlign='center';mc.textBaseline='middle';mc.font=`900 ${Math.min(w*.65,h*.27)}px serif`;['唐','哲','马'].forEach((char,i)=>mc.fillText(char,w*.5,h*(.2+i*.29)));const pixels=mc.getImageData(0,0,w,h).data,chars='JAMAL唐哲马PRODUCT业务AI';points=[];let i=0;for(let y=8;y<h;y+=8)for(let x=4;x<w;x+=5)if(pixels[(y*w+x)*4+3]>100)points.push({x,y,char:chars[(i++)%chars.length],phase:x*.028+y*.021});render(0);}
  function render(t){ctx.clearRect(0,0,w,h);ctx.font='7px ui-monospace,monospace';const groups=Array.from({length:10},()=>[]);for(const p of points){const k=.2+.36*(Math.sin(p.phase+(preference.matches?0:t*.00045))+1)/2;groups[Math.min(9,Math.floor((k-.2)/.36*10))].push(p);}groups.forEach((g,i)=>{ctx.fillStyle=`rgba(231,163,95,${.2+(i+.5)/10*.36})`;g.forEach(p=>ctx.fillText(p.char,p.x,p.y));});}
  lifecycle(canvas,resize,render);
 });
 const canvas=document.querySelector('#finaleCanvas');if(!canvas)return;const ctx=canvas.getContext('2d'),mask=document.createElement('canvas'),mc=mask.getContext('2d');let w=0,h=0,points=[];const mouse={x:-1000,y:-1000};
 function resize(){w=Math.round(canvas.clientWidth);h=Math.round(canvas.clientHeight);if(!w||!h)return;const ratio=Math.min(devicePixelRatio||1,1.5);canvas.width=w*ratio;canvas.height=h*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);mask.width=w;mask.height=h;mc.fillStyle='white';mc.textAlign='center';mc.textBaseline='middle';mc.font=`900 ${w*.22}px Arial`;mc.fillText('JAMAL',w*.5,h*.46);const pixels=mc.getImageData(0,0,w,h).data;points=[];const gap=w<760?5:7;for(let y=0;y<h;y+=gap)for(let x=0;x<w;x+=gap)if(pixels[(y*w+x)*4+3]>100)points.push({x:Math.random()*w,y:Math.random()*h,tx:x,ty:y,alpha:.25+Math.random()*.6});render(0,32);}
 function render(t,dt){ctx.clearRect(0,0,w,h);const response=1-Math.exp(-dt/220),groups=Array.from({length:10},()=>[]);for(const p of points){const dx=p.tx-mouse.x,dy=p.ty-mouse.y,len=Math.hypot(dx,dy),repel=Math.max(0,1-len/130)*30;p.x+=(p.tx+(len?dx/len:0)*repel-p.x)*response;p.y+=(p.ty+(len?dy/len:0)*repel-p.y)*response;groups[Math.min(9,Math.floor((p.alpha-.25)/.6*10))].push(p);}groups.forEach((g,i)=>{ctx.fillStyle=`rgba(231,163,95,${.25+(i+.5)/10*.6})`;g.forEach(p=>ctx.fillRect(preference.matches?p.tx:p.x,preference.matches?p.ty:p.y,1.8,1.8));});}
 canvas.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=canvas.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;},{passive:true});canvas.addEventListener('pointerleave',()=>{mouse.x=-1000;mouse.y=-1000;});lifecycle(canvas,resize,render);
})();
