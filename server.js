const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const auth = require('./controllers/authorization');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const signout = require('./controllers/signout');
const joke = require('./controllers/joke');
const favourite = require('./controllers/favourite');


const db = knex({
    client: 'pg',
    connection: {
       connectionString: process.env.POSTGRES_URL,
       ssl: true,
    }
});

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send('its working') });
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/signout', auth.requireAuth, (req, res) => {signout.handleSignout(req, res)});
app.post('/joke', auth.requireAuth, (req,res) => {joke.handleJokePost(req, res, db)});
app.get('/profile/:id', auth.requireAuth, (req,res) => {profile.handleProfileGet(req, res, db)});
app.post('/profile/:id', auth.requireAuth, (req, res) => {profile.handleProfileUpdate(req, res, db)})
app.get('/joke', auth.requireAuth, (req,res) => {joke.handleJokeGet(req, res, db)});
app.get('/favourite/:id', auth.requireAuth, (req,res) => {favourite.handleFavouriteGet(req, res, db)});
app.post('/favourite', auth.requireAuth, (req, res) => {favourite.handleFavourites(req, res, db)});
app.delete('/favourite', auth.requireAuth, (req, res) => {favourite.handleFavouriteDelete(req, res, db)})
app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})