const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM partenariat';
  return connection.promise().query(sql);
};

const findOneById = (agriculteur_id) => {
  const sql = 'SELECT * FROM partenariat WHERE agriculteur_id=?';
  return connection.promise().query(sql, [agriculteur_id]);
};

const createOne = (partenariat) => {
  const sql = 'INSERT INTO partenariat SET ?';
  return connection.promise().query(sql, [partenariat]);
};

const updateOne = (partenariat, agriculteur_id) => {
  const sql = 'UPDATE partenariat SET ? WHERE agriculteur_id=?';
  return connection.promise().query(sql, [partenariat, agriculteur_id]);
};

const deleteOne = (agriculteur_id) => {
  const sql = 'DELETE FROM partenariat WHERE agriculteur_id=?';
  return connection.promise().query(sql, [agriculteur_id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
