const Joi = require('joi');

const {
  findMany,
  findOneUserById,
  createOne,
  verifExistData,
  existEmail,
  updateOne,
  deleteOne,
  findManyByMaterielId,
  hashPassword,
  verifyPassword,
} = require('../models/UsersModel');

const getAllUsers = (req, res) => {
  const { materId } = req.params;
  const { status } = req.params;

  if (materId) {
    findManyByMaterielId(materId)
      .then((results) => {
        const agriculteurs = results[0];
        res.json(agriculteurs);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    findMany()
      .then((results) => {
        const users = results[0];
        res.json(users);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const getOneUserById = (req, res, next) => {
  let id;
  if (req.UserId) {
    id = req.UserId;
  } else {
    id = req.params.id;
  }

  findOneUserById(id)
    .then(([users]) => {
      if (users.length === 0) {
        res.status(404).send('user not found');
      } else {
        req.info = { users: users[0] };
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneUser = (req, res, next) => {
  // il faudrait vérifier que les données fournies dans la requête sont correctes
  const { statue, nom, prenom, email, identifiant, hassPassword, phone, photo_profil } = req.body;

  verifExistData(email, phone)
    .then(async ([results]) => {
      if (results[0]) {
        res.send('user data already exist');
      } else {
        let validationErrors = null;
        validationErrors = Joi.object({
          statue: Joi.string().valid('agriculteur', 'concessionnaire').required(),

          nom: Joi.string().max(100).required(),

          prenom: Joi.string().max(100).required(),

          email: Joi.string().email().max(100).required(),

          identifiant: Joi.string().max(100),

          hassPassword: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).min(8).max(32).required(),

          phone: Joi.string().max(10).required(),

          photo_profil: Joi.string().max(100),
        }).validate({ statue, nom, prenom, email, identifiant, hassPassword, phone, photo_profil }, { abortEarly: false }).error;

        if (validationErrors) {
          console.log(validationErrors);
          res.send('Data enter is invalid');
        } else {
          const hashedPassword = await hashPassword(hassPassword);
          createOne({ statue, nom, prenom, email, identifiant, hassPassword: hashedPassword, phone, photo_profil })
            .then(([result]) => {
              req.agriId = result.insertId;
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
  const { statue, nom, prenom, email, identifiant, hassPassword, phone, photo_profil } = req.body;
  const { id } = req.params;

  findOneUserById(id)
    .then(async ([results]) => {
      if (results[0]) {
        let validationErrors = null;
        validationErrors = Joi.object({
          statue: Joi.string().valid('agriculteur', 'concessionnaire'),

          nom: Joi.string().max(100),

          prenom: Joi.string().max(100),

          email: Joi.string().email().max(100),

          identifiant: Joi.string().max(100),

          hassPassword: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).min(8).max(32),

          phone: Joi.string().max(10),

          photo_profil: Joi.string().max(100),
        }).validate({ statue, nom, prenom, email, identifiant, hassPassword, phone, photo_profil }, { abortEarly: false }).error;

        if (validationErrors) {
          console.log(validationErrors);
          res.send('Data enter is invalid');
        } else {
          if (req.body.hassPassword) {
            req.body.hassPassword = await hashPassword(hassPassword);
          }
          updateOne(req.body, id)
            .then(([result]) => {
              if (result.affectedRows === 0) {
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
  const { email } = req.body;
  const { password } = req.body;
  console.log(email, password);

  let validationErrors = null;
  validationErrors = Joi.object({
    password: Joi.string().min(8).max(32).required(),

    email: Joi.string().email().max(255).required(),
  }).validate({ password, email }, { abortEarly: false }).error;
  if (validationErrors) {
    res.send('error');
  } else {
    console.log('ok22');
    await existEmail(email)
      .then(async ([results]) => {
        if (results.length === 0) {
          res.status(404).send("user email don't exist");
        } else {
          req.body.loginPassword = await hashPassword(password);
          console.log(results[0].password);
          const passValid = await verifyPassword(password, req.body.loginPassword);
          console.log(passValid);
          if (!passValid) {
            res.send('Password est pas bon');
          } else {
            req.userId = results;
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
};
