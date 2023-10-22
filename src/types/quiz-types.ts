import * as z from 'zod';

const QuestionSchema = z
  .string()
  .min(1, 'There should be exactly 1 correct answer')
  .max(4, 'There should be exactly 4 correct answers');
export type Question = z.infer<typeof QuestionSchema>;

const CorrectAnswerSchema = z.array(z.string());
export type CorrectAnswer = z.infer<typeof CorrectAnswerSchema>;

const ChoicesSchema = z
  .array(z.string())
  .min(4, 'There should be exactly 4 choices')
  .max(4, 'There should be exactly 4 choices');
export type Choices = z.infer<typeof ChoicesSchema>;

const QuizSchema = z.object({
  _id: z.string().optional(),
  question: QuestionSchema,
  correctAnswers: CorrectAnswerSchema,
  choices: ChoicesSchema,
});
export type Quiz = z.infer<typeof QuizSchema>;

export type QuizzesWithSelectedAnswers = {
  selectedAnswers?: Choices;
} & Quiz;
