import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';

import CartModel from '../src/DAO/models/CartModel.js';
import UserModel from '../src/DAO/models/UserModel.js';
import app from '../src/app.js';

const expect = chai.expect;
const requester = supertest(app);

describe('Cart Testing', () => {
    before(async () => {
        await CartModel.deleteMany({});
        await UserModel.deleteMany({});
    });

    after(async () => {
        await mongoose.connection.close();
    });

    describe('Create Cart', () => {
        it('should create a cart successfully', async () => {
            // Assuming you have a user created in a previous test
            const user = await UserModel.create({
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
                password: 'securepassword',
                role: 'user',
            });

            const cartMock = {
                products: [
                    {
                        product: 'ProductID123',
                        quantity: 2,
                    },
                ],
            };

            const { statusCode, ok, body } = await requester
                .post(`/api/carts/${user._id}`)
                .send(cartMock);

            expect(statusCode).to.equal(200);
            expect(ok).to.be.true;
            expect(body).to.have.property('payload');
            expect(body.payload).to.have.property('_id');
            expect(body.payload).to.have.property('products');
        });

        it('should respond with an error 400 if products are missing', async () => {
            const user = await UserModel.create({
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
                password: 'securepassword',
                role: 'user',
            });

            const cartMock = {}; // Missing products field

            const { statusCode, ok, body } = await requester
                .post(`/api/carts/${user._id}`)
                .send(cartMock);

            expect(statusCode).to.equal(400);
            expect(ok).to.be.false;
            expect(body).to.have.property('status', 'error');
            expect(body).to.have.property('error', 'Incomplete values');
        });
    });
});
