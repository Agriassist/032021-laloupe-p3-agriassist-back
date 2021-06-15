const partenariatRouter = require('express').Router();

const {
  getAllPartenariats,
  getOnePartenariatById,
  createOnePartenariat,
  updateOnePartenariat,
  deleteOnePartenariat,
} = require('../controllers/partenariat.controller');

partenariatRouter.get('/', getAllPartenariats);
partenariatRouter.post('/', createOnePartenariat);
partenariatRouter.put('/:id', updateOnePartenariat, getOnePartenariatById);
partenariatRouter.delete('/:id', deleteOnePartenariat);

module.exports = partenariatRouter;
