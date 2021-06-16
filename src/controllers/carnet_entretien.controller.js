const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/carnet_entretien.model');

const getAllCarnet = (req, res) => {
  findMany()
    .then((results) => {
      const carnet_entretien = results[0];
      res.json(carnet_entretien);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneCarnetById = (req, res) => {
  let id;
  if (req.carnetId) {
    id = req.carnetId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([carnet_entretien]) => {
      if (carnet_entretien.length === 0) {
        res.status(404).send('carnet not found');
      } else {
        res.json(carnet_entretien[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneCarnet = (req, res, next) => {
  const { oil, use_times, materiel_id } = req.body;
  createOne({ oil, use_times, materiel_id })
    .then(([results]) => {
      req.carnetId = results.insertId;
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateOneCarnet = (req, res) => {
  updateOne(req.body, req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('carnet not found');
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOneCarnet = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('carnet not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
    getAllCarnet,
    getOneCarnetById,
    createOneCarnet,
    updateOneCarnet,
    deleteOneCarnet,
  };