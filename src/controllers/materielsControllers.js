const { findMany, findOneById, createOne, updateOne, deleteOne, findManyByAgriculteurId } = require('../models/materielsModels');

const getAllMateriels = (req, res) => {
    const id = req.params.agriId;

    if (id) {
      findManyByAgriculteurId(id)
        .then((results) => {
          const agriculteur = results[0];
          res.json(agriculteur);
        })
        .catch((err) => {
          res.status(500).send(err.message);
        });
    } else {
      findMany()
        .then((results) => {
          const agriculteur = results[0];
          res.json(agriculteur);
        })
        .catch((err) => {
          res.status(500).send(err.message);
        });
    }
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
  const { year, serial_number, type } = req.body;
  createOne({ year, serial_number, type })
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

const AllMaterielsByAgriculteurId = (res, req) => {
  findManyByAgriculteurId(req.params.id)
    .then(([results]) => {
      if (results.length === 0) {
        res.status(404).send('Park not found');
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
  AllMaterielsByAgriculteurId,
};
