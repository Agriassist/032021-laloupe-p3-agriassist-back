const mainRouter = require('express').Router();
<<<<<<< HEAD
const ficheRouter = require('./fiche_technique.routes');

mainRouter.use('/fiche_technique', ficheRouter);
=======
// const agriculteursRoutes = require('./aggriRoutes');
const marquesRoutes = require('./marqueRoutes');

// mainRouter.use('/concessionnaires', concessionnairesRoutes);
mainRouter.use('/marques', marquesRoutes);
>>>>>>> dev

module.exports = mainRouter;
