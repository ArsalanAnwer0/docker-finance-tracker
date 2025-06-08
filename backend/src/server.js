const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// In-memory storage
let expenses = [];
let events = [];

// Health check endpoint
app.get('/health', (req, res) => {
  res.send('OK');
});

//
// ─── EXPENSES ROUTES ─────────────────────────────────────────────────────────
//

// List all expenses
app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

// Get a single expense by id
app.get('/api/expenses/:id', (req, res) => {
  const exp = expenses.find(e => e.id === Number(req.params.id));
  if (!exp) return res.status(404).json({ error: 'Not found' });
  res.json(exp);
});

// Add a new expense or income
// Add a new expense or income
app.post('/api/expenses', (req, res) => {
  const { description, amount, type, category, date } = req.body;
  if (!description || amount == null || !type) {
    return res
      .status(400)
      .json({ error: 'description, amount and type are required' });
  }
  const newExpense = {
    id: Date.now(),
    description,
    amount,
    type,                          // "income" or "expense"
    category: category || null,    // optional
    date: date
      ? new Date(date).toISOString()
      : new Date().toISOString()
  };
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});


// Update an existing expense
app.put('/api/expenses/:id', (req, res) => {
  const idx = expenses.findIndex(e => e.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });

  const { description, amount, type, category, date } = req.body;
  if (
    description == null &&
    amount == null &&
    type == null &&
    category == null &&
    date == null
  ) {
    return res
      .status(400)
      .json({ error: 'At least one of description, amount, type, category, date required' });
  }

  const exp = expenses[idx];
  if (description != null) exp.description = description;
  if (amount != null)     exp.amount = amount;
  if (type != null)       exp.type = type;
  if (category != null)   exp.category = category;
  if (date != null)       exp.date = new Date(date).toISOString();

  res.json(exp);
});

// Delete an expense
app.delete('/api/expenses/:id', (req, res) => {
  const idx = expenses.findIndex(e => e.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const [deleted] = expenses.splice(idx, 1);
  res.json(deleted);
});

//
// ─── EVENTS ROUTES ────────────────────────────────────────────────────────────
//

// List all events
app.get('/api/events', (req, res) => {
  res.json(events);
});

// Add a new event
app.post('/api/events', (req, res) => {
  const { name, date, amount } = req.body;
  if (!name || !date || amount == null) {
    return res
      .status(400)
      .json({ error: 'name, date and amount are required' });
  }
  const newEvent = {
    id: Date.now(),
    name,
    date: new Date(date).toISOString(),
    amount
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Delete an event
app.delete('/api/events/:id', (req, res) => {
  const idx = events.findIndex(e => e.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const [deleted] = events.splice(idx, 1);
  res.json(deleted);
});

//
// ─── START SERVER ─────────────────────────────────────────────────────────────
//

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
