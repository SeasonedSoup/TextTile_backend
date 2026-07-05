const userController = require('../controllers/userController');
const tokenController = require('../controllers/tokenController');
const fileController = require('../controllers/fileController');
const {Router} = require('express');
const passport = require("passport");

const userRouter = Router();

userRouter.get('/auth-verify', tokenController.verifyToken, userController.getUser);
userRouter.get('/users', userController.getAllUsers);
userRouter.post('/login', passport.authenticate('local', {session: false}), tokenController.signToken);
userRouter.post('/signin', userController.signin);
userRouter.patch('/updateProfile', tokenController.verifyToken, fileController.uploadProfile, userController.updateProfile);
userRouter.patch('/changePassword', tokenController.verifyToken, userController.changePassword);
module.exports = userRouter;