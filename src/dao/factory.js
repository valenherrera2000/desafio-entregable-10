const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const config = require('../config/config.js');

let UserDao = null;

async function initializeUserDao() {
    switch (config.PERSITENCE) {
        case 'file':
        case 'memory':
            throw new Error('Not implemented 😱');
        case 'mongo':
            const userDAO = (await import('./user.mongodb.DAO.js')).default;
            UserDao = userDAO.UserDAO;
            break;
        default:
            throw new Error('Invalid persistence option in configuration 😱');
    }
}

initializeUserDao().catch(error => {
    console.error('Error initializing UserDao:', error);
    process.exit(1);
});

module.exports = UserDao;
