// 由本人提供的照片采样字符，不生成或改变人物形象。
(() => {
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 document.querySelectorAll('.matrix-portrait').forEach(canvas=>{
  const frame=canvas.closest('.riding-cutout'),image=frame.querySelector('img'),ctx=canvas.getContext('2d'),base=document.createElement('canvas'),sample=document.createElement('canvas');
  const bc=base.getContext('2d'),sc=sample.getContext('2d',{willReadFrequently:true});
  let w=0,h=0,points=[],ready=false,visible=false,raf=0,last=0,power=0;
  const mouse={x:0,y:0,tx:0,ty:0,active:false};
  function resize(){if(!ready)return;cancelAnimationFrame(raf);raf=0;w=canvas.clientWidth;h=canvas.clientHeight;if(!w||!h)return;const ratio=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);base.width=canvas.width;base.height=canvas.height;bc.setTransform(ratio,0,0,ratio,0,0);
   const cell= Math.max(3.3,w/138),line=cell*1.47,cols=Math.ceil(w/cell),rows=Math.ceil(h/line),font=cell*1.48;sample.width=cols;sample.height=rows;sc.drawImage(image,0,0,cols,rows);const pixels=sc.getImageData(0,0,cols,rows).data,palette='.,:;i1tfLCG08@';points=[];bc.font=`500 ${font}px "JetBrains Mono",monospace`;bc.textBaseline='middle';
   for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){const idx=(row*cols+col)*4,r=pixels[idx],g=pixels[idx+1],b=pixels[idx+2],lum=(r*.3+g*.58+b*.12)/255;const ni=(row*cols+Math.min(cols-1,col+1))*4,edge=Math.min(.4,Math.abs(lum-(pixels[ni]*.3+pixels[ni+1]*.58+pixels[ni+2]*.12)/255));const opacity=pixels[idx+3]/255;const alpha=Math.min(.98,(.19+Math.pow(lum,.72)*.8+edge*.3)*opacity);if(opacity<.15)continue;const char=palette[Math.min(palette.length-1,Math.floor(lum*palette.length))],x=col*cell,y=row*line+line/2;points.push({x,y,char,alpha,font});bc.fillStyle=`rgba(238,238,238,${alpha})`;bc.fillText(char,x,y);}
   ctx.clearRect(0,0,w,h);ctx.drawImage(base,0,0,w,h);frame.classList.add('photo-ready');mouse.x=mouse.tx=w*.5;mouse.y=mouse.ty=h*.5;power=0;
  }
  function draw(now){raf=0;if(!ready||!visible||document.hidden)return;const dt=Math.min(50,last?now-last:16);last=now;const follow=1-Math.exp(-dt/75);mouse.x+=(mouse.tx-mouse.x)*follow;mouse.y+=(mouse.ty-mouse.y)*follow;const target=mouse.active&&!reduced.matches?1:0;power+=(target-power)*(1-Math.exp(-dt/120));ctx.clearRect(0,0,w,h);ctx.drawImage(base,0,0,w,h);
   if(power>.008){const radius=Math.min(100,w*.24);ctx.save();ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(mouse.x,mouse.y,radius+5,0,Math.PI*2);ctx.fill();ctx.restore();for(const p of points){const dx=p.x-mouse.x,dy=p.y-mouse.y,d=Math.hypot(dx,dy);if(d>radius+9)continue;const push=Math.max(0,1-d/radius)*power*23;ctx.font=`500 ${p.font}px "JetBrains Mono",monospace`;ctx.textBaseline='middle';ctx.fillStyle=`rgba(238,238,238,${Math.min(1,p.alpha+power*.07)})`;ctx.fillText(p.char,p.x+(d?dx/d:0)*push,p.y+(d?dy/d:0)*push);}}
   if(!reduced.matches&&(Math.abs(target-power)>.008||Math.hypot(mouse.tx-mouse.x,mouse.ty-mouse.y)>.2))raf=requestAnimationFrame(draw);
  }
  function schedule(){if(!raf&&ready&&visible&&!document.hidden)raf=requestAnimationFrame(draw);}
  canvas.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse'||reduced.matches)return;const r=canvas.getBoundingClientRect();mouse.tx=event.clientX-r.left;mouse.ty=event.clientY-r.top;mouse.active=true;schedule();},{passive:true});canvas.addEventListener('pointerleave',()=>{mouse.active=false;schedule();});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();else{cancelAnimationFrame(raf);raf=0;}},{rootMargin:'60px'}).observe(canvas);
  new ResizeObserver(resize).observe(canvas);document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(raf);raf=0;if(!document.hidden)schedule();});reduced.addEventListener('change',()=>{mouse.active=false;power=0;schedule();});
  Promise.all([image.decode(),document.fonts.ready]).then(()=>{ready=true;resize();schedule();}).catch(()=>{frame.classList.add('photo-fallback');});
 });
})();
