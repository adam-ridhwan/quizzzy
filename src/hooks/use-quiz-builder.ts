import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { Quiz } from '@/types/quiz-types';

const NEW_QUIZ: Quiz = {
  question: 'Tap to edit',
  correctAnswers: ['Choice 1'],
  choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
};

const quizzesAtom = atomWithStorage<Quiz[]>('new quiz', [structuredClone(NEW_QUIZ)]);

export const useQuizBuilder = () => {
  const [quizzes, setQuizzes] = useAtom(quizzesAtom);

  const addQuiz = () => {
    setQuizzes([...quizzes, structuredClone(NEW_QUIZ)]);
  };

  const resetQuizzes = () => {
    setQuizzes([structuredClone(NEW_QUIZ)]);
  };

  const deleteQuiz = (index: number | null) => {
    const newQuizzes = [...quizzes];
    if (index === null) return;

    newQuizzes.splice(index, 1);
    setQuizzes(newQuizzes);
  };

  const duplicateQuiz = (index: number) => {
    setQuizzes(prev => [
      ...prev.slice(0, index + 1),
      structuredClone(quizzes[index]),
      ...prev.slice(index + 1),
    ]);
  };

  return { quizzes, setQuizzes, addQuiz, resetQuizzes, deleteQuiz, duplicateQuiz };
};
