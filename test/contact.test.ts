// Create contact

import supertest from 'supertest';
import { ContactTes, UserTes } from './test-util';
import { web } from '../src/application/web';
import { logger } from '../src/application/logging';

describe('POST /api/contact', () => {
  beforeEach(async () => {
    await UserTes.create();
  });

  // delete user db after tes runing
  afterEach(async () => {
    await ContactTes.deleteAll();
    await UserTes.delete();
  });

  it('should create new contact', async () => {
    const response = await supertest(web)
      .post('/api/contacts')
      .set('X-API-TOKEN', 'test')
      .send({
        first_name: 'aziz',
        last_name: 'muslim',
        email: 'aziz@mail.com',
        phone: '054777',
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe('aziz');
    expect(response.body.data.last_name).toBe('muslim');
    expect(response.body.data.email).toBe('aziz@mail.com');
    expect(response.body.data.phone).toBe('054777');
  });
});
