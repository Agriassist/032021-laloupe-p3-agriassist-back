const mainRouter = require('express').Router();
const concessionnairesRoutes = require('./concessionnaires.routes');

mainRouter.use('/concessionnaires', concessionnairesRoutes);

module.exports = mainRouter;
