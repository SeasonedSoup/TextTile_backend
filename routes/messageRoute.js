const messageController = require('../controllers/messageController');
const tokenController = require('../controllers/tokenController');
const {Router} = require('express');

const messageRouter = Router();

messageRouter.post('/message', tokenController.verifyToken, messageController.sendMessage);
messageRouter.delete('/deletemsg', tokenController.verifyToken, messageController.deleteMessage);
messageRouter.patch('/editmsg', tokenController.verifyToken, messageController.editMessage);

module.exports = messageRouter;