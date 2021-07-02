const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM park';
  return connection.promise().query(sql);
};

const findOneById = (agriculteur_id) => {
  const sql = 'SELECT * FROM park WHERE agriculteur_id=?';
  return connection.promise().query(sql, [agriculteur_id]);
};

const createOne = (materiel) => {
  const sql = 'INSERT INTO park SET ?';
  return connection.promise().query(sql, [materiel]);
};

const updateOne = (materiel, agriculteur_id) => {
  const sql = 'UPDATE park SET ? WHERE agriculteur_id=?';
  return connection.promise().query(sql, [materiel, agriculteur_id]);
};

const deleteOne = (agriculteur_id) => {
  const sql = 'DELETE FROM park WHERE agriculteur_id=?';
  return connection.promise().query(sql, [agriculteur_id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
