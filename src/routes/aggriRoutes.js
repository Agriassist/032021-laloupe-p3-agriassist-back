const agriRouter = require('express').Router();
const materielsRoutes = require('./materielRoutes');
const {
  getAllAgriculteurs,
  getOneAgriculteurById,
  createOneAgriculteur,
  updateOneAgriculteur,
  deleteOneAgriculteur,
} = require('../controllers/agriculteursControllers');

agriRouter.get('/', getAllAgriculteurs);
agriRouter.get('/:id', getOneAgriculteurById);
agriRouter.post('/', createOneAgriculteur, getOneAgriculteurById);
agriRouter.put('/:id', updateOneAgriculteur, getOneAgriculteurById);
agriRouter.delete('/:id', deleteOneAgriculteur);

agriRouter.use('/materiels', materielsRoutes);

module.exports = agriRouter;
