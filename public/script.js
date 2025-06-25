const input = document.getElementById('ticket');

async function checkTicket(code) {
  try {
    const res = await fetch(`/check?code=${encodeURIComponent(code)}`);
    const data = await res.json();
    document.body.classList.remove('ok', 'used', 'vip');
    if (data.valid) {
      if (data.type === 'VIP') {
        document.body.classList.add('vip');
      } else {
        document.body.classList.add('ok');
      }
    } else {
      document.body.classList.add('used');
    }
  } catch (e) {
    document.body.classList.remove('ok', 'vip');
    document.body.classList.add('used');
  } finally {
    input.value = '';
    input.focus();
  }
}

input.addEventListener('keydown', (ev) => {
  if (ev.key === 'Enter' && input.value.trim()) {
    checkTicket(input.value.trim());
  }
});
