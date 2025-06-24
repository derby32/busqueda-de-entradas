const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sample ticket data
const tickets = {
  'ABC123': { type: 'VIP', used: false },
  'DEF456': { type: 'General', used: false },
  'GHI789': { type: 'Premium', used: false }
};

app.post('/check', (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.json({ valid: false, message: 'No se recibio el codigo' });
  }
  const ticket = tickets[code];
  if (!ticket) {
    return res.json({ valid: false, message: 'Codigo invalido' });
  }
  if (ticket.used) {
    return res.json({ valid: false, message: 'Entrada ya utilizada', type: ticket.type, used: true });
  }
  ticket.used = true;
  return res.json({ valid: true, message: 'Entrada valida', type: ticket.type, used: false });
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
