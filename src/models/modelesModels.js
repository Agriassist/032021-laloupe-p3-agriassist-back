const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM modele';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM modele WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (modele) => {
  const sql = 'INSERT INTO modele SET ?';
  console.log(modele);
  return connection.promise().query(sql, [modele]);
};
const verifExistDataModele = (name, picture) => {
  const sql = 'SELECT * FROM modele WHERE name = ? OR picture = ?';
  return connection.promise().query(sql, [name, picture]);
};

const updateOne = (modele, id) => {
  const sql = 'UPDATE modele SET ? WHERE id=?';
  return connection.promise().query(sql, [modele, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM modele WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const findManyByMarqueId = (id) => {
  const sql = 'SELECT m.id, m.name FROM marque m JOIN modele d ON m.id = d.marque_id';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  verifExistDataModele,
  updateOne,
  deleteOne,
  findManyByMarqueId,
};
