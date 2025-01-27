import supertest from 'supertest';
import { web } from '../src/application/web';
import { logger } from '../src/application/logging';
import { UserTes } from './test-util';
import bcrypt from 'bcrypt';

// create user
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

// login user
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
describe('PATCH /api/users/current', () => {
  beforeEach(async () => {
    await UserTes.create();
  });

  // delete user db after tes runing
  afterEach(async () => {
    await UserTes.delete();
  });

  it('should reject update user if request valid but token invalid', async () => {
    const response = await supertest(web)
      .patch('/api/users/current')
      .set('X-API-TOKEN', 'salah')
      .send({
        name: 'benar',
        password: 'benar',
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it('should reject update user if request is invalid', async () => {
    const response = await supertest(web)
      .patch('/api/users/current')
      .set('X-API-TOKEN', 'test')
      .send({
        name: '',
        password: '',
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should be able update user name', async () => {
    const response = await supertest(web)
      .patch('/api/users/current')
      .set('X-API-TOKEN', 'test')
      .send({
        name: 'abc',
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe('abc');
  });

  it('should be able update user password', async () => {
    const response = await supertest(web)
      .patch('/api/users/current')
      .set('X-API-TOKEN', 'test')
      .send({
        password: 'abc',
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);

    const user = await UserTes.get();
    expect(await bcrypt.compare('abc', user.password)).toBe(true);
  });
});

// logout user
describe('DELETE /api/users/current', () => {
  beforeEach(async () => {
    await UserTes.create();
  });

  // delete user db after tes runing
  afterEach(async () => {
    await UserTes.delete();
  });

  it('should be able to logout', async () => {
    const response = await supertest(web)
      .delete('/api/users/current')
      .set('X-API-TOKEN', 'test');

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe('OK');

    const user = await UserTes.get();
    expect(user.token).toBeNull();
  });

  it('should reject if token is wrong', async () => {
    const response = await supertest(web)
      .delete('/api/users/current')
      .set('X-API-TOKEN', 'salah');

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
