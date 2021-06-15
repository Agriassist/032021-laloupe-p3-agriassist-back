const mainRouter = require('express').Router();
const agriculteursRoutes = require('./agriRoutes');
const concessionnairesRoutes = require('./concessionnaires.routes');
const adminRoutes = require('./administrateurs.routes');
const partenariatRoutes = require("./partenariat.routes");

mainRouter.use('/concessionnaires', concessionnairesRoutes);
mainRouter.use('/agriculteurs', agriculteursRoutes);
mainRouter.use('/administrateur', adminRoutes);
mainRouter.use('/partenariats', partenariatRoutes)

// mainRouter.use('/fiche_technique', ficheRouter);

module.exports = mainRouter;
