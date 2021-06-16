const Joi = require('joi');
const {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  findManyByConcessionaireId,
  findManyByMaterielId,
  verifExistData,
} = require('../models/agriculteurModel');

const getAllAgriculteurs = (req, res) => {
  const id = req.params.consId;
  const materId = req.params.materId;

  if (id) {
    findManyByConcessionaireId(id)
      .then((results) => {
        const agriculteurs = results[0];
        res.json(agriculteurs);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else if (materId) {
    findManyByMaterielId(materId)
      .then((results) => {
        const agriculteurs = results[0];
        res.json(agriculteurs);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    findMany()
      .then((results) => {
        const agriculteurs = results[0];
        res.json(agriculteurs);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const getOneAgriculteurById = (req, res) => {
  let id;
  if (req.agriId) {
    id = req.agriId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([agriculteurs]) => {
      if (agriculteurs.length === 0) {
        res.status(404).send('Agriculteur not found');
      } else {
        res.json(agriculteurs[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneAgriculteur = (req, res, next) => {
  // il faudrait vérifier que les données fournies dans la requête sont correctes
  const { name, lastname, identifiant, password, phone, picture_profile, email } = req.body;
 
  verifExistData(email, identifiant, phone)
    .then(([results]) => {
      if (results[0]) {
        res.send('Agriculteur data already exist');
      } else {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(100).required(),

          lastname: Joi.string().max(100).required(),

          identifiant: Joi.string().max(100),

          password: Joi.string().min(8).max(150).required(),

          phone: Joi.string().max(10).required(),

          picture_profile: Joi.string().max(100),

          email: Joi.string().email().max(100).required(),
        }).validate({ name, lastname, identifiant, password, phone, picture_profile, email }, { abortEarly: false }).error;

        if (validationErrors) {
          console.log(validationErrors);
          res.send('Data enter is invalid');
        } else {
          createOne({ name, lastname, identifiant, password, phone, picture_profile, email })
            .then(([results]) => {
              req.agriId = results.insertId;
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

const updateOneAgriculteur = (req, res, next) => {
  // il faudrait vérifier que les données fournies dans la requête sont correctes
  const { name, lastname, identifiant, password, phone, picture_profile, email } = req.body;

  verifExistData(email, identifiant, phone)
    .then(([results]) => {
      if (results[0]) {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(255),

          lastname: Joi.string().max(255),

          identifiant: Joi.string().max(255),

          password: Joi.string().min(8).max(255),

          phone: Joi.string().max(10),

          picture_profile: Joi.string().max(100),

          email: Joi.string().email().max(255),
        }).validate({ name, lastname, identifiant, password, phone, picture_profile, email }, { abortEarly: false }).error;

        if (validationErrors) {
          console.log(validationErrors);
          res.send('Data enter is invalid');
        } else {
          updateOne(req.body, req.params.id)
            .then(([results]) => {
              if (results.affectedRows === 0) {
                res.status(404).send('agriculteur not found');
              } else {
                next();
              }
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
        }
      } else {
        res.send('Agriculteur data already exist');
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOneAgricultuer = (req, res) => {
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

module.exports = {
  getAllAgriculteurs,
  getOneAgriculteurById,
  createOneAgriculteur,
  updateOneAgriculteur,
  deleteOneAgriculteur,
};
