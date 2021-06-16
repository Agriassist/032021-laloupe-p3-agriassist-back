const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne, verifExistData } = require('../models/materielsModels');

const getAllModeles = (req, res) => {
  findMany()
    .then(([results]) => {
      const modeles = results[0];
      res.json(modeles);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneModeleById = (req, res) => {
  let id;
  if (req.modeleId) {
    id = req.modeleId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([modeles]) => {
      if (modeles.length === 0) {
        res.status(404).send('Modele not found');
      } else {
        res.json(modeles[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneModele = (req, res, next) => {
  const { name, picture, marque_id } = req.body;

  verifExistData(name, picture, marque_id)
    .then(([results]) => {
      if (results[0]) {
        res.send('Modele data arleady exist');
      } else {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(255).required(),

          picture: Joi.string().max(100).require(),
        }).validate({ name, picture }, { abortEarly: false }).error;

        if (validationErrors) {
          console.log(validationErrors);
          res.send('Data enter is invalid');
        } else {
          createOne({ name, picture, marque_id })
            .then(([results]) => {
              req.modeleId = results.insertId;
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

const updateOneModele = (req, res, next) => {
  // il faudrait vérifier que les données fournies dans la requête sont correctes
  const { name, picture, marque_id } = req.body;

  verifExistData(name, picture, marque_id)
    .then(([results]) => {
      if (results[0]) {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(255),

          picture: Joi.string().max(100),
        }).validate({ name, picture }, { abortEarly: false }).error;

        if (validationErrors) {
          console.log(validationErrors);
          res.send('Data enter is invalid');
        } else {
          updateOne(req.body, req.params.id)
            .then(([results]) => {
              if (results.affectedRows === 0) {
                res.status(404).send('Modele not found');
              } else {
                next();
              }
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
        }
      } else {
        res.send('Modele data arleady exist');
      }
    })

    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOneModele = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Modele not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllModeles,
  getOneModeleById,
  createOneModele,
  updateOneModele,
  deleteOneModele,
};
