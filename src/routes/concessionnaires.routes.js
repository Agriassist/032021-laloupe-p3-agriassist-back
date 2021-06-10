const concRouter = require('express').Router();
const {
    getAllConcessionnaires,
    getOneConcessionnaireById,
    createOneConcessionnaire,
    updateOneConcessionnaire,
    deleteOneConcessionnaire,
} = require('../controllers/concessionnaires.controller');

concRouter.get('/', getAllConcessionnaires);
concRouter.get('/:id', getOneConcessionnaireById);
concRouter.post('/', createOneConcessionnaire, getOneConcessionnaireById);
concRouter.put('/:id', updateOneConcessionnaire, getOneConcessionnaireById);
concRouter.delete('/:id', deleteOneConcessionnaire);

module.exports = concRouter;