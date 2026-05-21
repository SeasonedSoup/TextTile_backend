const {prisma} = require('../lib/prisma');

async function sendMessage(req,res) {
    try {
        const result = await prisma.message.create({
            data: {
                text: req.body.text, 
                conversationId: req.conversationId || req.body.conversationId,
                userId: req.user.userId 
            }
        });

        const update = await prisma.conversation.update({
            where : {
                id: req.conversationId || req.body.conversationId,
                users: {
                    some: {id: req.user.userId}
                }
            },
            data: {
                updatedAt: new Date()
            }
        })

        console.log(result);
        console.log(update);
    } catch (err) {
        throw err;
    }
}

async function deleteMessage(req, res) {
    try {
        const result = await prisma.message.delete({
            where: {
                id: req.body.messageId,
                userId: req.user.userId
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
                userId: req.user.userId
            },
            data: {
                text: req.body.text, 
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