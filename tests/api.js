import request from 'supertest';
import app from '../src/api/index';

describe('GET /', () => {
  test('responds with OK', () => {
    request(app)
      .get('/')
      .expect(200)
      .end((err) => {
        if (err) throw err;
      });
  });
});
