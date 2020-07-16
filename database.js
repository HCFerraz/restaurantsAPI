const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/restaurantes',
    { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;
database.once('open', () => console.log('Connected to database'));
database.on('error', (error) => console.log('Not connected to database', error));

module.exports = database;