/* eslint no-console: 0 */
require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 5000;

const server = app.listen(port, (err) => {
  if (err) {
    console.error(`ERROR: ${err.message}`);
  }
});

module.exports = server;
