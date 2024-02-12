import { productService } from '../services/index.js';
import ProductModel from "../DAO/models/ProductModel.js";
import UserModel from "../DAO/models/UserModel.js";

export default class ProductController {
    static async create(data, userId) {
        console.log('Creating a new product 🛍️');

        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error(`User ID not found: ${userId}`);
        }

        if (user.role === 'premium') {
            data.owner = user._id;
        } else {
            data.owner = 'default-admin-id';
        }

        const newProduct = await productService.create(data);
        console.log('Product created successfully 🛍️');
        return newProduct;
    }

    static async get(query = {}) {
        const products = await ProductModel.find(query);
        return products;
    }

    static async getById(productId) {
        const product = await ProductModel.findById(productId);
        if (!product) {
            throw new Error(`Product ID not found: ${productId} 😨`);
        }
        return product;
    }

    static async updateById(productId, data) {
        await ProductController.getById(productId);
        console.log('Updating the product 🛍️');
        await ProductModel.updateOne({ _id: productId }, { $set: data });
        console.log('Product updated successfully 🛍️');
    }

    static async deleteById(productId, userId) {
        const product = await ProductModel.findById(productId);
        if (!product) {
            throw new Error(`Product ID not found: ${productId}`);
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error(`User ID not found: ${userId}`);
        }

        if (user.role === 'admin' || product.owner.toString() === user._id.toString()) {
            console.log('Deleting the product 🛍️');
            await ProductModel.deleteOne({ _id: productId });
            console.log('Product deleted successfully 🛍️');
        } else {
            throw new Error('User is not authorized to delete this product');
        }
    }
}
