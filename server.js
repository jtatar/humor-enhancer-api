const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send("ITS WORKING") })

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})