const {prisma} = require('../lib/prisma');
const bcryptjs = require("bcryptjs");

async function signin(req, res) {
    try {
        const result = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await bcryptjs.hash(req.body.password, 11)
            }
        })

        if (!result) {
            throw new Error("User not created");
        }
        console.log(result);
        res.json({message: "Signed up successfully!"}); 
    } catch (err) {
        return console.error(err);
    }
}

async function getUser(req, res) {
    try {
        const result = await prisma.user.findUnique({
            where : {
                id: req.user.userId
            }
        })

        res.json(result);
    } catch (err) {
        return console.error(err);
    }
}

async function  getAllUsers(req, res) {
    try {
        const result = await prisma.user.findMany();

        res.json(result);
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    signin,
    getUser,
    getAllUsers
}