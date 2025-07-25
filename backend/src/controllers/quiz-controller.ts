import { Request, Response } from "express";
import prisma from "@/prisma/client";
import { TQuestionInput, TCreateQuizInput, TQuiz } from "@/types/quiz-types";

export const createQuiz = async (req: Request, res: Response) => {
	try {
		const { title, questions } = req.body as TCreateQuizInput;

		const quiz = await prisma.quiz.create({
			data: {
				title,
				questions: {
					create: questions.map((question: TQuestionInput) => ({
						text: question.text,
						type: question.type,
						correctAnswer:
							question.type === "INPUT" ? question.correctAnswers[0] : null,
						options:
							question.type !== "INPUT"
								? {
										create: question.options.map((optionText) => ({
											text: optionText,
											isCorrect: question.correctAnswers.includes(optionText),
										})),
								  }
								: undefined,
					})),
				},
			},
			include: {
				questions: {
					include: { options: true },
				},
			},
		});

		res.status(201).json(quiz);
	} catch (err) {
		console.error("Error creating quiz:", err);
		res.status(500).json({ error: "Failed to create quiz" });
	}
};

export const getAllQuizzes = async (_: Request, res: Response) => {
	try {
		const quizzes = await prisma.quiz.findMany({
			select: {
				id: true,
				title: true,
				questions: { select: { id: true } },
			},
		});

		const result = quizzes.map((quiz) => ({
			id: quiz.id,
			title: quiz.title,
			questionCount: quiz.questions.length,
		}));

		res.json(result);
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch quizzes" });
	}
};

export const getQuizById = async (req: Request, res: Response) => {
	try {
		const quiz = await prisma.quiz.findUnique({
			where: { id: Number(req.params.id) },
			include: {
				questions: {
					include: {
						options: true,
					},
				},
			},
		});

		if (!quiz) return res.status(404).json({ error: "Quiz not found" });

		res.json(quiz);
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch quiz" });
	}
};

export const deleteQuiz = async (req: Request, res: Response) => {
	try {
		await prisma.quiz.delete({
			where: { id: Number(req.params.id) },
		});
		res.status(204).end();
	} catch (err) {
		res.status(500).json({ error: "Failed to delete quiz" });
	}
};
