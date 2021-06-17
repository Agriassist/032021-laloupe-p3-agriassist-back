const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne, findManyByAgriculteurId, verifExistData } = require('../models/materielsModels');

const getAllMateriels = (req, res) => {
  const id = req.params.agriId;

  if (id) {
    findManyByAgriculteurId(id)
      .then((results) => {
        const agriculteur = results[0];
        res.json(agriculteur);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    findMany()
      .then((results) => {
        const materiel = results[0];
        res.json(materiel);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const getOneMaterielById = (req, res) => {
  let id;
  if (req.materielId) {
    id = req.materielId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([materiels]) => {
      if (materiels.length === 0) {
        res.status(404).send('Materiel not found');
      } else {
        res.json(materiels[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneMateriel = (req, res, next) => {
  const { year, serial_number, type, modele_id } = req.body;
  verifExistData(serial_number)
    .then(([results]) => {
      if (results[0]) {
        res.send('Materiel data already exist');
      } else {
        let validationErrors = null;
        validationErrors = Joi.object({
          year: Joi.number().min(1900).max(2021).required(),

          serial_number: Joi.string().max(100).required(),

          type: Joi.string().max(100).required(),

          modele_id: Joi.number().integer(),
        }).validate({ year, serial_number, type, modele_id }, { abortEarly: false }).error;

        if (validationErrors) {
          console.log(validationErrors);
          res.send('Data enter is invalid');
        } else {
          createOne({ year, serial_number, type, modele_id })
            .then(([results]) => {
              req.materielId = results.insertId;
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

const updateOneMateriel = (req, res, next) => {
  const { year, serial_number, type, modele_id } = req.body;
  const { id } = req.params;

  findOneById(id)
    .then(([results]) => {
      if (results[0]) {
        let validationErrors = null;
        validationErrors = Joi.object({
          year: Joi.number().min(1900).max(2021),

          serial_number: Joi.string().max(100),

          type: Joi.string().max(100),
        }).validate({ year, serial_number, type }, { abortEarly: false }).error;

        if (validationErrors) {
          console.log(validationErrors);
          res.send('Data enter is invalid');
        } else {
          updateOne(req.body, req.params.id)
            .then(([results]) => {
              if (results.affectedRows === 0) {
                res.status(404).send('Materiel not found');
              } else {
                next();
              }
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
        }
      } else {
        res.send('Materiel data arleady exist');
      }
    })

    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOneMateriel = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Agriculteur not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const AllMaterielsByAgriculteurId = (res, req) => {
  findManyByAgriculteurId(req.params.id)
    .then(([results]) => {
      if (results.length === 0) {
        res.status(404).send('Park not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllMateriels,
  getOneMaterielById,
  createOneMateriel,
  updateOneMateriel,
  deleteOneMateriel,
  AllMaterielsByAgriculteurId,
};
