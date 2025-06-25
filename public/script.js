const input = document.getElementById('ticket');
const status = document.getElementById('status');

async function checkTicket(code) {
  try {
    const res = await fetch(`/check?code=${encodeURIComponent(code)}`);
    const data = await res.json();
    document.body.classList.remove('ok', 'used', 'vip');
    status.textContent = '';
    if (data.valid) {
      if (data.type === 'VIP') {
        document.body.classList.add('vip');
        status.textContent = 'Entrada VIP';
      } else {
        document.body.classList.add('ok');
        status.textContent = 'Entrada válida';
      }
    } else {
      document.body.classList.add('used');
      if (data.reason === 'not_found') {
        status.textContent = 'Código no encontrado';
      } else if (data.reason === 'already_used') {
        status.textContent = 'Código ya utilizado';
      } else if (data.message) {
        status.textContent = data.message;
      } else {
        status.textContent = 'Código inválido o ya utilizado';
      }
    }
  } catch (e) {
    document.body.classList.remove('ok', 'vip');
    document.body.classList.add('used');
    status.textContent = 'Error al verificar';
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
