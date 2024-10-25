// Create contact

import supertest from 'supertest';
import { ContactTes, UserTes } from './test-util';
import { web } from '../src/application/web';
import { logger } from '../src/application/logging';
import { Contact } from '@prisma/client';

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

  it('should reject create new contact is data invalid', async () => {
    const response = await supertest(web)
      .post('/api/contacts')
      .set('X-API-TOKEN', 'test')
      .send({
        first_name: '',
        last_name: 'muslim',
        email: 'aziz@mai',
        phone: '0547770222222222222222222222222',
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe('GET /api/contact/:contactId', () => {
  beforeEach(async () => {
    await UserTes.create();
    await ContactTes.create();
  });

  afterEach(async () => {
    await ContactTes.deleteAll(), await UserTes.delete();
  });

  it('should reject get contact if contact is not found', async () => {
    const contact = await ContactTes.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}`)
      .set('X-API-TOKEN', 'test');

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});
