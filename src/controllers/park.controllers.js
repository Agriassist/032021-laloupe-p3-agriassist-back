const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/parkModels');

const getAllAMaterielByAgriculteurId = (req, res) => {
  const id = req.params.id;
  if (id) {
    findManyByConcessionaireId(id)
      .then((results) => {
        const park = results[0];
        res.json(park);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    findMany()
      .then((results) => {
        const mate = results[0];
        res.json(mate);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const getOneMaterielByAgriculteurId = (req, res) => {
  let id;
  if (req.agriId) {
    id = req.agriId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([park]) => {
      if (park.length === 0) {
        res.status(404).send(id);
      } else {
        res.json(park[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneMaterielByAgriculteurId = (req, res, next) => {
  const { agriculteur_id, materiel_id } = req.body;

  createOne({ agriculteur_id, materiel_id })
    .then(() => {
      req.agriId = agriculteur_id;
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateOneMaterielByAgriculteurById = (req, res, next) => {
  // il faudrait vérifier que les données fournies dans la requête sont correctes
  updateOne(req.body, req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Materiel not found');
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOneMaterielByAgriculteurId = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Materiel not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllAMaterielByAgriculteurId,
  getOneMaterielByAgriculteurId,
  createOneMaterielByAgriculteurId,
  updateOneMaterielByAgriculteurById,
  deleteOneMaterielByAgriculteurId,
};
