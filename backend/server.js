// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let staff = [];

app.post('/api/hire-staff', (req, res) => {
  const newStaff = req.body;
  staff.push(newStaff);
  res.status(201).json({ message: 'Staff hired successfully!', staff: newStaff });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});