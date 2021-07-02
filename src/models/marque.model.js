const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM marque';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM marque WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (marque) => {
  const sql = 'INSERT INTO marque SET ?';
  return connection.promise().query(sql, [marque]);
};

const verifExistData = (name) => {
  console.log(name);
  const sql = 'SELECT * FROM marque WHERE name = ?';
  return connection.promise().query(sql, [name]);
}

const updateOne = (marque, id) => {
  const sql = 'UPDATE marque SET ? WHERE id=?';
  return connection.promise().query(sql, [marque, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM marque WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  verifExistData,
};
