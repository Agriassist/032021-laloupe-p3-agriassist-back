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
  name: 'varchar(100) NOT NULL',
  lastname: 'varchar(100) NOT NULL',
  identifiant: 'varchar(100) DEFAULT NULL',
  password: 'varchar(150) NOT NULL',
  phone: 'varch(10)',
  picture_profile: 'varchar(100) DEFAULT NULL',
  email: 'test@gmail.com',
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

describe('consoles routes', () => {
  it('PUTs /api/agriculteurs shoul return status 200 and an empty array', async () => {
    const response = await request(server).put('/api/agriculteurs/:id').send(agriculteur).expect(201);
    expect(response.body.id).toEqual(1);
  });
});

describe('consoles routes', () => {
  it('DELETEs /api/agriculteurs shoul return status 200 and an empty array', async () => {
    const response = await request(server).delete('/api/agriculteurs/:id').expect(500);
    expect(response.body.id).toEqual(0);
  });
});
