const express = require('express')
const route = express.Router()
const userController = require('../controller/user.controller')

route.post('/register', userController.register)
route.post('/login', userController.login)
route.get('/', userController.getAll);
route.get('/:id', userController.getById);
// route.put('/:id', userController.updateSchema);
// route.put('/:id', userController.update);
route.delete('/:id', userController.delete);

module.exports = route