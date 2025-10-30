import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

// ✅ Configure storage to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'bookworm_uploads', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`,
  },
});

const upload = multer({ storage });

export default upload;
