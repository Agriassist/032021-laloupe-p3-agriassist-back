const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM fiche_technique';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM fiche_technique WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (carnet) => {
  const sql = 'INSERT INTO fiche_technique SET ?';
  return connection.promise().query(sql, [carnet]);
};

const verifExistData = (name, file) => {
  const sql = 'SELECT * FROM fiche_technique WHERE name = ?';
  return connection.promise().query(sql, [name, file]);
};

const updateOne = (carnet, id) => {
  const sql = 'UPDATE fiche_technique SET ? WHERE id=?';
  return connection.promise().query(sql, [carnet, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM fiche_technique WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const findManyFicheTechniqueId = (id) => {
  const sql = 'SELECT m.id, m.name, m.image FROM modele m JOIN fiche_technique t ON m.id = t.modele_id';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  verifExistData,
  findManyFicheTechniqueId,
};
