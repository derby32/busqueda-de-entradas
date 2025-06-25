document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('code-input');
  const result = document.getElementById('result');

  function checkCode(code) {
    fetch('/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
    .then(res => res.json())
    .then(data => {
      result.textContent = data.message + (data.type ? ` - Tipo: ${data.type}` : '');
    })
    .catch(err => {
      result.textContent = 'Error de comunicacion';
      console.error(err);
    })
    .finally(() => {
      input.value = '';
      input.focus();
    });
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const code = input.value.trim();
      if (code) {
        checkCode(code);
      }
    }
  });
});
