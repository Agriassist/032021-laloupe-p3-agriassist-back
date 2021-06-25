const loginRouter = require('express').Router();

const { verifAgriEmailandPassword } = require('../controllers/agriculteursControllers');

const { verifConcessionnaireEmailandPassword } = require('../controllers/concessionnaires.controller');

const { verifAdminEmailandPassword } = require('../controllers/administrateurs.controller');

const { createToken } = require('../services/jwt');

loginRouter.post('/', verifAgriEmailandPassword, verifConcessionnaireEmailandPassword, verifAdminEmailandPassword, createToken);

module.exports = loginRouter;
