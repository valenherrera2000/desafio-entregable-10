import CartDAO from "../DAO/cart.mongodb.DAO.js";
import MessageDAO from "../DAO/message.mongodb.DAO.js";
import ProductDAO from "../DAO/product.mongodb.DAO.js";
import UserDAO from "../DAO/user.mongodb.DAO.js";


import CartRepository from "../repositories/cart.repository.js";
import MessageRepository from "../repositories/message.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import UserRepository from "../repositories/user.repository.js";

export const cartService = new CartRepository(new CartDAO());
export const messageService = new MessageRepository(new MessageDAO());
export const productService = new ProductRepository(new ProductDAO());
export const userService = new UserRepository(new UserDAO());