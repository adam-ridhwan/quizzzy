import * as z from 'zod';

const QuestionSchema = z
  .string()
  .min(1, 'There should be exactly 1 correct answer')
  .max(4, 'There should be exactly 4 correct answers');
export type Question = z.infer<typeof QuestionSchema>;

const ChoicesSchema = z
  .array(z.object({ id: z.string(), choice: z.string(), isCorrect: z.boolean() }))
  .min(4, 'There should be exactly 4 choices')
  .max(4, 'There should be exactly 4 choices');
export type Choices = z.infer<typeof ChoicesSchema>;

const QuizSchema = z.object({
  id: z.string(),
  question: QuestionSchema,
  choices: ChoicesSchema,
});
export type Quiz = z.infer<typeof QuizSchema>;

export type QuizzesWithSelectedAnswers = {
  selectedAnswers?: string[];
} & Quiz;
