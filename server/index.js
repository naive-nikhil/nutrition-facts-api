require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const foodRoutes = require('./routes/foodRoutes');

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:4321', // Default Astro dev server port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Routes
app.use('/api/foods', foodRoutes);

app.get('/', (req, res)=>{
    res.send('API is running...');
})

// Start server
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})