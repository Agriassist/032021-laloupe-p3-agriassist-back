const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne, verifExistData, findManyMaterielId } = require('../models/carnet_entretien.model');

const getAllCarnet = (req, res) => {
  const id = req.params.materielId;

  if (id) {
    findManyMaterielId(id)
      .then((results) => {
        const carnetEntretien = results[0];
        res.json(carnetEntretien);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
  findMany()
    .then((results) => {
      const carnet_entretien = results[0];
      res.json(carnet_entretien);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneCarnetById = (req, res) => {
  let id;
  if (req.carnetId) {
    id = req.carnetId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([carnet_entretien]) => {
      if (carnet_entretien.length === 0) {
        res.status(404).send('carnet not found');
      } else {
        res.json(carnet_entretien[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneCarnet = (req, res, next) => {
  const { oil, use_times, materiel_id } = req.body;
  verifExistData(oil, use_times, materiel_id)
    .then(([results]) => {
      if (results[0]) {
        res.send('Carnet_Entretien data already exist');
      } else {
        let validationErrors = null;
        validationErrors = Joi.object({
          oil: Joi.string().max(100).required(),

          use_times: Joi.number().integer(),

          materiel_id: Joi.number().integer(),
        }).validate({ oil, use_times, materiel_id }, { abortEarly: false }).error;

        if (validationErrors) {
          res.send('Data enter si invalid');
        } else {
          createOne({ oil, use_times, materiel_id })
            .then(([results]) => {
              req.carnetId = results.insertId;
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

const updateOneCarnet = (req, res, next) => {
  // il faudrait v??rifier que les donn??es fournies dans la requ??te sont correctes
  const { oil, use_times, materiel_id } = req.body;

  verifExistData(oil, use_times, materiel_id)
    .then(([results]) => {
      if (results[0]) {
        let validationErrors = null;
        validationErrors = Joi.object({
          oil: Joi.string().max(100).required(),

          use_times: Joi.number().integer(),

          materiel_id: Joi.number().integer(),
        }).validate({ oil, use_times, materiel_id }, { abortEarly: false }).error;

        if (validationErrors) {
          res.send('Data enter is invalid');
        } else {
          updateOne(req.body, req.params.id)
            .then(([result]) => {
              if (result.affectedRows === 0) {
                res.status(404).send('carnet not found');
              } else {
                next();
              }
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
        }
      } else {
        res.send('carnet data already exist');
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOneCarnet = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('carnet not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllCarnet,
  getOneCarnetById,
  createOneCarnet,
  updateOneCarnet,
  deleteOneCarnet,
};
