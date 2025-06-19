import { Request, Response } from "express";
import Book from "./book.model";

const createBook = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const data = await Book.create(payload);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Book created failed",
      success: false,
      error,
    });
  }
};

const getBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sort = "desc",
      limit = 10,
      sortBy = "createdAt",
    } = req.query;

    const filters: any = {};
    if (filter) {
      filters.genre = filter;
    }

    const data = await Book.find(filters)
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
      .limit(Number(limit));

    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Books retrieved failed",
      success: false,
      error,
    });
  }
};

export const bookController = {
  createBook,
  getBooks,
};
