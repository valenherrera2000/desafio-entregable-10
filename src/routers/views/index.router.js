import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Hello People 🖐️' });
});

router.get('/loggerTest', (req, res) => {
  req.logger.fatal('This is a fatal log');
  req.logger.error('This is an error log');
  req.logger.warning('This is a warning log');
  req.logger.info('This is an info log');
  req.logger.http('This is an http log');
  req.logger.verbose('This is a verbose log');
  req.logger.debug('This is a debug log');
  req.logger.silly('This is a silly log');
  res.status(200).send('ok');
});


export default router;