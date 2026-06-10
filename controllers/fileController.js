const {prisma} = require('../lib/prisma');
const cloudinary = require('../lib/cloudinary');
const {body, validationResult, matchedData} = require("express-validator");

const validateFile = [
    body("file")
    .custom((_, {req}) => {
        if (!req.file) {
            throw new Error("File cannnot be empty when uploading");
        }
        if (req.file.size > MAX_FILE_SIZE) {
            throw new Error("File exceeds 100mb");
        }
        return true;
    })
]


async function updateProfile(req, res) {
    try {
        //const result
    } catch (err) {
        console.error(err);
    }
}