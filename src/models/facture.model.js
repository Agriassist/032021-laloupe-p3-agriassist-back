const connection = require('../db-connection');

const findManyFacture = () => {
  const sql = 'SELECT * FROM facture';
  return connection.promise().query(sql);
};

const findOneFactureById = (id) => {
  const sql = 'SELECT * FROM facture WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOneFacture = (facture) => {
  const sql = 'INSERT INTO facture SET ?';
  return connection.promise().query(sql, [facture]);
};

const verifExistData = (name, file) => {
  const sql = 'SELECT * FROM facture WHERE name = ?';
  return connection.promise().query(sql, [name, file]);
};

const updateOneFacture = (facture, id) => {
  const sql = 'UPDATE facture SET ? WHERE id=?';
  return connection.promise().query(sql, [facture, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM facture WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const findManyFactureByUserId = (id) => {
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findManyFacture,
  findOneFactureById,
  createOneFacture,
  updateOneFacture,
  deleteOne,
  verifExistData,
  findManyFactureByUserId,
};
