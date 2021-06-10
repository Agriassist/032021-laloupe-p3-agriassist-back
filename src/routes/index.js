const mainRouter = require('express').Router();
// const agriculteursRoutes = require('./agriculteurs.routes');
const administrateursRoutes = require('./administrateurs.routes');

// mainRouter.use('/agriculteurs', agriculteursRoutes);
mainRouter.use('/administrateurs', administrateursRoutes);

module.exports = mainRouter;
