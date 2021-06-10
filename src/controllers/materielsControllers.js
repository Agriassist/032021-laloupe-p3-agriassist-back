const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/materielsModels');

const getAllMateriels = (req, res) => {
  findMany()
    .then(([results]) => {
      const materiels = results[0];
      res.json(materiels);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneMaterielById = (req, res) => {
  let id;
  if (req.materielId) {
    id = req.materielsId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([materiels]) => {
      if (materiels.length === 0) {
        res.status(404).send('Materiel not found');
      } else {
        res.json(materiels[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneMateriel = (req, res, next) => {
  const { year, serial_number } = req.body;
  createOne({ year, serial_number })
    .then(([results]) => {
      req.materielId = results.insertId;
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateOneMateriel = (req, res, next) => {
  updateOne(req.body, req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Materiels not Update');
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOneMateriel = (req, res) => {
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
  getAllMateriels,
  getOneMaterielById,
  createOneMateriel,
  updateOneMateriel,
  deleteOneMateriel,
};
