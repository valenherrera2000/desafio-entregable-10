import ProductModel from './models/ProductModel.js';

export default class ProductDAO {
    static getAll = async (query = {}) => {
        return ProductModel.find(query);
    };

    static getById = async (productId) => {
        return ProductModel.findById(productId);
    };

    static create = async (data) => {
        return ProductModel.create(data);
    };

    static updateById = async (productId, data) => {
        return ProductModel.updateOne({ _id: productId }, { $set: data });
    };

    static deleteById = async (productId) => {
        return ProductModel.deleteOne({ _id: productId });
    };
}
