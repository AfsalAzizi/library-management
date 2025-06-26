import { BookModel } from "../models/BookModel";
import { Request, Response, NextFunction } from "express";

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await BookModel.find();

    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      author,
      isbn,
      availableCopies = 1,
      totalCopies = 1,
      category,
    } = req.body;

    if (!title || !author || !isbn || !category) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const newBook = await BookModel.create({
      title,
      author,
      isbn,
      category,
      availableCopies: availableCopies,
      totalCopies: totalCopies,
    });

    if (!newBook) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }

    res.status(201).json({
      success: true,
      message: "Book was created successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
