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
app.use('/images_fichetech', express.static('public/images_fichetech'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).json({ foo: 'hello' });
});

app.use('/api', mainRouter);

module.exports = app;
