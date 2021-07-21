const { findMany, findManyById, findOneById, createOne, updateOne, deleteOne } = require('../models/parkModels');

const getAllAMaterielByUserId = (req, res) => {
  findMany()
    .then((results) => {
      const mate = results[0];
      res.json(mate);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneMaterielByUserId = (req, res) => {
  let id;
  console.log(req.body);
  if (req.materielId) {
    id = req.materielId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([park]) => {
      if (park.length === 0) {
        res.status(404).send(id);
      } else {
        res.json(park);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getUsersByMaterielId = (req, res) => {
  let id;
  console.log(req.body);
  if (req.materielId) {
    id = req.materielId;
  } else {
    id = req.params.id;
  }

  findManyById(id)
    .then(([park]) => {
      if (park.length === 0) {
        res.status(404).send(id);
      } else {
        res.json(park);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};


const createOneMaterielByUserId = (req, res, next) => {
  console.log(req.infoCompte, 'laaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  const { materiel_Id, agriculteurId, concessionnaireId } = req.infoCompte;

  createOne({ users_id: agriculteurId, materiel_id: materiel_Id })
    .then(() => {
      createOne({ users_id: concessionnaireId, materiel_id: materiel_Id }).then(() => {
        req.materiel_Id = materiel_Id;
        next();
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateOneMaterielByUserById = (req, res, next) => {
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

const deleteOneMaterielByUserId = (req, res) => {
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
  getAllAMaterielByUserId,
  getUsersByMaterielId,
  getOneMaterielByUserId,
  createOneMaterielByUserId,
  updateOneMaterielByUserById,
  deleteOneMaterielByUserId,
};
