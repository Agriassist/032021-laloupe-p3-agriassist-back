const argon2 = require('argon2');
const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM users';
  return connection.promise().query(sql);
};

const findOneUserById = (id) => {
  const sql = 'SELECT * FROM users WHERE id=?';
  return connection.promise().query(sql, [id]);
};
const findOnebyNameAndStatue = (nom, status) => {
  const sql = 'SELECT * FROM users WHERE nom=? AND status=?';
  return connection.promise().query(sql, [nom, status]);
};

const findOnePasswordByEmail = (email) => {
  const sql = 'SELECT hassPassword FROM users WHERE email = ?';
  return connection.promise().query(sql, [email]);
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
  console.log(email);
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

const verifyPassword = (password, hashedPassword) => {
  console.log(password, hashedPassword);
  return argon2.verify(hashedPassword, password);
};

module.exports = {
  findMany,
  findOneUserById,
  findOnePasswordByEmail,
  findOnebyNameAndStatue,
  createOne,
  verifExistData,
  existEmail,
  updateOne,
  deleteOne,
  findManyByMaterielId,
  hashPassword,
  verifyPassword,
};
