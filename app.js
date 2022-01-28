// dotenv 
require('dotenv').config();

const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// helmet à vérifier rdx
const helmet = require('helmet');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// mongoose.connect('mongodb+srv://DevDX:MongoDB2@cluster0.wx2zv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
mongoose.connect(process.env.DB_HOST+'://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0.wx2zv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// helmet à vérifier rdx
// const helmet = require('helmet');
// app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
// app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json()); //équivalent à app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);// à vérifier sauces 
app.use('/api/auth', userRoutes);

module.exports = app; 