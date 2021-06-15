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

const findAllAgriculteursByConcessionnaireId = (id) => {
  const sql =
    'SELECT a.name, a.lastname, a.identifiant, a.password, a.phone, a.picture_profile, a.mail FROM agriculteur AS a JOIN partenariat AS p ON p.agriculteur_id = a.id JOIN concessionnaire AS c ON p.concessionnaire_id = c.id WHERE c.id = ?';
    return connection.promise().query(sql, [id]);
  };

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  findManyByConcessionaireId,
};
