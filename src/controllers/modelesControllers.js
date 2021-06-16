const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/materielsModels');

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
  createOne({ name, picture, marque_id })
    .then(([results]) => {
      req.modeleId = results.insertId;
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateOneModele = (req, res, next) => {
  updateOne(req.body, req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Modele not Update');
      } else {
        next();
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
