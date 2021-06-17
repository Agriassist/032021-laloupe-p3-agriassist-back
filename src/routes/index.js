const mainRouter = require('express').Router();
const agriculteursRoutes = require('./agriRoutes');
const concessionnairesRoutes = require('./concessionnaires.routes');
const adminRoutes = require('./administrateurs.routes');
const partenariatRoutes = require('./partenariat.routes');
const materielRouter = require('./materielRoutes');
const parkRouter = require('./parkRoutes');
const marqueRoutes = require('./marqueRoutes');
const ficheRouter = require('./fiche_technique.routes');
const modeleRouter = require('./modeleRoutes');
const carnetRouter = require('./carnet_entretien.routes');

mainRouter.use('/concessionnaires', concessionnairesRoutes);
mainRouter.use('/agriculteurs', agriculteursRoutes);
mainRouter.use('/administrateur', adminRoutes);
mainRouter.use('/partenariats', partenariatRoutes);
mainRouter.use('/materiels', materielRouter);
mainRouter.use('/park', parkRouter);
mainRouter.use('/marque', marqueRoutes);
mainRouter.use('/fiche_technique', ficheRouter);

mainRouter.use('/modele', modeleRouter)
mainRouter.use('/carnet_entretien', carnetRouter)

// mainRouter.use('/fiche_technique', ficheRouter);

module.exports = mainRouter;
