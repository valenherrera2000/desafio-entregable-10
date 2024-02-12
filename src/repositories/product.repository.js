import { productService } from '../services/index.js';
import ProductModel from '../dao/models/ProductModel.js';
import UserModel from '../dao/models/UserModel.js';

export default class ProductController {
    static async getAllProducts(req, res) {
        try {
            const products = await ProductModel.find();
            res.status(200).json({ status: 'success', payload: products });
        } catch (error) {
            console.error('Error fetching all products:', error);
            res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }

    static async getProduct(req, res) {
        try {
            const productId = req.params.pid;
            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(404).json({ status: 'error', error: 'Product not found' });
            }
            res.status(200).json({ status: 'success', payload: product });
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }

    static async updateProduct(req, res) {
        try {
            const productId = req.params.pid;
            const updateData = req.body;
            await ProductController.getById(productId);
            console.log('Updating the product 🛍️');
            await ProductModel.updateOne({ _id: productId }, { $set: updateData });
            console.log('Product updated successfully 🛍️');
            res.status(200).json({ status: 'success', message: 'Product updated' });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const productId = req.params.pid;
            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(404).json({ status: 'error', error: 'Product not found' });
            }

            console.log('Deleting the product 🛍️');
            await ProductModel.deleteOne({ _id: productId });
            console.log('Product deleted successfully 🛍️');
            res.status(200).json({ status: 'success', message: 'Product deleted' });
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }

    static async getById(productId) {
        const product = await ProductModel.findById(productId);
        if (!product) {
            throw new Error(`Product ID not found: ${productId} 😨`);
        }
        return product;
    }
}
