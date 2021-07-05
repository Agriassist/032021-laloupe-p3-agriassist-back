const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM park';
  return connection.promise().query(sql);
};

const findOneById = (users_id) => {
  const sql = 'SELECT * FROM park WHERE users_id=?';
  return connection.promise().query(sql, [users_id]);
};

const createOne = (materiel) => {
  const sql = 'INSERT INTO park SET ?';
  return connection.promise().query(sql, [materiel]);
};

const updateOne = (materiel, users_id) => {
  const sql = 'UPDATE park SET ? WHERE users_id=?';
  return connection.promise().query(sql, [materiel, users_id]);
};

const deleteOne = (users_id) => {
  const sql = 'DELETE FROM park WHERE users_id=?';
  return connection.promise().query(sql, [users_id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
