// 精简文章目录与列表筛选，保持原生链接、滚动和键盘操作。
(() => {
  const smallScreen = matchMedia('(max-width:1099px)');
  const toc = document.querySelector('.article-toc');
  if (toc) {
    const label = toc.querySelector(':scope > span');
    const list = toc.querySelector('ul');
    const button = document.createElement('button');
    button.className = 'toc-toggle';
    button.type = 'button';
    button.innerHTML = '<span>本文内容</span><span aria-hidden="true">＋</span>';
    list.id = 'article-contents';
    list.classList.add('toc-links');
    button.setAttribute('aria-controls', list.id);
    label.replaceWith(button);
    const expand = value => {
      list.hidden = !value;
      button.setAttribute('aria-expanded', String(value));
      button.lastElementChild.textContent = value ? '−' : '＋';
    };
    const reset = () => expand(!smallScreen.matches);
    button.addEventListener('click', () => expand(button.getAttribute('aria-expanded') !== 'true'));
    smallScreen.addEventListener('change', reset);
    list.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      if (smallScreen.matches) expand(false);
    }));
    reset();
    const links = [...list.querySelectorAll('a')];
    const headings = links.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1))));
    let frame = 0;
    const mark = () => {
      frame = 0;
      let current = -1;
      headings.forEach((heading, index) => { if (heading && heading.getBoundingClientRect().top <= 160) current = index; });
      links.forEach((link, index) => {
        if (index === current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(mark); }, {passive:true});
    mark();
  }
  const filters = [...document.querySelectorAll('.notes-index [data-filter]')];
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    const rows = [...document.querySelectorAll('.notes-index .note-row')];
    rows.forEach(row => row.classList.toggle('hidden', button.dataset.filter !== 'all' && !row.dataset.category.split(' ').includes(button.dataset.filter)));
    document.querySelector('.filter-count').textContent = `${rows.filter(row => !row.classList.contains('hidden')).length} 篇文章`;
  }));
  // 内页统一提供联系入口。
  document.querySelectorAll('.project-header nav,.detail-header nav').forEach(nav => {
    if (nav.querySelector('a[href$="#contact"]')) return;
    const link = document.createElement('a');
    link.href = '../../#contact';
    link.textContent = '联系';
    nav.append(link);
  });
})();
