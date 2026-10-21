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
