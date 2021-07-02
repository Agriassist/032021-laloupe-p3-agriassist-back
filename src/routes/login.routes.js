const loginRouter = require('express').Router();

const { verifUserEmailandPassword } = require('../controllers/UsersControllers');
const { createToken, authenticateWithJsonWebToken } = require('../services/jwt');

loginRouter.post('/', verifUserEmailandPassword, createToken, authenticateWithJsonWebToken);

module.exports = loginRouter;
