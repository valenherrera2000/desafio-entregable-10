import CartModel from './models/CartModel.js';

export default class CartDAO {
    static async getById(cartId) {
        return CartModel.findById(cartId);
    }

    static async updateById(cartId, data) {
        return CartModel.updateOne({ _id: cartId }, { $set: data });
    }

    static getAll = async () => {
        return CartModel.find();
    };

    static getById = async (sid) => {
        return CartModel.findById(sid);
    };

    static create = async (data) => {
        return CartModel.create(data);
    };

    static updateById = async (sid, data) => {
        return CartModel.updateOne({ _id: sid }, { $set: data });
    };

    static deleteById = async (sid) => {
        return CartModel.deleteOne({ _id: sid });
    };
}
