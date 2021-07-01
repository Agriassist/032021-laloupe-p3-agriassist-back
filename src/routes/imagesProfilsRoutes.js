const imgRouter = require('express').Router();

const { ulploadImgProfil } = require('../controllers/imgProfilController');

imgRouter.post('/', ulploadImgProfil);

module.exports = imgRouter;
