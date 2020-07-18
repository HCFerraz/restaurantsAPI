const express = require('../node_modules/express');
const app = express();
const routes = require('../routes/routes');
const bodyParser = require('../node_modules/body-parser');

app.use(bodyParser.json());

routes(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Connected'))