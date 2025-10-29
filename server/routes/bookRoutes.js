import express from "express";
import mongoose from "mongoose";
import Book from "../models/Book.js";
import upload from "../configs/multer.js";
import { protect } from "../middleware/auth.js";

const bookRouter = express.Router();

// Setup GridFS bucket
let gfs;
mongoose.connection.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
});

/* ================================
   📘 Add New Book (with GridFS)
================================ */
bookRouter.post("/add", protect, upload.single("image"), async (req, res) => {
  try {
    const userId = req.userId;
    const { title, caption, rating } = req.body;
    const image = req.file;

    if (!title || !caption || !image || !rating) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // ✅ File is already uploaded to MongoDB via GridFS
    // multer-gridfs-storage handled that
    const newBook = await Book.create({
      title,
      caption,
      image: `/api/books/file/${image.filename}`, // store accessible file route
      imageId: image.id, // store GridFS file ID
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
   🖼️ Serve Stored Image
================================ */
bookRouter.get("/file/:filename", async (req, res) => {
  try {
    const file = await gfs.find({ filename: req.params.filename }).toArray();
    if (!file || file.length === 0)
      return res.status(404).json({ message: "File not found" });

    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).json({ message: "Error retrieving file" });
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
   ❌ Delete Book (with GridFS)
================================ */
bookRouter.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book)
      return res.status(404).json({ success: false, message: "Book not found" });

    if (book.user.toString() !== req.userId)
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to delete this book" });

    // ✅ Delete file from GridFS
    if (book.imageId) {
      try {
        await gfs.delete(new mongoose.Types.ObjectId(book.imageId));
      } catch (error) {
        console.warn("⚠️ GridFS deletion failed:", error.message);
      }
    }

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
