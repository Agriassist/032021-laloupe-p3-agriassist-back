const express = require('express');

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mainRouter = require('./routes');

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use('/images_profil', express.static('public/images_profil'));
app.use('/images_modele', express.static('public/images_modele'));
app.use('/images_fichetech', express.static('public/images_fichetech'));
app.use('/images_facture', express.static('public/images_facture'));
app.use('/images_bon_travail', express.static('public/bon_travail'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).json({ foo: 'hello' });
});

app.use('/api', mainRouter);

module.exports = app;
