/* eslint-disable prefer-destructuring */
const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne, verifExistDataModele, findManyByMarqueId } = require('../models/modelesModels');

const getAllModeles = (req, res) => {
  const { modeleId } = req.params;

  if (modeleId) {
    findManyByMarqueId(modeleId)
      .then((results) => {
        const modeles = results[0];
        res.json(modeles);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    findMany()
      .then(([results]) => {
        const modeles = results[0];
        res.json(modeles);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const getOneModeleById = (req, res, next) => {
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
        req.info.modele = modeles[0];
        res.status(201).json(modeles[0]);
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneModele = (req, res, next) => {
  const { name, picture, marque_id } = req.body;

  verifExistDataModele(name, picture)
    .then(([results]) => {
      if (!results[0]) {
        res.send('Modele data arleady exist');
        console.log(results[0]);
      } else {
        console.log(results);
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(255).required(),

          picture: Joi.string().max(100).required(),

          marque_id: Joi.number().integer().required(),
        }).validate({ name, picture, marque_id }, { abortEarly: false }).error;

        if (validationErrors) {
          res.send('Data enter is invalid');
        } else {
          console.log({ name, picture, marque_id });
          createOne({ name, picture, marque_id })
            .then(([result]) => {
              req.modeleId = result.insertId;
              console.log('Ok');
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
  const { id } = req.params;

  findOneById(id)
    .then(([results]) => {
      if (results[0]) {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(255),

          picture: Joi.string().max(100),

          marque_id: Joi.number().integer(),
        }).validate({ name, picture, marque_id }, { abortEarly: false }).error;

        if (validationErrors) {
          console.log(validationErrors);
          res.send('Data enter is invalid');
        } else {
          updateOne(req.body, req.params.id)
            .then(([result]) => {
              if (result.affectedRows === 0) {
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
