// frontend/js/app.js
const API_URL = '/api/expenses';

// DOM refs
const form = document.getElementById('expense-form');
const descInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const messageDiv = document.getElementById('message');
const expenseList = document.getElementById('expense-list');
const typeButtons = document.querySelectorAll('.toggle-btn');
const categorySelect = document.getElementById('category');

// Current selection (default)
let selectedType = 'expense';

// Category options by type
const CATEGORIES = {
  expense: [
    'Rent', 'Utilities', 'Groceries', 'Club Membership',
    'Art Acquisition', 'Charitable Giving', 'Fine Dining', 'Travel & Leisure'
  ],
  income: ['Salary', 'Bonus', 'Dividends', 'Interest', 'Other']
};

// Populate dropdown based on type
function populateCategories(type) {
  categorySelect.innerHTML = '';
  CATEGORIES[type].forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
}

// Initialize categories
populateCategories(selectedType);

// Toggle handlers
typeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Activate selected button
    typeButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedType = btn.dataset.type;
    populateCategories(selectedType);
  });
});


// Fetch, render, and update overview
async function fetchExpenses() {
  try {
    console.log('Starting fetch...');
    const res = await fetch(API_URL);
    console.log('Fetch response:', res.status);
    
    const data = await res.json();
    console.log('Data received:', data);
    
    console.log('Starting render...');
    renderExpenses(data);
    renderOverview(data);
    console.log('Render complete');
    
  } catch (error) {
    console.error('Error details:', error);
    showMessage('Failed to load transactions: ' + error.message, true);
  }
}

// ADD THIS FUNCTION HERE:
function renderExpenses(items) {
  expenseList.innerHTML = '';
  items
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach(tx => {
      const li = document.createElement('li');
      li.className = 'expense-item';
      li.innerHTML = `
        <span>${tx.description}: $${tx.amount.toFixed(2)}</span>
        <button data-id="${tx.id}">Delete</button>
      `;
      expenseList.appendChild(li);
    });
}


// Remove the debug version of renderExpenses and keep it clean

// Recalculate overview cards
function renderOverview(items) {
  let net = 0;
  let monthlyExp = 0;
  const now = new Date();

  items.forEach(tx => {
    if (tx.type === 'income') {
      net += tx.amount;
    } else if (tx.type === 'expense') {
      net -= tx.amount;
      const d = new Date(tx.date);
      if (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      ) {
        monthlyExp += tx.amount;
      }
    }
  });

  document.getElementById('net-worth-value').textContent =
    `$${net.toLocaleString()}`;
  document.getElementById('monthly-expenses-value').textContent =
    `$${monthlyExp.toLocaleString()}`;
  document.getElementById('monthly-expenses-delta').textContent =
    `Last updated ${now.toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    })}`;
}

// Show feedback messages
function showMessage(msg, isError = false) {
  messageDiv.textContent = msg;
  messageDiv.style.color = isError ? 'red' : 'green';
  setTimeout(() => (messageDiv.textContent = ''), 3000);
}

// Handle form submission
form.addEventListener('submit', async e => {
  e.preventDefault();
  const description = descInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categorySelect.value;
  if (!description || isNaN(amount)) {
    showMessage('Fill out description and amount', true);
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description,
        amount,
        type: selectedType,
        category,
        date: new Date().toISOString()
      })
    });
    if (!res.ok) throw new Error();
    await res.json();

    form.reset();
    // Reset toggle
    selectedType = 'expense';
    typeButtons.forEach(b => b.classList.remove('active'));
    document.querySelector('.toggle-btn[data-type="expense"]').classList.add('active');
    populateCategories('expense');

    fetchExpenses();
    showMessage('Transaction recorded');
  } catch {
    showMessage('Failed to record transaction', true);
  }
});

// Handle deletion
expenseList.addEventListener('click', async e => {
  if (e.target.tagName === 'BUTTON') {
    const id = e.target.dataset.id;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      fetchExpenses();
      showMessage('Transaction deleted');
    } catch {
      showMessage('Failed to delete', true);
    }
  }
});

const EVENT_API_URL = '/api/events';

// DOM refs for events
const eventForm = document.getElementById('event-form');
const eventNameInput = document.getElementById('event-name');
const eventDateInput = document.getElementById('event-date');
const eventAmountInput = document.getElementById('event-amount');
const eventMessageDiv = document.getElementById('event-message');
const eventList = document.getElementById('event-list');

// Fetch and render events
async function fetchEvents() {
  try {
    const res = await fetch(EVENT_API_URL);
    const events = await res.json();
    renderEvents(events);
  } catch {
    showEventMessage('Failed to load events', true);
  }
}

// Render events list
function renderEvents(events) {
  eventList.innerHTML = '';
  
  if (events.length === 0) {
    eventList.innerHTML = '<li class="no-events">No upcoming events</li>';
    return;
  }

  // Sort events by date (upcoming first)
  events
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach(event => {
      const li = document.createElement('li');
      li.className = 'event-item';
      
      const eventDate = new Date(event.date);
      const formattedDate = eventDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      
      // Calculate days remaining
      const today = new Date();
      const diffTime = eventDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let daysText = '';
      if (diffDays < 0) {
        daysText = `${Math.abs(diffDays)} days ago`;
      } else if (diffDays === 0) {
        daysText = 'Today';
      } else if (diffDays === 1) {
        daysText = 'Tomorrow';
      } else {
        daysText = `${diffDays} days remaining`;
      }

      li.innerHTML = `
        <div class="event-info">
          <div class="event-title">${event.name}</div>
          <div class="event-details">
            <span class="event-amount">$${event.amount.toLocaleString()}</span>
            <span class="event-date">${formattedDate}</span>
            <span class="event-countdown">${daysText}</span>
          </div>
        </div>
        <button class="btn-delete-event" data-id="${event.id}">Delete</button>
      `;
      
      eventList.appendChild(li);
    });
}

// Show event feedback messages
function showEventMessage(msg, isError = false) {
  eventMessageDiv.textContent = msg;
  eventMessageDiv.style.color = isError ? 'red' : 'green';
  setTimeout(() => (eventMessageDiv.textContent = ''), 3000);
}

// Handle event form submission
eventForm.addEventListener('submit', async e => {
  e.preventDefault();
  
  const name = eventNameInput.value.trim();
  const date = eventDateInput.value;
  const amount = parseFloat(eventAmountInput.value);
  
  if (!name || !date || isNaN(amount)) {
    showEventMessage('Please fill out all fields', true);
    return;
  }

  try {
    const res = await fetch(EVENT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        date,
        amount
      })
    });
    
    if (!res.ok) throw new Error();
    
    eventForm.reset();
    fetchEvents();
    showEventMessage('Event added successfully');
  } catch {
    showEventMessage('Failed to add event', true);
  }
});

// Handle event deletion
eventList.addEventListener('click', async e => {
  if (e.target.classList.contains('btn-delete-event')) {
    const id = e.target.dataset.id;
    
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        const res = await fetch(`${EVENT_API_URL}/${id}`, { 
          method: 'DELETE' 
        });
        
        if (!res.ok) throw new Error();
        
        fetchEvents();
        showEventMessage('Event deleted');
      } catch {
        showEventMessage('Failed to delete event', true);
      }
    }
  }
});

// Update the initial load to include events
window.addEventListener('DOMContentLoaded', () => {
  fetchExpenses();
  fetchEvents(); // Add this line
});
