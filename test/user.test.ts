import supertest from 'supertest';
import { web } from '../src/application/web';
import { logger } from '../src/application/logging';

describe('POST /api/users', () => {
  it('should reject register new user if request is invalid', async () => {
    const response = await supertest(web).post('/api/users').send({
      username: '',
      password: '',
      name: '',
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should register new user', async () => {
    const response = await supertest(web).post('/api/users').send({
      username: 'Aziz',
      password: 'rahasia',
      name: 'Aziz Muslim',
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe('Aziz');
    expect(response.body.data.name).toBe('Aziz Muslim');
  });
});
