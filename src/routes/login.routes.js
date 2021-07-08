const loginRouter = require('express').Router();
const { getOneUserByIdRefresh } = require('../controllers/UsersControllers');

const { verifUserEmailandPassword } = require('../controllers/UsersControllers');
const { createToken, authorizationWithRefreshJsonWebToken } = require('../services/jwt');

loginRouter.post('/', verifUserEmailandPassword, createToken);
loginRouter.post('/refresh_token', authorizationWithRefreshJsonWebToken, getOneUserByIdRefresh, createToken);

module.exports = loginRouter;
