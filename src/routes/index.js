const mainRouter = require('express').Router();
// const agriculteursRoutes = require('./agriculteurs.routes');
const carnetRouter = require('./carnet_entretien.routes');

// mainRouter.use('/agriculteurs', agriculteursRoutes);
mainRouter.use('/carnet_entretien', carnetRouter);

module.exports = mainRouter;
