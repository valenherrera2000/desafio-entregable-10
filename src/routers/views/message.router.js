import { Router } from 'express';
import MessagesController from '../../controllers/message.controller.js';

const router = Router();

router.get('/messages', MessagesController.getAllMessages);

router.get('/messages/:mid', MessagesController.getMessage);
router.put('/messages/:mid', MessagesController.updateMessage);
router.delete('/messages/:mid', MessagesController.deleteMessage);

export default router;
