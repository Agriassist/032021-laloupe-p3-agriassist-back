const Joi = require('joi');
const multer = require('multer');
const { findManyBT, findOneBTById, createOneBT, deleteOneBT, verifExistData, findManyBTByUserId } = require('../models/bonTravail.model');

const getAllBT = (req, res) => {
  const { btId } = req.params;
  if (btId) {
    findOneBTById(btId)
      .then((results) => {
        const BT = results[0];
        res.json(BT);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    findManyBT()
      .then((results) => {
        const BT = results[0];
        res.json(BT);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const getOneBTById = (req, res) => {
  let id;
  if (req.btId) {
    id = req.btId;
  } else {
    id = req.params.id;
  }

  findOneBTById(id)
    .then(([bt]) => {
      if (bt === 0) {
        res.status(404).send('bon de travail not found');
      } else {
        res.json(bt[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneFacture = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images_bon_travail');
    },
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage }).single('file');
  upload(req, res, (err) => {
    const BT = req.body;
    if (err) {
      res.status(500).json(err);
    } else {
      verifExistData(BT.name).then(async ([results]) => {
        if (results[0]) {
          res.send('name bon de travail already exist');
        } else {
          let validationErrors = null;
          validationErrors = Joi.object({}).validate(BT, { abortEarly: false }).error;

          if (validationErrors) {
            console.log(validationErrors);
            res.send('Data enter is invalid');
          } else {
            createOneBT(BT)
              .then(([result]) => {
                console.log(result);
                req.btId = result.insertId;
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

const deleteOne = (req, res) => {
  deleteOneBT(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('bon de travail not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllBT,
  getOneBTById,
  createOneBT,
  deleteOne,
};
