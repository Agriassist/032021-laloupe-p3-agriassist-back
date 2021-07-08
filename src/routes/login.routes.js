const loginRouter = require('express').Router();
const { getOneUserByIdRefresh } = require('../controllers/UsersControllers');

const { verifUserEmailandPassword } = require('../controllers/UsersControllers');
const { createToken, authorizationWithRefreshJsonWebToken, recupCookie } = require('../services/jwt');

loginRouter.post('/', verifUserEmailandPassword, createToken);
loginRouter.post('/refresh_token', authorizationWithRefreshJsonWebToken, getOneUserByIdRefresh, createToken);
loginRouter.post('/recupCookie', recupCookie);

module.exports = loginRouter;
