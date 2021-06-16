const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/fiche_technique.model');

const getAllFiche = (req, res) => {
  findMany()
    .then((results) => {
      const fiche_technique = results[0];
      res.json(fiche_technique);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneFicheById = (req, res) => {
  let id;
  if (req.ficheId) {
    id = req.ficheId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([fiche_technique]) => {
      if (fiche_technique.length === 0) {
        res.status(404).send('fiche not found');
      } else {
        res.json(fiche_technique[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneFiche = (req, res, next) => {
  const { name, file, modele_id } = req.body;
  createOne({ name, file, modele_id })
    .then(([results]) => {
      req.ficheId = results.insertId;
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateOneFiche = (req, res) => {
  updateOne(req.body, req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('fiche not found');
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOneFiche = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('fiche not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
    getAllFiche,
    getOneFicheById,
    createOneFiche,
    updateOneFiche,
    deleteOneFiche,
  };