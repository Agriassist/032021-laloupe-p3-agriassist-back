const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM agriculteur';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM agriculteur WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (agriculteur) => {
  const sql = 'INSERT INTO agriculteur SET ?';
  return connection.promise().query(sql, [agriculteur]);
};

const updateOne = (agriculteur, id) => {
  const sql = 'UPDATE agriculteur SET ? WHERE id=?';
  return connection.promise().query(sql, [agriculteur, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM agriculteur WHERE id=?';
  return connection.promise().query(sql, [id]);
};
const findManyByConcessionaireId = (id) => {
  const sql =
    'SELECT a.id, a.name, a.lastname, a.identifiant, a.phone, a.picture_profile, a.email FROM concessionnaire c JOIN partenariat p ON c.id = p.concessionaire_id JOIN agriculteur a ON a.id = p.agriculteur_id WHERE c.id = ?';
  return connection.promise().query(sql, [id]);
};

const findManyByMaterielId = (id) => {
  const sql =
    'SELECT a.id, a.name, a.lastname, a.identifiant, a.phone, a.picture_profile, a.email FROM materiel m JOIN park p ON m.id = p.materiel_id JOIN agriculteur a ON a.id = p.agriculteur_id WHERE m.id = ?';
  return connection.promise().query(sql, [id]);
};


module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  findManyByConcessionaireId,
  findManyByMaterielId,
};
