const express = require('express');
const connectDB = require('../../data/db');
const dotenv = require('dotenv').config()
const path = require('path');
const app = express();

connectDB();

// middlewares
app.use(express.static(path.join(__dirname ,'public')));
app.use(express.json());

app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`app is started running on http://localhost:${PORT}`))

app.get('/', (req, res) => {
    res.sendFile('index.html');
})