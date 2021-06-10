const { findMany, createOne, findOneById, updateOne, deleteOne } = require('../models/agriModels');

const getAllAgriculteurs = (req, res) => {
  findMany()
    .then((results) => {
      const agriculteurs = results[0];
      res.json(agriculteurs);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

getOneAgriculteurById = (req, res) => {
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
  // il faudrait verifierque les données fournies dans la requete sont correctes
  const { name, lastmane, identifiant, password, phone, picture_profile } = req.body;
  createOne({ name, lastmane, identifiant, password, phone, picture_profile })
    .then(([results]) => {
      // res.status(201).json({ id: results.insertId, name, lastmane, identifiant, password, phone, picture_profile });
      req.agriId = results.insertId;
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateOneAgriculteur = (req, res, next) => {
  // il faudrait verifier que les données fournies dans la requete sont corectes
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
  createOneAgriculteur,
  getOneAgriculteurById,
  updateOneAgriculteur,
  deleteOneAgriculteur,
};
