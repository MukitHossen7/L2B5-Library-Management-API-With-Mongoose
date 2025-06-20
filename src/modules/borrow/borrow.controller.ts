import { Request, Response } from "express";
import Book from "../book/book.model";

const createBorrowBook = async (req: Request, res: Response) => {
  try {
    const { book, quantity } = req.body;

    const findBook = await Book.findById(book);

    //check the book is available
    if (!findBook) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
        error: "Invalid book ID",
      });
    }

    //Verify the book has enough available copies.
    if (!((findBook?.copies as number) >= quantity)) {
      return res.status(400).json({
        message: "Book does not have enough available copies",
        success: false,
        error: "Not enough copies available",
      });
    }

    // Deduct the requested quantity from the book's available copies
    await Book.findByIdAndUpdate(
      book,
      {
        $inc: {
          copies: -quantity,
        },
      },
      { new: true }
    );

    console.log(findBook);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Book borrowed failed",
      success: false,
      error,
    });
  }
};

export const borrowBookController = {
  createBorrowBook,
};
