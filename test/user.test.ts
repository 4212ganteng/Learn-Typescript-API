import supertest from 'supertest';
import { web } from '../src/application/web';
import { logger } from '../src/application/logging';
import { UserTes } from './test-util';

describe('POST /api/users', () => {
  // delete data user after runing tes
  afterEach(async () => {
    await UserTes.delete();
  });

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
      username: 'test',
      password: 'test',
      name: 'test',
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe('test');
    expect(response.body.data.name).toBe('test');
  });
});

describe('POST /api/users/login', () => {
  beforeEach(async () => {
    await UserTes.create();
  });

  // delete user db after tes runing
  afterEach(async () => {
    await UserTes.delete();
  });

  it('should be able to login', async () => {
    const response = await supertest(web).post('/api/users/login').send({
      username: 'test',
      password: 'test',
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe('test');
    expect(response.body.data.name).toBe('test');
    expect(response.body.data.token).toBeDefined();
  });

  //   test username is wrong
  it('should reject login user if username is wrong', async () => {
    const response = await supertest(web).post('/api/users/login').send({
      username: 'salah',
      password: 'test',
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  //   test password is wrong
  it('should reject login user if username is wrong', async () => {
    const response = await supertest(web).post('/api/users/login').send({
      username: 'test',
      password: 'salah',
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

// get user current

describe('GET /api/users/current', () => {
  beforeEach(async () => {
    await UserTes.create();
  });

  // delete user db after tes runing
  afterEach(async () => {
    await UserTes.delete();
  });

  it('should be able to get user', async () => {
    const response = await supertest(web)
      .get('/api/users/current')
      .set('X-API-TOKEN', 'test');

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe('test');
    expect(response.body.data.name).toBe('test');
  });

  it('should reject  cause wrong token', async () => {
    const response = await supertest(web)
      .get('/api/users/current')
      .set('X-API-TOKEN', 'salah');

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

// update user
describe('PATCH /apiusers/current', () => {
  beforeEach(async () => {
    await UserTes.create();
  });

  // delete user db after tes runing
  afterEach(async () => {
    await UserTes.delete();
  });

  it('should reject update user if request valid but token invalid', async () => {
    const response = await supertest(web)
      .patch('/apiusers/current')
      .set('X-API-TOKEN', 'salah')
      .send({
        name: 'benar',
        password: 'benar',
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
