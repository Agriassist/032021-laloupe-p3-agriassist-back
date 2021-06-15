const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/partenariat.model');

const getAllPartenariats = (req, res) => {
  findMany()
    .then(([results]) => {
      const partenariat = results[0];
      res.json(partenariat);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOnePartenariatById = (req, res) => {
  let id;
  if (req.partId) {
    id = req.partId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([partenariat]) => {
      if (partenariat.length === 0) {
        res.status(404).send('Partenariat not found');
      } else {
        res.json(partenariat[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOnePartenariat = (req, res, next) => {
  const { agriculteur_id, concessionaire_id } = req.body;
  createOne({ agriculteur_id, concessionaire_id })
    .then(([results]) => {
      req.partId = results.insertId;
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateOnePartenariat = (req, res, next) => {
  updateOne(req.body, req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Partenariat not Update');
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOnePartenariat = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Partenariat not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllPartenariats,
  getOnePartenariatById,
  createOnePartenariat,
  updateOnePartenariat,
  deleteOnePartenariat,
};
