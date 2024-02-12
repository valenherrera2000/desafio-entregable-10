import UserModel from './models/UserModel.js';

export default class UserDAO {
    static getAll = async (query = {}) => {
        return UserModel.find(query);
    };

    static getById = async (userId) => {
        return UserModel.findById(userId);
    };

    static create = async (data) => {
        return UserModel.create(data);
    };

    static updateById = async (userId, data) => {
        return UserModel.updateOne({ _id: userId }, { $set: data });
    };

    static deleteById = async (userId) => {
        return UserModel.deleteOne({ _id: userId });
    };
}
