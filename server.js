const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

routes(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Connected'))