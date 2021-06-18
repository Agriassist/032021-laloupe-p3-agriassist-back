const Joi = require('joi');
const {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  findManyByAgriculteurId,
  verifExistData,
  verifyPassword,
  hashPassword,
} = require('../models/concessionnaire.model');

const getAllConcessionnaires = (req, res) => {
  const id = req.params.agriId;

  if (id) {
    findManyByAgriculteurId(id)
      .then((results) => {
        const concessionnaire = results[0];
        res.json(concessionnaire);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    findMany()
      .then((results) => {
        const concessionnaire = results[0];
        res.json(concessionnaire);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const getOneConcessionnaireById = (req, res) => {
  let id;
  if (req.concId) {
    id = req.concId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([concessionnaires]) => {
      if (concessionnaires.length === 0) {
        res.status(404).send('Concessionnaire not found');
      } else {
        res.json(concessionnaires[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneConcessionnaire = (req, res, next) => {
  const { name, identifiant, password, phone, address, picture_logo, email } = req.body;

  verifExistData(email, identifiant, phone)
    .then(async ([results]) => {
      if (results[0]) {
        res.send('Concessionnaire data already exist');
      } else {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(100).required(),

          identifiant: Joi.string().max(100).required(),

          password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).min(8).max(32).required(),

          phone: Joi.string().max(10),

          address: Joi.string().max(100).required(),

          picture_logo: Joi.string().max(100),

          email: Joi.string().email().max(100).required(),
        }).validate({ name, identifiant, password, phone, address, picture_logo, email }, { abortEarly: false }).error;

        if (validationErrors) {
          console.log(validationErrors);
          console.log('pas ok');
          res.send('Data enter is invalid');
        } else {
          const hashedPassword = await hashPassword(password);
          createOne({ name, identifiant, password: hashedPassword, phone, address, picture_logo, email })
            .then(([results]) => {
              req.concId = results.insertId;
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

const updateOneConcessionnaire = (req, res, next) => {
  const { name, identifiant, password, phone, address, picture_logo, email } = req.body;
  const { id } = req.params;

  findOneById(id)
    .then(async ([results]) => {
      if (results[0]) {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(100),

          identifiant: Joi.string().max(100),

          password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).min(8).max(32),

          phone: Joi.string().max(10),

          address: Joi.string().max(100),

          picture_logo: Joi.string().max(100),

          email: Joi.string().email().max(100),
        }).validate({ name, identifiant, password, phone, address, picture_logo, email }, { abortEarly: false }).error;

        if (validationErrors) {
          console.log(validationErrors);
          res.send('Data enter is invalid');
        } else {
          if (req.body.password) {
            req.body.password = await hashPassword(password);
          }

          updateOne(req.body, req.params.id)
            .then(([results]) => {
              if (results.affectedRows === 0) {
                res.status(404).send('Concessionnaire not found');
              } else {
                next();
              }
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
        }
      } else {
        res.send('concessionnaire data already exist');
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOneConcessionnaire = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Concesionnaire not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllConcessionnaires,
  getOneConcessionnaireById,
  createOneConcessionnaire,
  updateOneConcessionnaire,
  deleteOneConcessionnaire,
};
