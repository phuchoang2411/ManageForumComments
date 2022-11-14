import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful createOnPostServices', async () => {
  await request(app)
    .post('/posts/create')
    .send({
      title: 'test@test.com',
    })
    .expect(201);
});
