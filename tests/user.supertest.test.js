import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';

import UserModel from '../src/DAO/models/UserModel.js';
import app from '../src/app.js';

const expect = chai.expect;
const requester = supertest(app);

describe('User Testing', () => {
    before(async () => {
        await UserModel.deleteMany({});
    });

    after(async () => {
        await mongoose.connection.close();
    });

    describe('Create User', () => {
        it('should create a user successfully', async () => {
            const userMock = {
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
                password: 'securepassword',
                role: 'user',
            };

            const { statusCode, ok, body } = await requester
                .post('/api/users')
                .send(userMock);

            expect(statusCode).to.equal(200);
            expect(ok).to.be.true;
            expect(body).to.have.property('status', 'success');
            expect(body).to.have.property('message', 'User created successfully');
            expect(body.payload).to.have.property('_id');
            expect(body.payload).to.have.property('first_name', userMock.first_name);
            expect(body.payload).to.have.property('last_name', userMock.last_name);
            expect(body.payload).to.have.property('email', userMock.email);
            expect(body.payload).to.have.property('role', userMock.role);
        });

        it('should respond with an error 400 if email is missing', async () => {
            const userMock = {
                first_name: 'John',
                last_name: 'Doe',
                password: 'securepassword',
                role: 'user',
            };

            const { statusCode, ok, body } = await requester
                .post('/api/users')
                .send(userMock);

            expect(statusCode).to.equal(400);
            expect(ok).to.be.false;
            expect(body).to.have.property('status', 'error');
            expect(body).to.have.property('error', 'Incomplete values');
        });
    });
});
