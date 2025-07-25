// ПРАВИЛЬНИЙ ВАРІАНТ (`~/types/quiz-types.ts`)

// Імпортуємо згенерований enum прямо з клієнта Prisma
// If your Prisma schema defines an enum called QuestionType, it will be exported as QuestionType in the generated client.
// Otherwise, define your own enum here:
export enum QuestionType {
	SINGLE_CHOICE = "SINGLE_CHOICE",
	MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
	TEXT = "TEXT",
}
// Remove the import if not available from Prisma

export type TQuestionInput = {
	text: string;
	type: QuestionType; // Використовуємо згенерований тип
	options: string[];
	correctAnswers: string[];
};

export type TCreateQuizInput = {
	title: string;
	questions: TQuestionInput[];
};

// Цей тип TQuiz не ідеальний, бо залежить від того, що ви вибираєте в запиті.
// Але якщо він потрібен, то ID мають бути рядками.
export type TQuiz = {
	id: string; // ID - це рядок (string)
	title: string;
	questions: { id: string }[]; // ID - це рядок (string)
};
