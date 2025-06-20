import { model, Schema } from "mongoose";
import { IBorrow, UpdateAvailabilityMethod } from "./borrow.interface";
import Book from "../book/book.model";

const borrowSchema = new Schema<IBorrow, UpdateAvailabilityMethod>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "bookId must be required"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity must be required"],
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: {
      type: Date,
      required: [true, "dueDate must be required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

borrowSchema.static(
  "updateAvailability",
  async function updateAvailabilityFunction(id: string) {
    const findBook = await Book.findById(id);
    if (findBook?.copies === 0) {
      await Book.findByIdAndUpdate(
        id,
        {
          $set: {
            available: false,
          },
        },
        { runValidators: true }
      );
    }
  }
);

const Borrow = model<IBorrow, UpdateAvailabilityMethod>("Borrow", borrowSchema);
export default Borrow;
