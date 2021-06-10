const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM agriculteur';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM agriculteur WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (agriculteur) => {
  const sql = 'INSERT INTO agriculteur SET ?';
  return connection.promise().query(sql, [agriculteur]);
};

const updateOne = (agriculteur, id) => {
  const sql = 'UPDATE agriculteur SET ? WHERE id=?';
  return connection.promise().query(sql, [agriculteur, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM agriculteur WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
