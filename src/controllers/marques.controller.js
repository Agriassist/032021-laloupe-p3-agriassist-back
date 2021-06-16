const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne, verifExistData } = require('../models/marque.model');

const getAllMarques = (req, res) => {
  findMany()
  .then((results) => {
    const marques = results[0];
    res.json(marques);
  })
  .catch((err) => {
    res.status(500).send(err.message);
  });
};

const getOneMarqueById = (req, res) => {
  let id;
  if (req.marqueId) {
    id = req.marqueId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
  .then(([marques]) => {
    if (marques.length === 0) {
      res.status(404).send('Marque not found');
    } else {
      res.json(marques[0]);
    }
  })
  .catch((err) => {
    res.status(500).send(err.message);
  });
};

const createOneMarque = (req, res, next) => {
  const { name } = req.body;
  verifExistData(name)
    .then(([results]) => {
      if (results[0]) {
        res.send('Marques data already exist');
      } else {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(100).require(),
        }).validate({name}, {abortEarly: false}).error;

        if (validationErrors) {
          res.send('Data enter is invalid');
        } else {
          createOne({ name })
            .then(([results]) => {
              req.marqueId = results.insertId;
              next();
            })
            .catch((err) => {
              res.status(500).send(err.message);
            })
          }
}
}).catch((err) => {
  res.status(500).send(err.message);
})
}

const updateOneMarque = (req, res, next) => {
  const {name} =req.body;

  verifExistData(name)
    .then(([results]) => {
      if (results[0]) {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(100).require(),
        }).validate({name}, {abortEarly: false}).error;

      if (validationErrors) {
        res.send('Data enter is invalid');
      } else {
        updateOne(req.body, req.params.id)
          .then(([results]) => {
            if (results.affectedRows === 0) {
              res.status(404).send('Mise à jour not found');
            } else {
              next();
            }
          })
          .catch((err) => {
            res.status(500).send(err.message);
          })
        }
      } else {
        res.send('Marque data already exist');
}
}).catch((err) => {
  res.status(500).send(err.message);
})
}

const deleteOneMarque = (req, res) => {
  deleteOne(req.params.id)
  .then(([results]) => {
    if (results.affectedRows === 0) {
      res.status(404).send('Marque not found');
    } else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    res.status(500).send(err.message);
  });
};

module.exports = {
  getAllMarques,
  getOneMarqueById,
  createOneMarque,
  updateOneMarque,
  deleteOneMarque,
};