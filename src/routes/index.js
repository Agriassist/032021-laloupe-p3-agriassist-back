const mainRouter = require('express').Router();
// const agriculteursRoutes = require('./aggriRoutes');
const marquesRoutes = require('./marqueRoutes');

// mainRouter.use('/concessionnaires', concessionnairesRoutes);
mainRouter.use('/marques', marquesRoutes);

module.exports = mainRouter;
