const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM partenariat';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM partenariat WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (partenariat) => {
  const sql = 'INSERT INTO partenariat SET ?';
  return connection.promise().query(sql, [partenariat]);
};

const updateOne = (partenariat, id) => {
  const sql = 'UPDATE partenariat SET ? WHERE id=?';
  return connection.promise().query(sql, [partenariat, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM partenariat WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
