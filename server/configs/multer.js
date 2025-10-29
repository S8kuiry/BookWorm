import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection URL
const mongoURI = process.env.MONGODB_URI;

// Create GridFS storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      bucketName: "uploads", // collection name in MongoDB
      filename: `${Date.now()}-${file.originalname}`, // custom filename
      metadata: {
        fieldName: file.fieldname,
      },
    };
  },
});

// Initialize multer with GridFS storage
const upload = multer({ storage });

export default upload;
