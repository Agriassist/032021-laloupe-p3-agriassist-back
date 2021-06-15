const { findMany, findOneById, createOne, updateOne, deleteOne, findAllAgriculteursByConcessionnaireId } = require('../models/agriculteurModel');

const getAllAgriculteurs = (req, res) => {
  findMany()
    .then((results) => {
      const agriculteurs = results[0];
      res.json(agriculteurs);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
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
  const { name, lastname, identifiant, password, phone, picture_profile, mail } = req.body;

  createOne({ name, lastname, identifiant, password, phone, picture_profile, mail })
    .then(([results]) => {
      // res.status(201).json({ id: results.insertId, name, lastname, identifiant, password, phone, picture_profile, mail });
      req.agriId = results.insertId;
      next();
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

module.exports = {
  getAllAgriculteurs,
  getOneAgriculteurById,
  createOneAgriculteur,
  updateOneAgriculteur,
  deleteOneAgriculteur,
};
