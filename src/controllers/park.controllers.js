const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/parkModels');

const getAllAMaterielByAgriculteurId = (req, res) => {
  const { id } = req.params.id;
  if (id) {
    findManyByConcessionaireId(id)
      .then((results) => {
        const materiel = results[0];
        res.json(materiel);
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
    .then(([materiel]) => {
      if (materiel.length === 0) {
        res.status(404).send('Materiel not found');
      } else {
        res.json(materiel[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneMaterielByAgriculteurId = (req, res, next) => {
  // il faudrait vérifier que les données fournies dans la requête sont correctes
  const { agriculteur_id, materiel_id } = req.body;

  createOne({ agriculteur_id, materiel_id })
    .then(([results]) => {
      // res.status(201).json({ id: results.insertId, name, lastname, identifiant, password, phone, picture_profile });
      req.agriId = results.insertId;
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
