const {prisma} = require('../lib/prisma');

async function sendMessage(req,res) {
    try {
        const result = await prisma.message.create({
            data: {
                text: req.body.text, 
                conversationId: req.body.conversationId,
                userId: req.body.userId 
            }
        });

        console.log(result);
    } catch (err) {
        throw err;
    }
}

async function deleteMessage(req, res) {
    try {
        const result = await prisma.message.delete({
            where: {
                id: req.body.messageId,
                userId: req.userId
            }
        });

        console.log(result);
    } catch (err) {
        throw err;
    }
}

async function editMessage(req, res) {
    try {
        const result = await prisma.message.update({
            where : {
                id: req.body.messageId,
                userId: req.userId
            },
            data: {
                text: req.body.text, 
                conversationId: req.body.conversationId,
                userId: req.body.userId 
            }
        });

        console.log(result);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    sendMessage,
    deleteMessage,
    editMessage
}