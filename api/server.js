const express = require('../node_modules/express');
const app = express();
const routes = require('../routes/routes');
const bodyParser = require('../node_modules/body-parser');
const cors = require('../node_modules/cors')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

routes(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Connected to port ${PORT}`))