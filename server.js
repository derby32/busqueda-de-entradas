const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const csvFile = path.join(__dirname, 'tickets.csv');

function loadTickets() {
  if (!fs.existsSync(csvFile)) return [];
  const lines = fs.readFileSync(csvFile, 'utf8').trim().split(/\r?\n/);
  lines.shift(); // remove header
  return lines.map(line => {
    const [codigo, preventa, tipo, hora, obs] = line.split(',');
    return { codigo, preventa, tipo, hora, obs };
  });
}

let tickets = loadTickets();
const ticketsMap = new Map(tickets.map(t => [t.codigo, t]));

function saveTickets() {
  const header = 'numero de codigo,preventa,tipo de entrada,hora de ingreso,observaciones';
  const rows = tickets.map(t => [t.codigo, t.preventa, t.tipo, t.hora || '', t.obs || ''].join(','));
  fs.writeFileSync(csvFile, [header, ...rows].join('\n'), 'utf8');
}

app.post('/check', (req, res) => {
  const code = (req.body.code || '').trim();
  if (!code) {
    return res.json({ valid: false, message: 'No se recibio el codigo' });
  }
  const ticket = ticketsMap.get(code);
  if (!ticket) {
    return res.json({ valid: false, message: 'Codigo invalido' });
  }
  if (ticket.hora) {
    return res.json({ valid: false, message: 'Entrada ya utilizada', type: ticket.tipo, used: true });
  }
  ticket.hora = new Date().toISOString();
  saveTickets();
  return res.json({ valid: true, message: 'Entrada valida', type: ticket.tipo, used: false });
});

// Descargar el CSV actualizado
app.get('/export', (req, res) => {
  res.download(csvFile, 'tickets.csv');
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
