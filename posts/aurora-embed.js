(() => {
  const button=document.querySelector('#aurora-load');
  const host=document.querySelector('#aurora-player-host');
  const status=document.querySelector('#aurora-player-status');
  if(!button||!host||!status)return;
  button.hidden=false;
  button.addEventListener('click',()=>{
    const existing=host.querySelector('iframe');
    if(existing){
      existing.remove();host.hidden=true;button.textContent='体验 Aurora 播放器';button.setAttribute('aria-expanded','false');status.textContent='已收起，音乐已停止。';return;
    }
    const frame=document.createElement('iframe');
    frame.title='Aurora 音乐播放器：七种心境与本地音乐';
    frame.src=host.dataset.src;
    frame.allow='autoplay; fullscreen';
    frame.addEventListener('load',()=>{status.textContent='已加载，点击播放。';});
    host.hidden=false;host.append(frame);button.textContent='收起播放器';button.setAttribute('aria-expanded','true');status.textContent='正在加载播放器…';
  });
})();
