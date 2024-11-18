const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

const config = require('./config/db');
const APIRouter =  require('./routes/contacts')

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.db, {
    useUnifiedtopology: true,
});

mongoose.connection.on('connected', () =>{
    console.log("Succesfully connected to DB")
})

mongoose.connection.on('error', (err) =>{
    console.log("Error via connecting to DB: " + err)
})

app.get('/', (req, res) => {
    res.send('Главная страница сайта')
});

app.use('/api', APIRouter)

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
})