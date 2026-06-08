const conversationController = require('../controllers/conversationController');
const messageController = require('../controllers/messageController');
const tokenController = require('../controllers/tokenController');

const {Router} = require('express');

const conversationRouter = Router();

conversationRouter.get('/conversation', tokenController.verifyToken, conversationController.getConversations);
conversationRouter.post('/conversation', tokenController.verifyToken,  conversationController.createConversation, messageController.sendMessage);
conversationRouter.get('/getUserConversation', tokenController.verifyToken, conversationController.getConversationByUser);

module.exports = conversationRouter;