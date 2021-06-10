const mainRouter = require('express').Router();
const ficheRouter = require('./fiche_technique.routes');

mainRouter.use('/fiche_technique', ficheRouter);

module.exports = mainRouter;
