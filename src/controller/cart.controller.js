import { cartService } from '../services/index.js';
import CartDAO from '../DAO/cart.mongodb.DAO.js';
import ProductDAO from '../DAO/product.mongodb.DAO.js';

export default class CartController {
    static async getAllCarts(req, res) {
        try {
            const query = req.query;
            const carts = await CartDAO.getAll(query);
            res.status(200).json({ status: 'success', payload: carts });
        } catch (error) {
            console.error('Error fetching all carts:', error);
            res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }

    static async getCart(req, res) {
        try {
            const cartId = req.params.sid;
            const cart = await CartDAO.getById(cartId);
            if (!cart) {
                return res.status(404).json({ status: 'error', error: 'Cart not found' });
            }
            res.status(200).json({ status: 'success', payload: cart });
        } catch (error) {
            console.error('Error fetching cart by ID:', error);
            res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }

    static async updateCart(req, res) {
        try {
            const cartId = req.params.sid;
            const updateData = req.body;
            await CartController.getById(cartId);
            console.log('Updating the cart 🛒');
            await cartService.updateById(cartId, updateData);
            console.log('Cart updated successfully 🛒');
            res.status(200).json({ status: 'success', message: 'Cart updated' });
        } catch (error) {
            console.error('Error updating cart:', error);
            res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }

    static async deleteCart(req, res) {
        try {
            const cartId = req.params.sid;
            await CartController.getById(cartId);
            console.log('Deleting the cart 🛒');
            await cartService.deleteById(cartId);
            console.log('Cart deleted successfully 🛒');
            res.status(200).json({ status: 'success', message: 'Cart deleted' });
        } catch (error) {
            console.error('Error deleting cart:', error);
            res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }

    static async purchaseCart(req, res) {
        try {
            const cartId = req.params.sid;
            const productsNotPurchased = await CartController.purchaseCart(cartId);

            if (productsNotPurchased.length > 0) {
                return res.status(400).json({
                    status: 'error',
                    error: 'Some products could not be purchased',
                    productsNotPurchased,
                });
            }

            res.status(200).json({ status: 'success', message: 'Purchase completed successfully' });
        } catch (error) {
            console.error('Error purchasing cart:', error);
            res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }
}
