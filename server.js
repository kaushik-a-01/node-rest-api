const express = require('express');
const app = express();
const PORT = process.env.PORT||3000;

app.use(express.json());

// In-memory users data
let users = [
  { id: 1, name: "Anchal", email: "kaushik@gmail.com" },
  { id: 2, name: "Sudhanshu", email: "Singh@gmail.com.com" }
];
let nextId = 3;

// ====================== ROUTES ======================

// GET /users - Get all users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// POST /users - Create new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id - Update user
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = users.find(u => u.id === id);
  
  if (!user) return res.status(404).json({ error: "User not found" });

  if (name) user.name = name;
  if (email) user.email = email;

  res.status(200).json(user);
});

// DELETE /users/:id - Delete user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) return res.status(404).json({ error: "User not found" });

  users.splice(index, 1);
  res.status(200).json({ message: "User deleted successfully" });
});

// Home route
app.get('/', (req, res) => {
  res.send(`
    <h1>✅ Simple REST API is Running Successfully!</h1>
    <p>API Endpoints ready for CRUD operations.</p>
    <p>Server live at: <a href="http://localhost:3000">http://localhost:3000</a></p>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});