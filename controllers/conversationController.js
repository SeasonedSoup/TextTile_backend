const {prisma} = require('../lib/prisma');


//needs the user id's of you and the person you messaged 
async function createConversation(req, res, next) {
    const result = await prisma.conversation.create({
        data : {
            users: {
                connect: [
                    {id: req.user.userId}, {id: req.body.receiverId}
                ]
            }
        }
    })
    req.conversationId = result.id
    next()
}

async function getConversations(req, res) {
    const conversations = await prisma.conversation.findMany({
        where : {
            users : {
                some: {
                    id: req.user.userId
                }
            }
        },
        orderBy: {
            updatedAt: 'desc'
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
//checks if there is already an existing conversation with this user
async function getConversationByUser(req, res) {
    const conversation = await prisma.conversation.findUnique({
        where: {
            users: {
                every: {
                    id: { in: [req.body.targetUserId, req.user.userId] }
                },
                some: { id: req.user.userId }
            }
        }
    })

    const exists = conversation !== null; 

    res.json(exists);
}

module.exports = {
    createConversation,
    getConversations,
    getConversationByUser
}