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

const verifExistData = (email, identifiant, phone) => {
  const sql = 'SELECT * FROM concessionnaire WHERE email = ? AND identifiant = ? AND phone = ?';
  return connection.promise().query(sql, [email, identifiant, phone]);
};

const updateOne = (concessionnaire, id) => {
  const sql = 'UPDATE concessionnaire SET ? WHERE id=?';
  return connection.promise().query(sql, [concessionnaire, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM concessionnaire WHERE id=?';
  return connection.promise().query(sql, [id]);
};
const findManyByAgriculteurId = (id) => {
  const sql =
    'SELECT c.id, c.name, c.lastname, c.identifiant, c.phone, c.picture_logo, c.address, c.email FROM concessionnaire c JOIN partenariat p ON c.id = p.concessionaire_id JOIN agriculteur a ON a.id = p.agriculteur_id WHERE a.id = ?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  verifExistData,
  updateOne,
  deleteOne,
  findManyByAgriculteurId,
};
