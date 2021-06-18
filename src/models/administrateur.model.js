const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM administrateur';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM administrateur WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (administrateur) => {
  const sql = 'INSERT INTO administrateur SET ?';
  return connection.promise().query(sql, [administrateur]);
};
const verifExistData = (mail, identifiant, phone) => {
  const sql = 'SELECT * FROM administrateur WHERE mail = ? OR phone = ?';
  return connection.promise().query(sql, [mail, identifiant, phone]);
};

const updateOne = (administrateur, id) => {
  const sql = 'UPDATE administrateur SET ? WHERE id=?';
  return connection.promise().query(sql, [administrateur, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM administrateur WHERE id=?';
  return connection.promise().query(sql, [id]);
};

// Hash password

const hashPassword = async (password) => {
  return await argon2.hash(password);
};

const verifyPassword = async (password, hashedPassword) => {
  return await argon2.verify(hashedPassword, password);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  verifExistData,
  verifyPassword,
  hashPassword,
};
