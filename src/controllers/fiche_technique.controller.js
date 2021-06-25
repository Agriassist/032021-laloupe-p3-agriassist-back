const Joi = require('joi');
const {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  verifExistData,
  findManyFicheTechniqueId,
} = require('../models/fiche_technique.model');

const getAllFiche = (req, res) => {
  const ficheId = req.params.ficheId;
  if (ficheId) {
    findManyFicheTechniqueId(ficheId)
      .then((results) => {
        const modeles = results[0];
        res.json(modeles);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    findMany()
      .then((results) => {
        const fiche_technique = results[0];
        res.json(fiche_technique);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const getOneFicheById = (req, res) => {
  let id;
  if (req.ficheId) {
    id = req.ficheId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([fiche_technique]) => {
      if (fiche_technique.length === 0) {
        res.status(404).send('fiche not found');
      } else {
        res.json(fiche_technique[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneFiche = (req, res, next) => {
  const { name, file, modele_id } = req.body;
  createOne({ name, file, modele_id })
    .then(([results]) => {
      if (results[0]) {
        res.send('Fiche data already exist');
      } else {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(100).required(),

          file: Joi.string().max(100).required(),

          modele_id: Joi.string().max(100).required(),
        }).validate({ name, file, modele_id }, { abortEarly: false }).error;

        if (validationErrors) {
          res.send('Fiche enter is invalid');
        } else {
          createOne({ name, file })
            .then(([results]) => {
              req.ficheId = results.insertId;
              next();
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
        }
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateOneFiche = (req, res, next) => {
  const { name, file, modele_id } = req.body;
  const { id } = req.params;

  findOneById(id)
    .then(([results]) => {
      if (results[0]) {
        res.send('Fiche data already exist');
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(100),

          file: Joi.string().max(100),

          modele_id: Joi.number().integer(),
        }).validate({ name, file, modele_id }, { abortEarly: false }).error;

        if (validationErrors) {
          res.send('Fiche enter is invalid');
        } else {
          updateOne(req.body, req.params.id)
            .then(([results]) => {
              if (results.affectedRows === 0) {
                res.status(404).send('fiche not found');
              } else {
                next();
              }
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
        }
      } else {
        res.send('Fiche data already exist');
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOneFiche = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('fiche not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllFiche,
  getOneFicheById,
  createOneFiche,
  updateOneFiche,
  deleteOneFiche,
};
