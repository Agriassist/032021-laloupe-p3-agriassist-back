const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM materiel';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM materiel WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (materiel) => {
  const sql = 'INSERT INTO materiel SET ?';
  return connection.promise().query(sql, [materiel]);
};

const verifExistData = (serial_number) => {
  const sql = 'SELECT * FROM materiel WHERE serial_number = ?';
  return connection.promise().query(sql, [serial_number]);
};

const updateOne = (materiel, id) => {
  const sql = 'UPDATE materiel SET ? WHERE id=?';
  return connection.promise().query(sql, [materiel, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM materiel WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const findManyByAgriculteurId = (id) => {
  const sql =
    'SELECT m.id, m.year, m.serial_number, m.type, m.modele_id FROM agriculteur a JOIN park p ON a.id = p.agriculteur_id JOIN materiel m ON m.id = p.materiel_id WHERE a.id = ?';
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
