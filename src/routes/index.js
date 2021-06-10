const mainRouter = require('express').Router();
const agriculteursRoutes = require('./aggriRoutes');
const concessionnairesRoutes = require('./concessionnaires.routes');

mainRouter.use('/concessionnaires', concessionnairesRoutes);
mainRouter.use('/aggriculture', agriculteursRoutes);

module.exports = mainRouter;
