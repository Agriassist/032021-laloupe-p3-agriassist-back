const connection = require('../db-connection');

const findMany = () => {
    const sql = 'SELECT * FROM fiche_technique';
    return connection.promise().query(sql);
};

const findOneById = (id) => {
    const sql = 'SELECT * FROM fiche_technique WHERE id=?';
    return connection.promise().query(sql, [id]);
};

const createOne = (carnet) => {
    const sql = 'INSERT INTO fiche_technique SET ?';
    return connection.promise().query(sql, [carnet]);
};

const verifExistData = (name, file) => {
    const sql = 'SELECT * FROM fiche_technique WHERE name = ? OR file = ?';
    return connection.promise().query(sql, [name, file]);
}

const updateOne = (carnet, id) => {
    const sql = 'UPDATE fiche_technique SET ? WHERE id=?';
    return connection.promise().query(sql, [carnet, id]);
};

const deleteOne = (id) => {
    const sql = 'DELETE FROM fiche_technique WHERE id=?';
    return connection.promise().query(sql, [id]);
}

module.exports = {
    findMany,
    findOneById,
    createOne,
    updateOne,
    deleteOne,
    verifExistData,
  };