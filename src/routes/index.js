const mainRouter = require('express').Router();
const agriculteursRoutes = require('./agriculteurs.routes');

mainRouter.use('/agriculteurs', agriculteursRoutes);

module.exports = mainRouter;
