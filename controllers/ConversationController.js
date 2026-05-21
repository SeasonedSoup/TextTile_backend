const {prisma} = require('../lib/prisma');


//needs the user id's of you and the person you messaged 
async function createConversation(req, res) {
    const result = await prisma.conversation.create({
        data : {
            users: {
                connect: [
                    {id: req.body.senderId}, {id: req.body.receiverId}
                ]
            }
        }
    })
}

async function getConversations(req, res) {
    const conversations = await prisma.conversation.findMany({
        where : {
            users : {
                some: {
                    id: req.body.userId
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        include : {
            users: true,
            messages: {
                orderBy: {
                    createdAt: 'asc'
                }
            }
        }
    })

    res.json(conversations);
}

module.exports = {
    createConversation,
    getConversations
}