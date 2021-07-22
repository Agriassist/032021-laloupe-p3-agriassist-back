const connection = require('../db-connection');

const findManyBT = () => {
  const sql = 'SELECT * FROM bon_travail';
  return connection.promise().query(sql);
};

const findOneBTById = (id) => {
  const sql = 'SELECT * FROM bon_travail WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOneBT = (bt) => {
  const sql = 'INSERT INTO bon_travail SET ?';
  return connection.promise().query(sql, [bt]);
};

const verifExistData = (name, file) => {
  const sql = 'SELECT * FROM bon_travail WHERE name = ?';
  return connection.promise().query(sql, [name, file]);
};

const updateOneBT = (bt, id) => {
  const sql = 'UPDATE bon_travail SET ? WHERE id=?';
  return connection.promise().query(sql, [bt, id]);
};

const deleteOneBT = (id) => {
  const sql = 'DELETE FROM bon_travail WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const findManyBTByUserId = (id) => {
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findManyBT,
  findOneBTById,
  createOneBT,

  deleteOneBT,
  verifExistData,
  findManyBTByUserId,
};
