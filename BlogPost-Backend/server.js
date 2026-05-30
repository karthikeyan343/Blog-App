const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_app';

app.use(express.json());
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({
  origin: allowedOrigins
}));

mongoose.connect(MONGO_URI)
  .then(() => console.log('db connected successfully'))
  .catch((error) => {
    console.error('database connection failed:', error.message);
  });

app.use('/api/posts',postRoutes);
app.use('/api/categories',categoryRoutes);
app.use('/api/auth', authRoutes);
app.listen(PORT,()=>{console.log(`server is running on the port ${PORT}`);});
