import express from "express";
import fs from "fs";
import path from "path";
import Book from "../models/Book.js";
import upload from "../configs/multer.js";
import { protect } from "../middleware/auth.js";

const bookRouter = express.Router();

/* ================================
   📘 Add New Book (Local Upload)
================================ */
bookRouter.post("/add", protect, upload.single("image"), async (req, res) => {
  try {
    const userId = req.userId;
    const { title, caption, rating } = req.body;

    if (!req.file?.path)
      return res.status(400).json({ success: false, message: "Image upload failed" });

    const newBook = await Book.create({
      title,
      caption,
      image: req.file.path, // Cloudinary auto-provides URL here!
      rating,
      user: userId,
    });

    res.json({ success: true, book: newBook });
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ success: false, message: "Failed to add book." });
  }
});

/* ================================
   📚 Fetch Books (Paginated)
================================ */
bookRouter.get("/all", async (req, res) => {
  try {
    // ✅ Fetch all books and populate user details
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .populate("user", "name profileImage");

    return res.json({
      success: true,
      books,
      totalBooks: books.length,
      message: "Books fetched successfully",
    });
  } catch (error) {
    console.error("🔥 Error fetching books:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch books." });
  }
});



/* ================================
   ❌ Delete Book (and Local Image)
================================ */
bookRouter.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book)
      return res.status(404).json({ success: false, message: "Book not found" });

    if (book.user.toString() !== req.userId)
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this book",
      });

    // ✅ Delete image from /uploads folder
    if (book.image) {
      const imagePath = path.join(process.cwd(), book.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn("⚠️ Failed to delete image:", err.message);
      });
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

// Fetch books of logged-in user
bookRouter.get("/user/all", protect, async (req, res) => {
  try {
    const userId = req.userId;
    const books = await Book.find({ user: userId }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      books,
      totalBooks: books.length,
      message: "User books fetched successfully",
    });
  } catch (error) {
    console.error("🔥 Error fetching user books:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch user books." });
  }
});
