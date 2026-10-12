import express from 'express';
import { readFileSync } from 'node:fs';

const app = express();
const port = 3001;

const seedTickets = JSON.parse(
  readFileSync(
    new URL('./data/tickets.json', import.meta.url),
    'utf8'
  )
);

console.log('Loaded tickets:', seedTickets.length);

let tickets = structuredClone(seedTickets);

const allowedStatuses = new Set([
  'Open',
  'In Progress',
  'Resolved',
]);

app.use(express.json());

// Simulate a short network delay so loading states can be observed
const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/tickets', async (req, res) => {
  await delay(300);

  if (req.query.fail === '1') {
    return res
      .status(503)
      .json({
        error: 'Temporary API failure for testing.',
      });
  }

  return res.json(tickets);
});



app.patch('/api/tickets/:id/status', async (req, res) => {
  await delay(300);

  if (req.query.fail === '1') {
    return res
      .status(503)
      .json({
        error: 'Temporary update failure for testing.',
      });
  }

  const { status } = req.body ?? {};

  if (!allowedStatuses.has(status)) {
    return res
      .status(400)
      .json({ error: 'Invalid status.' });
  }

  const ticket = tickets.find(
    (t) => t.id === req.params.id
  );

  if (!ticket) {
    return res
      .status(404)
      .json({ error: 'Ticket not found.' });
  }

  ticket.status = status;

  return res.json(ticket);
});

// Reset data
app.post('/api/reset', (_req, res) => {
  tickets = structuredClone(seedTickets);
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Ticket API ready on http://localhost:${port}`);
});