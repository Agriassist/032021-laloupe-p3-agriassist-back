const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM materiel';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM materiel WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (materiel) => {
  const sql = 'INSERT INTO materiel SET ?';
  return connection.promise().query(sql, [materiel]);
};

const updateOne = (materiel, id) => {
  const sql = 'UPDATE materiel SET ? WHERE id=?';
  return connection.promise().query(sql, [materiel, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM materiel WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
