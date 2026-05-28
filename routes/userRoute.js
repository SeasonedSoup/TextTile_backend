const userController = require('../controllers/userController');
const tokenController = require('../controllers/tokenController');
const {Router} = require('express');
const passport = require("passport");

const userRouter = Router();

userRouter.get('/', tokenController.verifyToken, userController.getUser);
userRouter.post('/login', passport.authenticate('local', {session: false}), tokenController.signToken);
userRouter.post('/signin', userController.signin);

module.exports = userRouter;