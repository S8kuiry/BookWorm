import express from 'express';

const bookRouter = express.Router();
import fs from 'fs';
import imagekit from '../configs/imagekit.js';
import Book from '../models/Book.js';
import upload from '../configs/multer.js';
import { protect } from '../middleware/auth.js';


bookRouter.post('/add',protect, upload.single('image'), async (req, res) => {
  try {
    const userId = req.userId;
    const { title, caption, rating } = req.body;
    const image = req.file;

    if (!title || !caption || !image || !rating) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    // Upload image to ImageKit
    const response = await imagekit.upload({
      file: image.buffer, // Buffer from multer memoryStorage
      fileName: image.originalname,
      folder: "book_images",
      transformation: [{ width: 300, height: 300, quality: 75 }]
    });

    const newBook = await Book.create({
      title,
      caption,
      image: response.url,
      rating,
        imageId: response.fileId,
        user: userId
    });

    return res.json({ success: true, book: newBook, message: "Post added successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});


export default bookRouter;// You can add your book-related routes here in the future



// fetching all he books from datbase based on limit and page
bookRouter.get('/',protect,async(req,res)=>{
    try {
       const page = req.query.page || 1
       const limit = req.query.limit || 5
       const skip = (page - 1) * limit

       const books = await Book.find().sort({createdAt:-1}).skip(skip).limit(limit).populate("user","name profileImage")

       const totalBooks = Book.countDocuments()
       return res.json({success:true,books,currentPage:page,totalBooks,totalPages:Math.ceil(totalBooks/limit)})
    } catch (error) {
        return res.json({success:false,message:error.message})
        
    }
    
})
bookRouter.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    if (book.user.toString() !== req.userId) {
      return res.status(401).json({ success: false, message: "You are not authorized to delete this book" });
    }

    // ✅ Delete image from ImageKit if available
    if (book.imageId) {
      try {
        await imagekit.deleteFile(book.imageId);
      } catch (error) {
        console.warn("ImageKit deletion failed:", error.message);
      }
    }

    // ✅ Delete book from MongoDB
    await Book.findByIdAndDelete(id);

    return res.json({ success: true, message: "Book deleted successfully" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});
