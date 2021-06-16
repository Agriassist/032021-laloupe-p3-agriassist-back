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
  createOne({ name, lastname, mail, password, phone, picture_profile })
    .then(([results]) => {
      req.adminId = results.insertId;
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateOneAdministrateur = (req, res, next) => {
  updateOne(req.body, req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Administrateur not found');
      } else {
        next();
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
