const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM concessionnaire';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM concessionnaire WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (concessionnaire) => {
  const sql = 'INSERT INTO concessionnaire SET ?';
  return connection.promise().query(sql, [concessionnaire]);
};

const updateOne = (concessionnaire, id) => {
  const sql = 'UPDATE concessionnaire SET ? WHERE id=?';
  return connection.promise().query(sql, [concessionnaire, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM concessionnaire WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
