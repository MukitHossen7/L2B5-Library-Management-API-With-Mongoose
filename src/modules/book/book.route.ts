import express from "express";
import { bookController } from "./book.controller";

const bookRoute = express.Router();

bookRoute.post("/", bookController.createBook);
bookRoute.get("/", bookController.getBooks);

export default bookRoute;
