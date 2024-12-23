// Create contact

import supertest from 'supertest';
import { logger } from '../src/application/logging';
import { web } from '../src/application/web';
import { ContactTes, UserTes } from './test-util';

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

describe('PUT /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await UserTes.create();
    await ContactTes.create();
  });

  afterEach(async () => {
    await ContactTes.deleteAll(), await UserTes.delete();
  });

  it('should be able to update contact', async () => {
    const contact = await ContactTes.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set('X-API-TOKEN', 'test')
      .send({
        first_name: 'aziz',
        last_name: 'ganteng',
        email: 'aziz@mail.com',
        phone: '0855878',
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(contact.id);
    expect(response.body.data.first_name).toBe('aziz');
    expect(response.body.data.last_name).toBe('ganteng');
    expect(response.body.data.email).toBe('aziz@mail.com');
    expect(response.body.data.phone).toBe('0855878');
  });

  it('should be reject update contact if request is invalid', async () => {
    const contact = await ContactTes.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set('X-API-TOKEN', 'test')
      .send({
        first_name: '',
        last_name: '',
        email: 'aziz.com',
        phone: '',
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
