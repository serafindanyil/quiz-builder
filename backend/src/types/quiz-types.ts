import type { QuestionType } from "@/generated/prisma";

export type TQuestionInput = {
	text: string;
	type: QuestionType;
	options: string[];
	correctAnswers: string[];
};

export type TCreateQuizInput = {
	title: string;
	questions: TQuestionInput[];
};

export type TQuiz = {
	id: number;
	title: string;
	questions: { id: number }[];
};
