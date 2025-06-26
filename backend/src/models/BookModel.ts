import mongoose, { Document, Schema } from "mongoose";

interface BookDocument extends Document {
  title: string;
  author: string;
  isbn: string;
  availableCopies: number;
  totalCopies: number;
  category: "fiction" | "science";
}

const BookSchema = new Schema<BookDocument>(
  {
    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    availableCopies: {
      type: Number,
      required: true,
      min: 0,
    },
    totalCopies: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["fiction", "science"],
    },
  },
  {
    timestamps: true,
  }
);

export const BookModel = mongoose.model<BookDocument>("Book", BookSchema);
