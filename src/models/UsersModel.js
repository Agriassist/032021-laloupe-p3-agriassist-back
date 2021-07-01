const argon2 = require('argon2');
const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM users';
  return connection.promise().query(sql);
};

const findOneUserById = (id, statue) => {
  const sql = 'SELECT * FROM users WHERE id=? OR statue=?';
  return connection.promise().query(sql, [id, statue]);
};

const createOne = (user) => {
  const sql = 'INSERT INTO users SET ?';
  return connection.promise().query(sql, [user]);
};

const verifExistData = (email, phone) => {
  const sql = 'SELECT * FROM users WHERE email = ? OR phone = ?';
  return connection.promise().query(sql, [email, phone]);
};

const existEmail = (email) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  return connection.promise().query(sql, [email]);
};

const updateOne = (user, id) => {
  const sql = 'UPDATE users SET ? WHERE id=?';
  return connection.promise().query(sql, [user, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM users WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const findManyByMaterielId = (id) => {
  const sql =
    'SELECT u.id, u.nom, u.prenom, u.email, u.identifiant, u.phone, u.photo_profil FROM materiel m JOIN park p ON m.id = p.materiel_id JOIN users u ON u.id = p.users_id WHERE m.id = ?';
  return connection.promise().query(sql, [id]);
};

// Hash password

const hashPassword = async (password) => {
  return argon2.hash(password);
};

const verifyPassword = async (password, hashedPassword) => {
  return argon2.verify(hashedPassword, password);
};

module.exports = {
  findMany,
  findOneUserById,
  createOne,
  verifExistData,
  existEmail,
  updateOne,
  deleteOne,
  findManyByMaterielId,
  hashPassword,
  verifyPassword,
};
