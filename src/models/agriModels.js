const connection = require('../db-config');

const findmany = () => {
  const sql = 'SELECT * FROM agriculteur';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM agriculteur WHERE id =?';
  return connection.promise().query(sql, [id]);
};

const createOne = (agriculteur) => {
  const sql = 'INSERT INTO agriculteur SET ?';
  return connection.promise().query(sql, [agriculteur]);
};
const updateOne = (id, agriculteur) => {
  const sql = 'UPDATE agriculteur SET ? WHERE id = ?';
  return connection.promise().query(sql, [id, agriculteur]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM agriculteur WHERE id=?';
  return connection.promise().query(sql, [id])
}

module.exports = {
  findmany,
  createOne,
  findOneById,
  updateOne,
  deleteOne,
};
