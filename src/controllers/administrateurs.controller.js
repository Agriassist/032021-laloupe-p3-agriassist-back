const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne, verifExistData } = require('../models/administrateur.model');

const getAllAdministrateurs = (req, res) => {
  findMany()
    .then((results) => {
      const administrateurs = results[0];
      res.json(administrateurs);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneAdministrateurById = (req, res) => {
  let id;
  if (req.adminId) {
    id = req.adminId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([administrateurs]) => {
      if (administrateurs.length === 0) {
        res.status(404).send('Administrateur not found');
      } else {
        res.json(administrateurs[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneAdministrateur = (req, res, next) => {
  const { name, lastname, mail, password, phone, picture_profile } = req.body;
  verifExistData(mail, phone)
    .then(([results]) => {
      if (results[0]) {
        res.send('Administrateur data already exist');
      } else {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(100).required(),

          lastname: Joi.string().max(100).required(),

          mail: Joi.string().email().max(100).required(),

          password: Joi.string().max(100).required(),

          phone: Joi.string().max(10).required(),

          picture_profile: Joi.string().max(100),
        }).validate({ name, lastname, mail, password, phone, picture_profile }, { abortEarly: true }).error;

        if (validationErrors) {
          res.send('Data enter is invalid');
        } else {
          createOne({ name, lastname, mail, password, phone, picture_profile })
            .then(([results]) => {
              req.adminId = results.insertId;
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

const updateOneAdministrateur = (req, res, next) => {
  const { name, lastname, mail, password, phone, picture_profile } = req.body;
  const { id } = req.params;

  findOneById(id)
    .then(([results]) => {
      if (results[0]) {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(100),

          lastname: Joi.string().max(100),

          mail: Joi.string().email().max(100),

          password: Joi.string().max(100),

          phone: Joi.string().max(10),

          picture_profile: Joi.string().max(100),
        }).validate({ name, lastname, mail, password, phone, picture_profile }, { abortEarly: false }).error;

        if (validationErrors) {
          res.send('Data enter is invalid');
        } else {
          updateOne(req.body, req.params.id)
            .then(([results]) => {
              if (results.affectedRows === 0) {
                res.status(404).send('Mise à jour not found');
              } else {
                next();
              }
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
        }
      } else {
        res.send('Administrateur data already exist');
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOneAdministrateur = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Administrateur not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllAdministrateurs,
  getOneAdministrateurById,
  createOneAdministrateur,
  updateOneAdministrateur,
  deleteOneAdministrateur,
};
