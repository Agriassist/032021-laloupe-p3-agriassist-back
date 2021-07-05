require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const createToken = (req, res) => {
  let token;
  console.log(req.userId[0].id);
  if (req.userId[0]) {
    token = jwt.sign({ id: req.userId[0].id, status: req.userId[0].statue }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ token, status: req.userId[0].statue, id: req.userId[0].id });
  } else {
    res.status(500).send("Erreur d'authentification");
  }
  return res.json({ token, status: req.userId[0].statue, id: req.userId[0].id });
};

const authenticateWithJsonWebToken = (req, res, next) => {
  console.log(req.headers);
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err) => {
      if (!err) {
        next();
      } else {
        res.status(401).send("You're not allowed acess these data");
      }
    });
  } else {
    res.status(401).send("You're not allowed to acess these data");
  }
};

const authenticteAdminWithJsonWebToken = (req, res, next) => {
  console.log(req.headers);
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (!err) {
        console.log(decoded);
        next();
      } else {
        res.status(401).send("You're not allowed acess these data");
      }
    });
  } else {
    res.status(401).send("You're not allowed to acess these data");
  }
};

module.exports = {
  createToken,
  authenticateWithJsonWebToken,
  authenticteAdminWithJsonWebToken,
};
