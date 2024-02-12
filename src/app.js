import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import cookieParser from 'cookie-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


import logger from './config/logger.js';
import ErrorHandler from './middlewares/ErrorHandler.js';
import { __dirname } from './utils/utils.js';

// Import routers
import indexRouter from './routers/views/index.router.js';
import productViewRouter from './routers/views/product.router.js';
import cartViewRouter from './routers/views/cart.router.js'; 
import messageViewRouter from './routers/views/message.router.js'; 
import userViewRouter from './routers/views/user.router.js'; 
import UserDAO from './DAO/user.mongodb.DAO.js';

const app = express();

// Middleware
app.use(ErrorHandler);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


// Routers
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productApiRouter);
app.use('/api/cart', cartApiRouter);
app.use('/api/message', messageApiRouter);
app.use('/products', productViewRouter);
app.use('/cart', cartViewRouter);
app.use('/messages', messageViewRouter);


//Swagger
const specs = swaggerJsDoc(swaggerOptions);

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Adoptme API',
      description: 'Esta es la documentación de la API de Adoptme. Una aplicación para adoptar mascotas 😍.',
    },
  },
  apis: [path.join(__dirname, '..', 'docs', '**', '*.yaml')],
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


//Main route
app.get('/', (req, res) => {
  res.send('Hello from backend 🖐️');
});

// Error handling middleware
app.use((error, req, res, next) => {
  logger.error(`An error has occurred 😨: ${error.message}`);
  res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
});

// 404 Not Found middleware
app.use((req, res) => {
  logger.warn('Route not found');
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

export default app;
