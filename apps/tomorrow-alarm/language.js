// Options are generated for the current page, preserving privacy/support routes.
document.getElementById('language')?.addEventListener('change', (event) => {
  const destination = new URL(event.target.value, window.location.href);
  if (destination.origin === window.location.origin) window.location.assign(destination.href);
});
