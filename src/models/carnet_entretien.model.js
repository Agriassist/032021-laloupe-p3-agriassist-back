const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM carnet_entretien';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM carnet_entretien WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (carnet) => {
  const sql = 'INSERT INTO carnet_entretien SET ?';
  return connection.promise().query(sql, [carnet]);
};

const verifExistData = (oil, use_times, materiel_id) => {
  const sql = 'SELECT * FROM carnet_entretien WHERE oil = ? Or use_times = ? OR materiel_id = ?';
  return connection.promise().query(sql, [oil, use_times, materiel_id]);
};

const updateOne = (carnet, id) => {
  const sql = 'UPDATE carnet_entretien SET ? WHERE id=?';
  return connection.promise().query(sql, [carnet, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM carnet_entretien WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const findManyMaterielId = (id) => {
  const sql = 'SELECT m.id, m.type, m.year, number_serial FROM materiel m JOIN carnet_entretien c ON m.id = c.modele_id';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  verifExistData,
  updateOne,
  deleteOne,
  findManyMaterielId,
};
