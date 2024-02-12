import MessageDTO from '../dto/message.dto.js';

export default class MessagesController {
    constructor(messageService) {
        this.messageService = messageService;
    }

    async getAllMessages(req, res) {
        try {
            const filter = req.query;
            const messages = await this.messageService.getAll(filter);
            res.status(200).json({ status: 'success', payload: messages });
        } catch (error) {
            console.error('Error fetching all messages:', error);
            res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }

    async getMessage(req, res) {
        try {
            const messageId = req.params.mid;
            const message = await this.messageService.getById(messageId);
            if (!message) {
                return res.status(404).json({ status: 'error', error: 'Message not found' });
            }
            res.status(200).json({ status: 'success', payload: message });
        } catch (error) {
            console.error('Error fetching message by ID:', error);
            res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }

    async updateMessage(req, res) {
        try {
            const messageId = req.params.mid;
            const updateData = req.body;
            await this.messageService.getById(messageId);
            console.log('Updating the message 📩');
            await this.messageService.updateById(messageId, updateData);
            console.log('Message updated successfully 📩');
            res.status(200).json({ status: 'success', message: 'Message updated' });
        } catch (error) {
            console.error('Error updating message:', error);
            res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }

    async deleteMessage(req, res) {
        try {
            const messageId = req.params.mid;
            const message = await this.messageService.getById(messageId);
            if (!message) {
                return res.status(404).json({ status: 'error', error: 'Message not found' });
            }

            console.log('Deleting the message 📩');
            await this.messageService.deleteById(messageId);
            console.log('Message deleted successfully 📩');
            res.status(200).json({ status: 'success', message: 'Message deleted' });
        } catch (error) {
            console.error('Error deleting message:', error);
            res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }
}
