const express = require('express');
const mainRouter = require('express').Router();
const materielRouter = require('./materielRoutes');
const parkRouter = require('./parkRoutes');
const marqueRoutes = require('./marqueRoutes');
const ficheRouter = require('./fiche_technique.routes');
const modeleRouter = require('./modeleRoutes');
const carnetRouter = require('./carnet_entretien.routes');
const usersRouter = require('./Users.routes');
const imgRouter = require('./imagesProfilsRoutes');
// const factureRouter = require('./facture.routes');

const loginRouter = require('./login.routes');

mainRouter.use('/materiels', materielRouter);
mainRouter.use('/park', parkRouter);
mainRouter.use('/marque', marqueRoutes);
mainRouter.use('/fiche_technique', ficheRouter);
mainRouter.use('/login', loginRouter);
mainRouter.use('/users', usersRouter);
mainRouter.use('/images_profil', express.static('public/images_profil'), imgRouter);

mainRouter.use('/modele', modeleRouter);
mainRouter.use('/carnet_entretien', carnetRouter);
// mainRouter.use('/facture', factureRouter);

// mainRouter.use('/fiche_technique', ficheRouter);

module.exports = mainRouter;
