import request from 'supertest';
import { app } from '../../../app.js';

describe('create user func', () => {
  it('returns a 201 on successful creation of user', async () => {
    const userToSave = {
      firstName: 'a',
      lastName: 'a',
      email: 'niv@test.com',
      password: 'pass',
    };

    const response = await request(app).post('/users').send(userToSave).expect(201);
    expect(response.body.first_name).toEqual(userToSave.firstName);
    expect(response.body.last_name).toEqual(userToSave.lastName);
    expect(response.body.email).toEqual(userToSave.email);
  });

  it('user is being saved to db on successful creation', async () => {
    const userToSave = {
      firstName: 'a',
      lastName: 'a',
      email: 'niv@test.com',
      password: 'pass',
    };

    const createUserResponse = await request(app).post('/users').send(userToSave).expect(201);
    const { id: createdUserId } = createUserResponse.body;

    const getUserResponse = await request(app).get(`/users/${createdUserId}`).expect(200);
    expect(getUserResponse.body.first_name).toEqual(userToSave.firstName);
    expect(getUserResponse.body.last_name).toEqual(userToSave.lastName);
    expect(getUserResponse.body.email).toEqual(userToSave.email);
    expect(getUserResponse.body.id).toEqual(createdUserId);
  });

  it('returns 400 when required field is missing', async () => {
    const firstName = 'a';
    const lastName = 'b';
    const email = 'niv@test.com';
    const password = 'pass';

    await request(app).post('/users').send({}).expect(400);
    await request(app).post('/users').send({firstName, lastName, email }).expect(400);
    await request(app).post('/users').send({firstName, lastName, password}).expect(400);
    await request(app).post('/users').send({firstName, email, password}).expect(400);
    await request(app).post('/users').send({lastName, email, password}).expect(400);
  });

  it('returns 400 when trying to save user with email in use', async () => {
    let firstUserToSave = {
      firstName: 'a',
      lastName: 'a',
      email: 'niv@test.com',
      password: 'pass',
    };

    let createUserResponse;
    createUserResponse = await request(app).post('/users').send(firstUserToSave).expect(201);

    let secondUserToSave = {
      firstName: 'b',
      lastName: 'b',
      email: firstUserToSave.email,
      password: 'newpass'
    };

    createUserResponse = await request(app).post('/users').send(secondUserToSave).expect(400);
  });
});
