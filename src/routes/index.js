const mainRouter = require('express').Router();
const agriculteursRoutes = require('./aggriRoutes');

mainRouter.use('/agriculteurs', agriculteursRoutes);

module.exports = mainRouter;
