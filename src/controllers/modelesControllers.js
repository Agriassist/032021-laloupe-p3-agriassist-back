/* eslint-disable prefer-destructuring */
const Joi = require('joi');
const multer = require('multer');

const { findMany, findOneById, createOne, updateOne, deleteOne, verifExistDataModele, findManyByMarqueId } = require('../models/modelesModels');

const getAllModeles = (req, res) => {
  const { marque_Id } = req.body;
  if (marque_Id) {
    findManyByMarqueId(marque_Id)
      .then((results) => {
        const modeles = results[0];
        res.json(modeles);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    findMany()
      .then(([results]) => {
        const modeles = results;
        res.json(modeles);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const getAllModelesByMarqueId = (req, res) => {
  const { id } = req.params;
  findManyByMarqueId(id)
    .then((results) => {
      const modeles = results[0];
      res.json(modeles);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneModeleById = (req, res, next) => {
  let id;
  if (req.modeleId) {
    id = req.modeleId;
  } else if (req.info.materiel.modele_id) {
    id = req.info.materiel.modele_id;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([modeles]) => {
      if (modeles.length === 0) {
        res.status(404).send('Modele not found');
      }
      req.info.modele = modeles[0];
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneModele = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images_modele');
    },
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage }).single('file');
  upload(req, res, (err) => {
    const modele = JSON.parse(req.body.modele);
    if (err) {
      res.status(500).json(err);
    } else {
      verifExistDataModele(modele.name)
        .then(([results]) => {
          if (results[0]) {
            res.send('Modele name  arleady exist');
          } else {
            let validationErrors = null;
            validationErrors = Joi.object({
              name: Joi.string().max(255).required(),

              marque_id: Joi.number().integer().required(),
            }).validate(modele, { abortEarly: false }).error;

            if (validationErrors) {
              res.send('Data enter is invalid');
            } else {
              req.modeles = {
                picture: req.file.filename,
                ...modele,
              };

              createOne(req.modeles)
                .then(([result]) => {
                  res.json(result);
                })
                .catch((err) => {
                  res.status(500).send(err.message);
                });
            }
          }
        })

        .catch((err) => {
          res.status(500).send(err.message);
        });
    }
  });
};

const updateOneModele = (req, res, next) => {
  // il faudrait vérifier que les données fournies dans la requête sont correctes
  const { name, picture, marque_id } = req.body;
  const { id } = req.params;

  findOneById(id)
    .then(([results]) => {
      if (results[0]) {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(255),

          picture: Joi.string().max(100),

          marque_id: Joi.number().integer(),
        }).validate({ name, picture, marque_id }, { abortEarly: false }).error;

        if (validationErrors) {
          res.send('Data enter is invalid');
        } else {
          updateOne(req.body, req.params.id)
            .then(([modeles]) => {
              if (modeles.affectedRows === 0) {
                res.status(404).send('Modele not found');
              } else {
                req.info.modele = modeles[0];
                next();
              }
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
        }
      } else {
        res.send('Modele data arleady exist');
      }
    })

    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOneModele = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Modele not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllModeles,
  getOneModeleById,
  createOneModele,
  updateOneModele,
  deleteOneModele,
  getAllModelesByMarqueId,
};
