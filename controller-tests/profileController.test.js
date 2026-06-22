// uploadProfile.test.js
const express = require('express');
const request = require('supertest');
const cloudinary = require('cloudinary').v2;
const { uploadProfile } = require('../controllers/profileController'); // Path to where your uploadProfile array lives

// 1. Mock Cloudinary entirely so we don't upload real files
jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload: jest.fn()
    }
  }
}));

describe('Middleware Test: uploadProfile', () => {
  let testApp;

  beforeEach(() => {
    jest.clearAllMocks();

    // 2. Create a clean, temporary Express app JUST for this test block
    testApp = express();
    testApp.use(express.json());

    // 3. Mount the middleware onto a dummy route that just returns what the middleware created
    testApp.put('/test-upload', uploadProfile, (req, res) => {
      // If the middleware succeeded, it passes data to req.data
      res.status(200).json({ 
        message: "Middleware reached next() successfully!", 
        passedData: req.data 
      });
    });
  });

  it('should process the uploaded file, convert it to Base64, and attach Cloudinary result to req.data', async () => {
    // 4. Mock what Cloudinary should return when the middleware calls it
    const mockCloudinaryResponse = {
      secure_url: 'https://cloudinary.com',
      public_id: 'user_profiles/profile'
    };
    cloudinary.uploader.upload.mockResolvedValue(mockCloudinaryResponse);

    // 5. Fire Supertest at our dummy endpoint
    const response = await request(testApp)
      .put('/test-upload')
      // 'image' must match the key name inside upload.single('image')
      .attach('image', Buffer.from('fake-image-bytes'), 'avatar.jpg');

    // 6. Assertions
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Middleware reached next() successfully!");
    
    // Verify that the data passed down the chain matches Cloudinary's response
    expect(response.body.passedData.secure_url).toBe(mockCloudinaryResponse.secure_url);
    
    // Verify that Cloudinary's upload method was actually triggered with a Base64 string
    expect(cloudinary.uploader.upload).toHaveBeenCalledWith(
      expect.stringContaining('data:image/jpeg;base64,'), // Matches the mimetype converted to base64
      { folder: 'user_profiles' }
    );
  });

  it('should call next() immediately and skip Cloudinary if no file is uploaded', async () => {
    // Fire Supertest with NO attachments, simulating a text-only update
    const response = await request(testApp)
      .put('/test-upload');

    expect(response.status).toBe(200);
    // Cloudinary upload should NEVER have been called
    expect(cloudinary.uploader.upload).not.toHaveBeenCalled();
    // req.data should be undefined or absent since no file was handled
    expect(response.body.passedData).toBeUndefined();
  });
});
