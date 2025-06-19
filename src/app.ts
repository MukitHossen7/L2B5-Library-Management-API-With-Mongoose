import express, { Request, Response } from "express";
import cors from "cors";

export const app = express();

//middleware
app.use([cors(), express.json()]);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "This is Library Management API",
  });
});
