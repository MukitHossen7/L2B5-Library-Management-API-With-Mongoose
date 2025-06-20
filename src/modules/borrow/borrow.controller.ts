import { Request, Response } from "express";
import Book from "../book/book.model";
import Borrow from "./borrow.model";

const createBorrowBook = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

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
    if (book && quantity && dueDate && quantity) {
      await Book.findByIdAndUpdate(
        book,
        {
          $inc: {
            copies: -quantity,
          },
        },
        { new: true, runValidators: true }
      );
    }

    // implement If copies become 0, update available to false using a static method
    await Borrow.updateAvailability(book);

    // Save the borrow record with all relevant details
    const data = await Borrow.create({ book, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data,
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
