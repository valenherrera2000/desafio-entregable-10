import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';

import ProductModel from '../src/DAO/models/ProductModel.js';
import app from '../src/app.js';

const expect = chai.expect;
const requester = supertest(app);

describe('Product Testing', () => {
    before(async () => {
        await ProductModel.deleteMany({});
    });

    after(async () => {
        await mongoose.connection.close();
    });

    describe('Create Product', () => {
        it('should create a product successfully', async () => {
            const productMock = {
                title: 'Sample Product',
                description: 'Product description',
                price: 19.99,
                thumbnail: 'product-thumbnail-url',
                code: 'ABC123',
                stock: 10,
            };

            const { statusCode, ok, body } = await requester
                .post('/api/products')
                .send(productMock);

            expect(statusCode).to.equal(200);
            expect(ok).to.be.true;
            expect(body).to.have.property('status', 'success');
            expect(body).to.have.property('message', 'Product created successfully');
            expect(body.payload).to.have.property('_id');
            expect(body.payload).to.have.property('title', productMock.title);
            expect(body.payload).to.have.property('description', productMock.description);
            expect(body.payload).to.have.property('price', productMock.price);
            expect(body.payload).to.have.property('thumbnail', productMock.thumbnail);
            expect(body.payload).to.have.property('code', productMock.code);
            expect(body.payload).to.have.property('stock', productMock.stock);
        });

        it('should respond with an error 400 if title is missing', async () => {
            const productMock = {
                description: 'Product description',
                price: 19.99,
                thumbnail: 'product-thumbnail-url',
                code: 'ABC123',
                stock: 10,
            };

            const { statusCode, ok, body } = await requester
                .post('/api/products')
                .send(productMock);

            expect(statusCode).to.equal(400);
            expect(ok).to.be.false;
            expect(body).to.have.property('status', 'error');
            expect(body).to.have.property('error', 'Incomplete values');
        });
    });
});
