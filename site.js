/* Progressive enhancement only. Content, download links and legal pages remain static. */
(() => {
  // Clear-coat highlight on the CSS carbon panels follows the pointer.
  document.querySelectorAll('[data-sheen]').forEach(panel => {
    panel.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      const box = panel.getBoundingClientRect();
      panel.style.setProperty('--mx', `${((event.clientX - box.left) / box.width) * 100}%`);
      panel.style.setProperty('--my', `${((event.clientY - box.top) / box.height) * 100}%`);
    });
    panel.addEventListener('pointerleave', () => {
      panel.style.removeProperty('--mx');
      panel.style.removeProperty('--my');
    });
  });

  // Products page: show all, only games, or only apps.
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const blocks = [...document.querySelectorAll('[data-kind]')];
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const kind = button.dataset.filter;
      filterButtons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      blocks.forEach(block => {
        block.hidden = kind !== 'all' && block.dataset.kind !== kind;
      });
    });
  });

  // Products page: the row of game cards loops, and two buttons step through it.
  // Without this script the row is a plain sideways scroller.
  document.querySelectorAll('.games').forEach(row => {
    const cards = [...row.children];
    if (cards.length < 2) return;
    const copyOf = card => {
      const copy = card.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      copy.removeAttribute('aria-labelledby');
      copy.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
      copy.querySelectorAll('a, button').forEach(node => { node.tabIndex = -1; });
      copy.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
      return copy;
    };
    // One full copy of the cards on each side: [copies][cards][copies].
    const firstAfter = copyOf(cards[0]);
    row.append(firstAfter, ...cards.slice(1).map(copyOf));
    row.prepend(...cards.map(copyOf));
    row.classList.add('is-loop');

    const setWidth = () => firstAfter.offsetLeft - cards[0].offsetLeft;
    const step = () => cards[1].offsetLeft - cards[0].offsetLeft;
    let index = 0;
    let idle = 0;
    // Keep the left edge inside the real cards; a jump by one set shows the same picture.
    const wrap = () => {
      const width = setWidth();
      if (!width) return;
      if (row.scrollLeft < width) row.scrollLeft += width;
      else if (row.scrollLeft >= width * 2) row.scrollLeft -= width;
      index = Math.round((row.scrollLeft - width) / step());
    };
    row.addEventListener('scroll', () => {
      clearTimeout(idle);
      const end = row.scrollWidth - row.clientWidth;
      if (row.scrollLeft < 8 || row.scrollLeft > end - 8) wrap();
      else idle = setTimeout(wrap, 140);
    }, {passive: true});
    const place = () => {
      const width = setWidth();
      if (width) row.scrollLeft = width + index * step();
    };
    place();
    if ('ResizeObserver' in window) new ResizeObserver(place).observe(row);

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const arrow = '<svg class="i" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';
    const nav = document.createElement('div');
    nav.className = 'games-nav';
    [['prev', '前のゲーム', -1], ['next', '次のゲーム', 1]].forEach(([name, label, direction]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `games-nav-${name}`;
      button.setAttribute('aria-label', label);
      button.innerHTML = arrow;
      button.addEventListener('click', () => {
        row.scrollBy({left: direction * step(), behavior: calm.matches ? 'auto' : 'smooth'});
      });
      nav.append(button);
    });
    row.after(nav);
  });

  const dialogTriggers = new WeakMap();
  document.querySelectorAll('[data-film-open]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      const dialog = document.getElementById(trigger.dataset.filmOpen);
      if (!dialog || typeof dialog.showModal !== 'function' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      dialogTriggers.set(dialog, trigger);
      dialog.showModal();
      document.body.classList.add('film-open');
    });
  });
  document.querySelectorAll('dialog.product-film-dialog').forEach(dialog => {
    dialog.querySelector('[data-film-close]')?.addEventListener('click', () => dialog.close());
    let backdropPress = false;
    const isOutside = event => {
      const box = dialog.getBoundingClientRect();
      return event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
    };
    dialog.addEventListener('pointerdown', event => { backdropPress = event.target === dialog && isOutside(event); });
    dialog.addEventListener('click', event => {
      if (backdropPress && event.target === dialog && isOutside(event)) dialog.close();
      backdropPress = false;
    });
    dialog.addEventListener('close', () => {
      dialog.querySelector('video')?.pause();
      if (!document.querySelector('dialog[open]')) document.body.classList.remove('film-open');
      dialogTriggers.get(dialog)?.focus({preventScroll:true});
    });
  });

  document.querySelectorAll('video').forEach(video => {
    const reportError = () => {
      if (video.nextElementSibling?.classList.contains('media-error')) return;
      const output = document.createElement('output');
      output.className = 'media-error';
      output.setAttribute('role', 'status');
      output.append('動画を読み込めませんでした。');
      const link = document.createElement('a');
      link.href = video.getAttribute('src') || video.querySelector('source')?.getAttribute('src') || '';
      link.textContent = '動画を直接開く';
      link.target = '_blank';
      link.rel = 'noreferrer';
      output.append(link);
      video.after(output);
    };
    video.addEventListener('error', reportError);
    video.querySelectorAll('source').forEach(source => source.addEventListener('error', reportError));
    if (video.error) reportError();
  });
})();
