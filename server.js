const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const register = require('./controllers/register');

const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
});

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send('its working') })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})