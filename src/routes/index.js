const mainRouter = require('express').Router();
const agriculteursRoutes = require('./aggriRoutes');
const concessionnairesRoutes = require('./concessionnaires.routes');
const adminRoutes = require('./administrateurs.routes');
const ficheRouter = require('./fiche_technique.routes');

mainRouter.use('/concessionnaires', concessionnairesRoutes);
mainRouter.use('/agriculteurs', agriculteursRoutes);
mainRouter.use('/administrateur', adminRoutes);

// mainRouter.use('/fiche_technique', ficheRouter);

module.exports = mainRouter;
