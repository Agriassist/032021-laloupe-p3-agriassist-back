const Joi = require('joi');

const {
  findManyUsers,
  findOneUserById,
  createOneUser,
  verifExistDataUsers,
  existEmailUsers,
  updateOneUser,
  deleteOneUser,
  findManyByMaterielId,
  hashPassword,
  verifyPasswordUser,
} = require('../models/UsersModel');

const getAllUsers = (req, res) => {
  const id = req.params.consId;
  const materId = req.params.materId;

  if (id) {
    findManyByConcessionaireId(id)
      .then((results) => {
        const agriculteurs = results[0];
        res.json(agriculteurs);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else if (materId) {
    findManyByMaterielId(materId)
      .then((results) => {
        const agriculteurs = results[0];
        res.json(agriculteurs);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    findManyUser()
      .then((results) => {
        const agriculteurs = results[0];
        res.json(agriculteurs);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const getOneUserById = (req, res) => {
  let id;
  if (req.agriId) {
    id = req.agriId;
  } else {
    id = req.params.id;
  }

  findOneUserById(id)
    .then(([agriculteurs]) => {
      if (agriculteurs.length === 0) {
        res.status(404).send('user not found');
      } else {
        res.json(agriculteurs[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneUser = (req, res, next) => {
  // il faudrait vérifier que les données fournies dans la requête sont correctes
  const { name, lastname, identifiant, password, phone, picture_profile, email } = req.body;

  verifExistDataUser(email, identifiant, phone)
    .then(async ([results]) => {
      if (results[0]) {
        res.send('user data already exist');
      } else {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(100).required(),

          lastname: Joi.string().max(100).required(),

          identifiant: Joi.string().max(100),

          password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).min(8).max(32).required(),

          phone: Joi.string().max(10).required(),

          picture_profile: Joi.string().max(100),

          email: Joi.string().email().max(100).required(),
        }).validate({ name, lastname, identifiant, password, phone, picture_profile, email }, { abortEarly: false }).error;

        if (validationErrors) {
          console.log(validationErrors);
          res.send('Data enter is invalid');
        } else {
          const hashedPassword = await hashPassword(password);
          createOne({ name, lastname, identifiant, password: hashedPassword, phone, picture_profile, email })
            .then(([results]) => {
              req.agriId = results.insertId;
              next();
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
};

const updateOneUser = (req, res, next) => {
  const { name, lastname, identifiant, password, phone, picture_profile, email } = req.body;
  const { id } = req.params;

  findOneUserById(id)
    .then(async ([results]) => {
      if (results[0]) {
        let validationErrors = null;
        validationErrors = Joi.object({
          name: Joi.string().max(255),

          lastname: Joi.string().max(255),

          identifiant: Joi.string().max(255),

          password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).min(8).max(32),

          phone: Joi.string().max(10),

          picture_profile: Joi.string().max(100),

          email: Joi.string().email().max(255),
        }).validate({ name, lastname, identifiant, password, phone, picture_profile, email }, { abortEarly: false }).error;

        if (validationErrors) {
          console.log(validationErrors);
          res.send('Data enter is invalid');
        } else {
          if (req.body.password) {
            req.body.password = await hashPassword(password);
          }
          updateOneUser(req.body, id)
            .then(([results]) => {
              if (results.affectedRows === 0) {
                res.status(404).send('user not found');
              } else {
                next();
              }
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
        }
      } else {
        res.send('user data already exist');
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteOneUser = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('user not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const verifUserEmailandPassword = async (req, res, next) => {
  const { email, password } = req.body;

  let validationErrors = null;
  validationErrors = Joi.object({
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).min(8).max(32).required(),

    email: Joi.string().email().max(255).required(),
  }).validate({ password, email }, { abortEarly: false }).error;
  if (validationErrors) {
    res.send('error');
  } else {
    await existEmailUser()
      .then(async ([results]) => {
        if (results.length === 0) {
          res.status(404).send("user email don't exist");
        } else {
          const passValid = await verifyPasswordUser(password, results[0].password);
          if (!passValid) {
            res.send('Password est pas bon');
          } else {
            req.userId = results[0];
            next();
          }
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

module.exports = {
    getAllUsers,
    getOneUserById,
    createOneUser,
    updateOneUser,
    deleteOneUser,
    verifUserEmailandPassword,
}
