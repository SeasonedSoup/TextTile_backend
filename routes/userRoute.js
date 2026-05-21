const userController = require('../controllers/userController');
const tokenController = require('../controllers/tokenController');
const {Router} = require('express');

const userRouter = Router();

userRouter.get('/', tokenController.verifyToken, userController.getUser);
userRouter.post('/signin', userController.signin);