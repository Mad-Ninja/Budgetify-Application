import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app.js';
import { ObjectId } from 'mongodb';
import { mongoObjectId } from '../controllers/users.js';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzY4ZTFlMjVkY2Q4MzU2NzJmZmNhZiIsImVtYWlsIjoibmlrb2xheUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDc4MjYzMDMsImV4cCI6MTY0NzgyOTkwM30.bpMLXKHkPYedsEJAXvLFbdYvTyJZRb81hm1hqMr7q-Q';
describe('testing users', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect('mongodb://127.0.0.1:27017/database001');
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('GET /users/:id', () => {
    it('should get user', async () => {
      const response = await supertest(app)
        .get('/users/623691a725dcd835672ffcb2')
        .auth(token, { type: "bearer" })

      expect(response.status).toBe(200);
    });
  });

  describe('POST /users/', () => {
    it('should create user', async () => {
      const response = await supertest(app)
        .post('/users/')
        .auth(token, { type: "bearer" })
        .send({
          "_id": new ObjectId(mongoObjectId()),
          "email":"denis@gmail.com",
          "password":"12345",
          "role":"user",
          "firstName":"Denis",
          "lastName":"Ivaniv",
          "gender":"male",
          "birth":"13.11.1999",
          "country":"Germany",
          "accounts": [{
              "transactions": {}
          }] 
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User created");
    });
  });

  describe('PUT /users/', () => {
    it('should update user', async () => {
      const response = await supertest(app)
        .put('/users/623691a725dcd835672ffcb2')
        .auth(token, { type: "bearer" })
        .send({
          "email":"hohoho@gmail.com",
          "password":"11009988",
          "role":"admin",
          "firstName":"Adolf",
          "lastName":"Putin",
          "gender":"male",
          "birth":"13.11.1900",
          "country":"China",
          "accounts":[]
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User edited");
    });
  });

  describe('DELETE /users/', () => {
    it('should delete user', async () => {
      const response = await supertest(app)
        .delete('/users/6237dccabafde554bd63a18e')
        .auth(token, { type: "bearer" });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User deleted");
    });
  });
});