const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM administrateur';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM administrateur WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (administrateur) => {
  const sql = 'INSERT INTO administrateur SET ?';
  return connection.promise().query(sql, [administrateur]);
};

const updateOne = (administrateur, id) => {
  const sql = 'UPDATE administrateur SET ? WHERE id=?';
  return connection.promise().query(sql, [administrateur, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM administrateur WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};