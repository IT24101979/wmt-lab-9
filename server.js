require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const students = require('./routes/students')
const menuItem = require('./routes/menuItems')
const orders = require('./routes/orders')
const analytics = require('./routes/analytics')

const app = express()
const PORT = 3000


MONGODB_URI = process.env.MONGODB_URI


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });


// Middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('API active')
})

app.use('/students', students);
app.use('/menu-items', menuItem);
app.use('/orders', orders);
app.use('/analytics', analytics);
