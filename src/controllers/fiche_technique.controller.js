const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne, verifExistData } = require('../models/fiche_technique.model');

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
<<<<<<< HEAD
  const { name, file } = req.body;
  verifExistData(name, file)
=======
  const { name, file, modele_id } = req.body;
  createOne({ name, file, modele_id })
>>>>>>> d4f95eb7a8573de4c2861f68ef97fbd5a930ea6d
    .then(([results]) => {
      if (results[0]) {
        res.send('Fiche data already exist');
      } else {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(100).require(),

          file: Joi.string().max(100).require(),
        }).validate({name, file}, {abortEarly: false}).error;

        if (validationErrors) {
          res.send('Fiche enter is invalid');
        } else {
          createOne({ name, file })
            .then(([results]) => {
              req.ficheId = results.insertId;
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

const updateOneFiche = (req, res) => {
  const { name, file } = req.body;
  verifExistData(name, file)
    .then(([results]) => {
      if (results[0]) {
        res.send('Fiche data already exist');
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(100).require(),

          file: Joi.string().max(100).require(),
        }).validate({name, file}, {abortEarly: false}).error;

        if (validationErrors) {
          res.send('Fiche enter is invalid');
        } else {
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
              })
            }
        } else {
          res.send('Fiche data already exist');
}
}).catch((err) => {
  res.status(500).send(err.message);
})
}

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