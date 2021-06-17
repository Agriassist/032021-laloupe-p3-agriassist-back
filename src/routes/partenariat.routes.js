const partenariatRouter = require('express').Router();

const {
  getAllPartenariats,
  getOnePartenariatById,
  createOnePartenariat,
  updateOnePartenariat,
  deleteOnePartenariatByAgriculteurId,
} = require('../controllers/partenariat.controller');

partenariatRouter.get('/', getAllPartenariats);
partenariatRouter.post('/', createOnePartenariat);
partenariatRouter.put('/:id', updateOnePartenariat, getOnePartenariatById);
partenariatRouter.delete('/:id', deleteOnePartenariatByAgriculteurId);

module.exports = partenariatRouter;
