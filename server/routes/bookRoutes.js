import express from "express";
import Book from "../models/Book.js";
import upload from "../configs/multer.js";
import { protect } from "../middleware/auth.js";
import imagekit from "../configs/imagekit.js";

const bookRouter = express.Router(); 

/* ================================
   📘 Add New Book
================================ */
bookRouter.post("/add", protect, upload.single("image"), async (req, res) => {
  try {
    const userId = req.userId;
    const { title, caption, rating } = req.body;
    const image = req.file;

    if (!title || !caption || !image || !rating) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all required fields." });
    }

    // ✅ Upload image to ImageKit (new SDK syntax)
    const uploadResponse = await imagekit.assets.upload({
      file: image.buffer, // file buffer from multer
      fileName: image.originalname,
      folder: "book_images",
      transformation: [{ width: 300, height: 300, quality: 75 }],
    });

    // ✅ Create book record in MongoDB
    const newBook = await Book.create({
      title,
      caption,
      image: uploadResponse.url,
      imageId: uploadResponse.fileId,
      rating,
      user: userId,
    });

    return res.json({
      success: true,
      book: newBook,
      message: "Book added successfully!",
    });
  } catch (error) {
    console.error("🔥 Error adding book:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to add book.",
    });
  }
});

/* ================================
   📚 Fetch Books (Paginated)
================================ */
bookRouter.get("/", protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [books, totalBooks] = await Promise.all([
      Book.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "name profileImage"),
      Book.countDocuments(),
    ]);

    return res.json({
      success: true,
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch books." });
  }
});

/* ================================
   ❌ Delete Book
================================ */
bookRouter.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    if (book.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to delete this book" });
    }

    // ✅ Delete image from ImageKit (new SDK syntax)
    if (book.imageId) {
      try {
        await imagekit.assets.deleteFile(book.imageId);
      } catch (error) {
        console.warn("⚠️ ImageKit deletion failed:", error.message);
      }
    }

    // ✅ Delete book from MongoDB
    await Book.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete book." });
  }
});

export default bookRouter;
