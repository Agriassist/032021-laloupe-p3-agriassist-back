const { closeConnection, deleteAllDBData } = require('../src/db-connection.js');
const server = require('../src/server.js');

const closeApp = () =>
  new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });

afterAll(async () => {
  await closeConnection();
  await closeApp();
});