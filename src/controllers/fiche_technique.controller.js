const Joi = require('joi');
const multer = require('multer');
const {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  verifExistData,
  findManyFicheTechniqueId,
} = require('../models/fiche_technique.model');

const getAllFiche = (req, res) => {
  const { ficheId } = req.params;
  if (ficheId) {
    findManyFicheTechniqueId(ficheId)
      .then((results) => {
        const modeles = results[0];
        res.json(modeles);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    findMany()
      .then((results) => {
        const fiche_technique = results[0];
        res.json(fiche_technique);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
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
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images_fichetech');
    },
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage }).single('file');
  upload(req, res, (err) => {
    const info = JSON.parse(req.body.info);
    if (err) {
      res.status(500).json(err);
    } else {
      verifExistData(info.name).then(async ([results]) => {
        if (results[0]) {
          res.send('name file already exist');
        } else {
          let validationErrors = null;
          validationErrors = Joi.object({
            name: Joi.string().max(100),

            file: Joi.string().max(100),

            modele_id: Joi.number().integer(),
          }).validate(info, { abortEarly: false }).error;

          if (validationErrors) {
            console.log(validationErrors);
            res.send('Data enter is invalid');
          } else {
            req.pdf = {
              file: req.file.filename,
              ...info,
            };
            createOne(req.pdf)
            .then(([result]) => {
                console.log(result)
                req.ficheId = result.insertId;
                next();
              })
              .catch((err) => {
                res.status(500).send(err.message);
              });
          }
        }
      });
    }
  });
};

const updateOneFiche = (req, res, next) => {
  const { name, file, modele_id } = req.body;
  const { id } = req.params;

  findOneById(id)
    .then(([results]) => {
      if (results[0]) {
        res.send('Fiche data already exist');
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(100),

          file: Joi.string().max(100),

          modele_id: Joi.number().integer(),
        }).validate({ name, file, modele_id }, { abortEarly: false }).error;

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
            });
        }
      } else {
        res.send('Fiche data already exist');
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

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
