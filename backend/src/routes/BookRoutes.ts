import { Router } from "express";
import { addBook, getAllBooks } from "../controllers/BookController";
import authenticate from "../middlewares/AuthMiddleware";

const router = Router();

router.post("/", authenticate, addBook);
router.get("/", getAllBooks);

export default router;
