const request = require('supertest');
const { getUser, getFav } = require('./faker');

const server = require('../server');
const config = require('../server/config');
const database = require('../server/database');

beforeAll(() => {
  //connect to de test database
  const url = `${config.database.url}-test`;
  database.connect({
    url,
  });
});

afterAll(() => {
  //disconnet database
  database.disconnect();
});

const app = request(server);
const user = getUser();
const fav = getFav();
let token;
let favId;
let userId;

describe('Users resources', () => {
  test('Users can signup', async () => {
    const res = await app.post('/api/users/signup').send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.email).toBe(user.email);
  });

  test('Users can login', async () => {
    const logInfo = { email: user.email, password: user.password };

    const res = await app.post('/auth/local/login').send(logInfo);

    token = res.body.meta.token;
    userId = res.body.data.id;

    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe(user.name);
  });
});

// --------------------------------------------------

describe('Data manipulation', () => {
  test('Users can get the list of favs lists', async () => {
    const res = await app
      .get('/api/favs')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  test('Users can create a favs list', async () => {
    fav.userId = userId;
    const res = await app
      .post('/api/favs')
      .set('Authorization', `Bearer ${token}`)
      .send(fav);

    favId = res.body.data._id;
    expect(res.statusCode).toBe(200);
  });

  test('Users can update a single favs list', async () => {
    fav.userId = userId;
    const res = await app
      .put(`/api/favs/${favId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(getFav());

    expect(res.statusCode).toBe(200);
  });

  test('Users can read a single favs list', async () => {
    const res = await app
      .get(`/api/favs/${favId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  test('Users can delete a single favs list', async () => {
    const res = await app
      .delete(`/api/favs/${favId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
