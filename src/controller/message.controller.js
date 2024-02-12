import { messageService } from '../services/index.js';
import MessageDAO from '../DAO/message.mongodb.DAO.js';

export default class MessagesController {
  static async create(data) {
    console.log('Creating a new message 📩');
    const newMessage = await messageService.create(data);
    console.log('Message created successfully 📩');
    return newMessage;
  }

  static async getAllMessages(query = {}) {
    const messages = await MessageDAO.getAll(query);
    return messages;
  }

  static async getMessage(messageId) {
    const message = await MessageDAO.getById(messageId);
    if (!message) {
      throw new Error(`Message ID not found: ${messageId} 😨`);
    }
    return message;
  }

  static async updateMessage(messageId, data) {
    await MessagesController.getMessage(messageId);
    console.log('Updating the message 📩');
    await messageService.updateById(messageId, data);
    console.log('Message updated successfully 📩');
  }

  static async deleteMessage(messageId) {
    await MessagesController.getMessage(messageId);
    console.log('Deleting the message 📩');
    await messageService.deleteById(messageId);
    console.log('Message deleted successfully 📩');
  }
}
