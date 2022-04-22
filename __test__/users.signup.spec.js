const request = require('superset');
const app = require('./simple-server');

describe('Users functions', () => {
  test('Get the list of favs list', (done) => {
    request(app)
      .get('/api/favs')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
