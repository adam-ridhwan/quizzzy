import * as z from 'zod';

const QuestionSchema = z.string();
export type Question = z.infer<typeof QuestionSchema>;

const ChoiceSchema = {
  id: z.string(),
  choice: z.string(),
  isCorrect: z.boolean(),
};

const ChoicesSchema = z
  .array(z.object(ChoiceSchema))
  .min(4, 'There should be exactly 4 choices')
  .max(4, 'There should be exactly 4 choices');
export type Choices = z.infer<typeof ChoicesSchema>;

const QuizSchema = z.object({
  id: z.string(),
  question: QuestionSchema,
  choices: ChoicesSchema,
});
export type Quiz = z.infer<typeof QuizSchema>;

const SelectedAnswersSchema = z.array(ChoiceSchema.id);

const QuizWithNoSelectedAnswersSchema = z.object({
  id: z.string(),
  quizzes: z.array(QuizSchema),
});
export type QuizWithNoSelectedAnswers = z.infer<typeof QuizWithNoSelectedAnswersSchema>;

const QuizzesWithSelectedAnswersSchema = z.object({
  id: z.string(),
  quizzes: z.array(QuizSchema.extend({ selectedAnswers: SelectedAnswersSchema })),
});
export type QuizzesWithSelectedAnswers = z.infer<typeof QuizzesWithSelectedAnswersSchema>;
