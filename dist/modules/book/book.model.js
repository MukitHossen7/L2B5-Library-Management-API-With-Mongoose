"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "title must be required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "author must be required"],
        trim: true,
    },
    genre: {
        type: String,
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "{VALUE} is not a valid genre",
        },
        required: [true, "genre must be required"],
    },
    isbn: {
        type: String,
        required: [true, "isbn must be required"],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    copies: {
        type: Number,
        required: [true, "copies must be required"],
        min: [0, "Copies must be a positive number"],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
