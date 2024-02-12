import { Router } from 'express';
import UserDTO from '../../dto/user.dto.js';
import UserDAO from '../../dao/user.mongodb.dao.js';

const router = Router();

router.get('/users', async (req, res, next) => {
  try {
    const users = await UserDAO.getAll({});
    const usersDTO = users.map(user => new UserDTO(user));
    req.logger.debug('Retrieved users successfully');
    res.status(200).json(usersDTO);
  } catch (error) {
    req.logger.error(error.message);
    next(error);
  }
});

router.post('/users/', async (req, res, next) => {
  try {
    const { body } = req;
    const user = await UserDAO.create(body);
    res.status(201).json(user);
  } catch (error) {
    req.logger.error(error.message);
    next(error);
  }
});

router.put('/users/:uid', async (req, res, next) => {
  try {
    const { body, params: { uid } } = req;
    await UserDAO.updateById(uid, body);
    res.status(204).end();
  } catch (error) {
    req.logger.error(error.message);
    next(error);
  }
});

router.delete('/users/:uid', async (req, res, next) => {
  try {
    const { params: { uid } } = req;
    await UserDAO.deleteById(uid);
    res.status(204).end();
  } catch (error) {
    req.logger.error(error.message);
    next(error);
  }
});

router.put('/premium/:uid', async (req, res, next) => {
  try {
    const { params: { uid } } = req;
    await UserController.toggleUserRole(uid); // Assume this method is implemented in UserController
    res.status(204).end();
  } catch (error) {
    req.logger.error(error.message);
    next(error);
  }
});



export default router;
