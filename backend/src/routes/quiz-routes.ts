import express from "express";
import {
	createQuiz,
	getAllQuizzes,
	getQuizById,
	deleteQuiz,
} from "../controllers/quiz-controller";

const router = express.Router();

router.post("/quizzes", createQuiz);
router.get("/quizzes", getAllQuizzes);
router.get("/quizzes/:id", getQuizById);
router.delete("/quizzes/:id", deleteQuiz);

export default router;
