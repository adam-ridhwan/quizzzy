import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { Quiz } from '@/types/quiz-types';

const NEW_QUIZ: Quiz = {
  question: 'Tap to edit',
  correctAnswers: ['Choice 1'],
  choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
};

const draftQuizzesAtom = atomWithStorage<Quiz[]>('new quiz', [structuredClone(NEW_QUIZ)]);

export const useQuizBuilder = () => {
  const [draftQuizzes, setDraftQuizzes] = useAtom(draftQuizzesAtom);

  const addDraftQuiz = () => {
    setDraftQuizzes([...draftQuizzes, structuredClone(NEW_QUIZ)]);
  };

  const resetDraftQuiz = () => {
    setDraftQuizzes([structuredClone(NEW_QUIZ)]);
  };

  const deleteDraftQuiz = (index: number | null) => {
    const newQuizzes = [...draftQuizzes];
    if (index === null) return;

    newQuizzes.splice(index, 1);
    setDraftQuizzes(newQuizzes);
  };

  const duplicateDraftQuiz = (index: number) => {
    setDraftQuizzes(prev => [
      ...prev.slice(0, index + 1),
      structuredClone(draftQuizzes[index]),
      ...prev.slice(index + 1),
    ]);
  };

  return { draftQuizzes, setDraftQuizzes, addDraftQuiz, resetDraftQuiz, deleteDraftQuiz, duplicateDraftQuiz };
};
