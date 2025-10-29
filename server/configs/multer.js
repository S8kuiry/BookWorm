// configs/multer.js
import multer from "multer";

const storage = multer.memoryStorage(); // ✅ store file in memory buffer for ImageKit
const upload = multer({ storage });

export default upload;
