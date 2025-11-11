import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

const router = express.Router();

// Configurar middleware multer para memoria
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

// Subir imagen
router.post('/image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image was uploaded.'})
        }

        // convert buffer to stream
        const stream = Readable.from(req.file.buffer);

        // upload to Cloudinary in webp format
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'ecommerce-products',
                    format: 'webp',
                    quality: 'auto:good',
                    width: 800,
                    crop: 'limit'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.pipe(uploadStream);
        });

        res.json({
            message: 'Image successfully uploaded',
            url: result.secure_url,
            public_id: result.public_id
        });
    } catch (error) {
        console.log('Error uploading image:', error);
        res.status(500),json({ error: 'Error uploading image' })
    }
});

export default router;