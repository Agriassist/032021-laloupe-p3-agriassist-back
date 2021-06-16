const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne, findManyByConcessionaireId } = require('../models/agriculteurModel');

const getAllAgriculteurs = (req, res) => {
  console.log(req.params.id);
  const id = req.params.consId;

  if (id) {
    findManyByConcessionaireId(id)
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

  createOne({ name, lastname, identifiant, password, phone, picture_profile, email })
    .then(([results]) => {
      let validationErrors = null;
      validationErrors = Joi.object({
        name: Joi.string().max(255).required(),

        lastname: Joi.string().max(255).required(),

        identifiant: Joi.string().max(255).required(),

        password: Joi.string().min(8).max(255).required(),

        phone: Joi.string().max(10).required(),

        picture_profile: Joi.string().max(100).required(),

        email: Joi.string().email().max(255).required(),
      }).validate({ name, lastname, identifiant, password, phone, picture_profile, email }, { abortEarly: false }).error;

      if (validationErrors) {
        res.send('Data enter is invalid');
      } else {
        // req.agriId = results.insertId;
        req.agriId = results.insertId;
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateOneAgriculteur = (req, res, next) => {
  // il faudrait vérifier que les données fournies dans la requête sont correctes
  updateOne(req.body, req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Agriculteur not found');
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOneAgriculteur = (req, res) => {
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
// const getAllAgriculteursByConcessionnaireId = (req, res) => {
//   const { id } = req.params.id;
//   findManyByConcessionaireId()
//     .then(() => {})
//     .catch((err) => {
//       res.status(500).send(err.message);
//     });
// };

module.exports = {
  getAllAgriculteurs,
  getOneAgriculteurById,
  createOneAgriculteur,
  updateOneAgriculteur,
  deleteOneAgriculteur,
  // getAllAgriculteursByConcessionnaireId,
};
