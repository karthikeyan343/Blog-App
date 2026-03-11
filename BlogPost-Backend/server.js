const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://localhost:27017/mern_app")
.then(console.log("db connected successfully"))
.catch((error)=>{console.log(error)});

app.use('/api/posts',postRoutes);
app.use('/api/categories',categoryRoutes);
app.listen(PORT,()=>{console.log(`server is running on the port ${PORT}`);});
