const { findMany, findOneById, createOne, updateOne, deleteOne, findManyByAgriculteurId } = require('../models/concessionnaire.model');

const getAllConcessionnaires = (req, res) => {
  const id = req.params.agriId;

  if (id) {
    findManyByAgriculteurId(id)
      .then((results) => {
        const concessionnaire = results[0];
        res.json(concessionnaire);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    findMany()
      .then((results) => {
        const concessionnaire = results[0];
        res.json(concessionnaire);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const getOneConcessionnaireById = (req, res) => {
  let id;
  if (req.concId) {
    id = req.concId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([concessionnaires]) => {
      if (concessionnaires.length === 0) {
        res.status(404).send('Concessionnaire not found');
      } else {
        res.json(concessionnaires[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneConcessionnaire = (req, res, next) => {
  const { name, identifiant, password, phone, address, picture_logo, email } = req.body;
  createOne({ name, identifiant, password, phone, address, picture_logo, email })
    .then(([results]) => {
      req.concId = results.insertId;
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateOneConcessionnaire = (req, res, next) => {
  updateOne(req.body, req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Concessionnaire not found');
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOneConcessionnaire = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Concesionnaire not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllConcessionnaires,
  getOneConcessionnaireById,
  createOneConcessionnaire,
  updateOneConcessionnaire,
  deleteOneConcessionnaire,
};
