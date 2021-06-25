const argon2 = require('argon2');
const connection = require('../db-connection');

const findManyUsers = () => {
  const sql = 'SELECT * FROM users';
  return connection.promise().query(sql);
};

const findOneUserById = (id) => {
  const sql = 'SELECT * FROM users WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOneUser = (user) => {
  const sql = 'INSERT INTO users SET ?';
  return connection.promise().query(sql, [user]);
};

const verifExistDataUsers = (email,phone) => {
  const sql = 'SELECT * FROM users WHERE email = ? OR phone = ?';
  return connection.promise().query(sql, [email, phone]);
};

const existEmailUsers = (email) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  return connection.promise().query(sql, [email]);
};

const updateOneUser = (user, id) => {
  const sql = 'UPDATE users SET ? WHERE id=?';
  return connection.promise().query(sql, [user, id]);
};

const deleteOneUser = (id) => {
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
  return await argon2.hash(password);
};

const verifyPasswordUser = async (password, hashedPassword) => {
  return await argon2.verify(hashedPassword, password);
};

module.exports = {
  findManyUsers,
  findOneUserById,
  createOneUser,
  verifExistDataUsers,
  existEmailUsers,
  updateOneUser,
  deleteOneUser,
  findManyByMaterielId,
  hashPassword,
  verifyPasswordUser,
};
