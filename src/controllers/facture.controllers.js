// const Joi = require('joi');
// const multer = require('multer');
// const {
//   findManyFacture,
//   findOneFactureById,
//   createOneFacture,
//   updateOneFacture,
//   deleteOne,
//   verifExistData,
//   findManyFactureByUserId,
// } = require('../models/facture.model');

// const getAllFacture = (req, res) => {
//   const { factureId } = req.params;
//   if (factureId) {
//     findOneFactureById(factureId)
//       .then((results) => {
//         const facture = results[0];
//         res.json(facture);
//       })
//       .catch((err) => {
//         res.status(500).send(err.message);
//       });
//   } else {
//     findManyFacture()
//       .then((results) => {
//         const facture = results[0];
//         res.json(facture);
//       })
//       .catch((err) => {
//         res.status(500).send(err.message);
//       });
//   }
// };

// const getOneFactureById = (req, res) => {
//   let id;
//   if (req.factureId) {
//     id = req.factureId;
//   } else {
//     id = req.params.id;
//   }

//   findOneFactureById(id)
//     .then(([facture]) => {
//       if (facture === 0) {
//         res.status(404).send('facture not found');
//       } else {
//         res.json(facture[0]);
//       }
//     })
//     .catch((err) => {
//       res.status(500).send(err.message);
//     });
// };

// const createOneFacture = (req, res, next) => {
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'public/images_facture');
//     },
//     filename: (_, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     },
//   });

//   const upload = multer({ storage }).single('file');
//   upload(req, res, (err) => {
//     const facture = req.body;
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       verifExistData(facture.name).then(async ([results]) => {
//         if (results[0]) {
//           res.send('name facture already exist');
//         } else {
//           let validationErrors = null;
//           validationErrors = Joi.object({
            
//           }).validate(facture, { abortEarly: false }).error;

//           if (validationErrors) {
//             console.log(validationErrors);
//             res.send('Data enter is invalid');
//           } else {
//             createOne(facture)
//               .then(([result]) => {
//                 console.log(result);
//                 req.factureId = result.insertId;
//                 next();
//               })
//               .catch((err) => {
//                 res.status(500).send(err.message);
//               });
//           }
//         }
//       });
//     }
//   });
// };

// const deleteOneFacture = (req, res) => {
//     deleteOne(req.params.id)
//       .then(([results]) => {
//         if (results.affectedRows === 0) {
//           res.status(404).send('fiche not found');
//         } else {
//           res.sendStatus(204);
//         }
//       })
//       .catch((err) => {
//         res.status(500).send(err.message);
//       });
//   };

//   module.exports = {
//     getAllFacture,
//     getOneFactureById,
//     createOneFacture,
//     deleteOneFacture,
//   };
  
