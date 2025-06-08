-- Create the expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  category VARCHAR(100),
  date TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Insert some sample records
INSERT INTO expenses (description, amount, type, category) VALUES
  ('Monthly Salary', 5000.00, 'income', 'Salary'),
  ('Coffee', 3.50, 'expense', 'Food'),
  ('Groceries', 54.25, 'expense', 'Food'),
  ('Utilities', 120.00, 'expense', 'Bills');