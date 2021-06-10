const mainRouter = require('express').Router();
const agriculteursRoutes = require('./aggriRoutes');

mainRouter.use('/concessionnaires', concessionnairesRoutes);

module.exports = mainRouter;
