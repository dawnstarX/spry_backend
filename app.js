const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// importing all the models 
require('./models')(app, mongoose);


// mongoDB set up
app.db = mongoose.createConnection(process.env.DB_URI, { useNewUrlParser: true, replicaSet: 'rs0', useFindAndModify: false });
app.db.on('error', async (error) => {
    console.error.bind(error, 'mongoose connection error: ')
});
app.db.once('open', function () {
    console.debug('connected');
});
app.db.on('disconnected',(err)=>{
    console.error('Mongoose Client disconnected',err);
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = { db: app.db, MODELS: app.db.models };
