require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET, REFRESH_JWT_SECRET } = process.env;

const createToken = (req, res) => {
  let token;
  if (req.userId[0]) {
    token = jwt.sign({ id: req.userId[0].id, status: req.userId[0].statue }, JWT_SECRET, { expiresIn: '15min' });
    const refreshToken = jwt.sign({ id: req.userId[0].id, status: req.userId[0].statue }, REFRESH_JWT_SECRET);
    res.cookie('refresh_token', refreshToken, { maxAge: 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'lax' });
    res.json({ token, status: req.userId[0].statue, id: req.userId[0].id });
  } else {
    res.status(500).send("Erreur d'authentification");
  }
};
const authorizationWithRefreshJsonWebToken = (req, res, next) => {
  if (req.cookies.refresh_token) {
    jwt.verify(req.cookies.refresh_token, REFRESH_JWT_SECRET, (err, decoded) => {
      if (err) {
        res.clearCookie('refresh_token');
        res.status(401).send("You're not allowed to access this data");
      } else {
        req.UserId = decoded.id;
        next();
      }
    });
  } else {
    res.clearCookie('refresh_token');
    res.status(401).send("You're not allowed to access this data");
  }
}; 

const recupCookie = (req, res) => {
  const cookie = req.cookies.refresh_token;
  res.json(cookie);
};

const clearCookie = (req, res) => {
  res.clearCookie('refresh_token');
  res.sendStatus(204);
};

const authenticateWithJsonWebToken = (req, res, next) => {
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

const authenticateAdminWithJsonWebToken = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (!err) {
        if (decoded.status !== 'administrateur') {
          res.status(401).send("You're not allowed acess these data");
        } else {
          next();
        }
      } else {
        res.status(401).send("You're not allowed acess these data");
      }
    });
  } else {
    res.status(401).send("You're not allowed to acess these data");
  }
};

const authenticateAgriWithJsonWebToken = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (!err) {
        if (decoded.status !== 'agriculteur') {
          res.status(401).send("You're not allowed acess these data");
        } else {
          next();
        }
      } else {
        res.status(401).send("You're not allowed acess these data");
      }
    });
  } else {
    res.status(401).send("You're not allowed to acess these data");
  }
};

const authenticateConcWithJsonWebToken = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (!err) {
        if (decoded.status !== 'concessionnaire') {
          res.status(401).send("You're not allowed acess these data");
        } else {
          next();
        }
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
  recupCookie,
  clearCookie,
  authenticateWithJsonWebToken,
  authorizationWithRefreshJsonWebToken,
  authenticateAgriWithJsonWebToken,
  authenticateConcWithJsonWebToken,
  authenticateAdminWithJsonWebToken,
};
