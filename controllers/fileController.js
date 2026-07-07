const {body, validationResult, matchedData} = require("express-validator");

const cloudinary = require('../lib/cloudinary');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const MAX_FILE_SIZE = 1024 * 1024 * 100; //100mb

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


const uploadProfile = [upload.single('profilePicture'), validateFile, async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        }
        //transform buffer to base64
        const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        
        const result = await cloudinary.uploader.upload(base64File, {
            folder: 'user_profiles',
        });

        req.data = result
        
        next()

    } catch (err) {
        return res.status(500).json({ error: 'Failed to process or upload image file.' });
    }
}];

module.exports = {uploadProfile}