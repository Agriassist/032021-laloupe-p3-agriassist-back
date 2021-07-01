require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const createToken = (req, res, next) => {
  let token;
  const login = JSON.parse(req.body.login);
  if (req.user) {
    token = jwt.sign({ id: req.user.id, status: req.user.status }, JWT_SECRET, { expiresIn: '1h' });
    next();
  } else {
    res.send("Erreur d'authentification");
  }
  return res.json({ token });
};

const authenticateWithJsonWebToken = (req, res, next) => {
  console.log(req.headers);
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err) => {
      if (!err) {
        next();
      } else {
        res.status(401).send("You're not allowed to acess these data");
      }
    });
  } else {
    res.status(401).send("You're not allowed to acess these data");
  }
};

module.exports = {
  createToken,
  authenticateWithJsonWebToken,
};
