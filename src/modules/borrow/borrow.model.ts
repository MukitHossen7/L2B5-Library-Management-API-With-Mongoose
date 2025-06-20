import { model, Schema } from "mongoose";
import { IBorrow, UpdateAvailabilityMethod } from "./borrow.interface";
import Book from "../book/book.model";

const borrowSchema = new Schema<IBorrow, UpdateAvailabilityMethod>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    dueDate: {
      type: Date,
      required: true,
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
