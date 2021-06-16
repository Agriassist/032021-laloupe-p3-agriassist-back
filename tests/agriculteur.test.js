const request = require('supertest');
const server = require('../src/server');
const connection = require('../src/db-connection')

beforeAll(async () => {
  let sql = "DELETE FROM agriculteur WHERE id>0";
  await connection.promise().query(sql);
  sql = "ALTER TABLE agriculteur AUTO_INCREMENT=1";
  await connection.promise().query(sql);
});

const agriculteur = {
  name: 'varchar(100) DEFAULT NULL',
  lastname: 'varchar(100) DEFAULT NULL',
  identifiant: 'varchar(255) NOT NULL',
  password: 'varchar(255) NOT NULL',
  phone: 'varch(1',
  picture_profile: 'varchar(100) NOT NULL',
  email: 'tesrt@gmail.com',
};

describe('consoles routes', () => {
  it('GETs /api/agriculteurs shoul return status 200 and an empty array', async () => {
    const response = await request(server).get('/api/agriculteurs').expect(200);
    expect(response.body.length).toEqual(0);
  });
});

describe('consoles routes', () => {
  it('POSTs /api/agriculteurs shoul return status 200 and an empty array', async () => {
    const response = await request(server).post('/api/agriculteurs').send(agriculteur).expect(201);
    expect(response.body.id).toEqual(1);
  });
});
