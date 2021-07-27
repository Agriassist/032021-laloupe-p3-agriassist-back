const Joi = require('joi');
const {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  findManyByUserId,
  verifExistData,
  findManyModeleId,
} = require('../models/materielsModels');
const materielRouter = require('../routes/materielRoutes');

const getAllMateriels = (req, res) => {
  const id = req.params.agriId;
  const { modeleId } = req.params;

  if (id) {
    findManyByUserId(id)
      .then((results) => {
        const agriculteur = results[0];
        res.json(agriculteur);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else if (modeleId) {
    findManyModeleId(modeleId)
      .then((results) => {
        const materiel = results[0];
        res.json(materiel);
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

const getOneMaterielById = (req, res, next) => {
  let id;
  if (req.materielId) {
    id = req.materielId;
  } else if (req.body.id) {
    id = req.body.id;
  } else if (req.materiel_Id) {
    id = req.materiel_Id;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([materiels]) => {
      if (materiels.length === 0) {
        res.status(404).send('Materiel not found');
      } else {
        req.info = { materiel: materiels[0] };
        if (req.materiel_Id) {
          res.json(materiels[0]);
        } else {
          next();
        }
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneMateriel = (req, res, next) => {
  const { year, serial_number, type, modele_id, prev_oil_change, next_oil_change, modeleId, marqueId, concessionnaireId, agriculteurId } = req.body;
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

          prev_oil_change: Joi.string().max(255),

          next_oil_change: Joi.string().max(255),
        }).validate({ year, serial_number, type, modele_id, prev_oil_change, next_oil_change }, { abortEarly: false }).error;

        if (validationErrors) {
          res.send('Data enter is invalid');
        } else {
          createOne({ year, serial_number, type, modele_id, prev_oil_change, next_oil_change })
            .then(([result]) => {
              // req.materielId = result.insertId;
              req.infoCompte = { materiel_Id: result.insertId, modeleId, agriculteurId, concessionnaireId };
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
  const { year, serial_number, type, modele_id, prev_oil_change, next_oil_change } = req.body;
  const { id } = req.params;

  findOneById(id)
    .then(([results]) => {
      if (results[0]) {
        let validationErrors = null;
        validationErrors = Joi.object({
          year: Joi.number().min(1900).max(2021),

          serial_number: Joi.string().max(100),

          type: Joi.string().max(100),

          modele_id: Joi.number().integer(),

          prev_oil_change: Joi.string().max(255),

          next_oil_change: Joi.string().max(255),
        }).validate({ year, serial_number, type, modele_id, prev_oil_change, next_oil_change }, { abortEarly: false }).error;

        if (validationErrors) {
          res.send('Data enter is invalid');
        } else {
          updateOne({ year, serial_number, type, modele_id, prev_oil_change, next_oil_change }, req.params.id)
            .then(([materiels]) => {
              if (materiels.affectedRows === 0) {
                res.status(404).send('Materiel not found');
              } else {
                req.info = { materiel: materiels[0] };
                if (req.materiel_Id) {
                  res.json(materiels[0]);
                } else {
                  next();
                }
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

const AllMaterielsByUserId = (req, res) => {
  let id;
  if (req.Userid) {
    id = req.Userid;
  } else {
    id = req.params.id;
  }

  findManyByUserId(id)
    .then(([results]) => {
      if (results.length === 0) {
        res.status(404).send('Park not found');
      } else {
        res.json(results);
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
  AllMaterielsByUserId,
};
