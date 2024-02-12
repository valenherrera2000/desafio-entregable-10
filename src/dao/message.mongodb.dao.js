import MessageModel from "./models/MessageModel.js";

export default class MessageDAO {
    static getAll = async () => {
        try {
            return await MessageModel.find();
        } catch (error) {
            throw new Error(`Error while retrieving all messages: ${error.message}`);
        }
    }

    static getById = async (messageId) => {
        try {
            return await MessageModel.findById(messageId);
        } catch (error) {
            throw new Error(`Error while retrieving message by ID: ${error.message}`);
        }
    }

    static create = async (data) => {
        try {
            return await MessageModel.create(data);
        } catch (error) {
            throw new Error(`Error while creating message: ${error.message}`);
        }
    }

    static updateById = async (messageId, data) => {
        try {
            return await MessageModel.updateOne({ _id: messageId }, { $set: data });
        } catch (error) {
            throw new Error(`Error while updating message by ID: ${error.message}`);
        }
    }

    static deleteById = async (messageId) => {
        try {
            return await MessageModel.deleteOne({ _id: messageId });
        } catch (error) {
            throw new Error(`Error while deleting message by ID: ${error.message}`);
        }
    }
}
