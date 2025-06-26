import express from "express";
import cors from "cors";

import BookRoutes from "./routes/BookRoutes";
import AuthRoutes from "./routes/AuthRoutes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/books", BookRoutes);
app.use("/api/auth", AuthRoutes);

app.get("/", () => {
  return {
    message: "App is running..",
  };
});

export default app;
