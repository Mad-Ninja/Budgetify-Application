import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app.js';
import { v4 as uuidv4 } from 'uuid';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkzMDU1YWNiLTUzMzEtNDRjMy1iODQxLTEyMWYxZTA4YjVhMSIsImVtYWlsIjoibmlrb2xheUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDgxODg5NjMsImV4cCI6MTY0ODM2MTc2M30.i8MObGkHHU5516X9DA9AgeOmexY_UyXcickHzZ2USBs';
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
        .get('/users/0fcc94bc-3626-40f5-b84f-d39143c134d4')
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
          "_id": uuidv4(),
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
        .put('/users/ab50ea21-150d-4ce6-b473-d3da88a48700')
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
        .delete('/users/e1725a9b-1f84-49aa-b1c8-04e2f5f3733d')
        .auth(token, { type: "bearer" });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User deleted");
    });
  });
});