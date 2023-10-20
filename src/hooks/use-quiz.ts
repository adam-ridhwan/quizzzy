import { QUIZZES } from '@/constants/development';
import { atom, useAtom } from 'jotai';

import { QuizzesWithSelectedAnswers } from '@/types/quiz-types';
import { delay } from '@/lib/utils';

const scoreAtom = atom(0);
const quizzesAtom = atom<QuizzesWithSelectedAnswers[]>(
  QUIZZES.map(quiz => ({ ...quiz, selectedAnswers: [] }))
);
const currentQuizAtom = atom(0); // TODO: switch to id
const loadingAtom = atom(false);

const useQuiz = () => {
  const [score, setScore] = useAtom(scoreAtom);
  const [quizzes, setQuizzes] = useAtom(quizzesAtom);
  const [currentQuizIndex, setCurrentQuizIndex] = useAtom(currentQuizAtom);
  const [isLoading, setIsLoading] = useAtom(loadingAtom);

  const totalAnsweredQuizzes = quizzes.reduce<number>((acc, quiz) => {
    const selectedAnswers = quiz.selectedAnswers ?? [];

    return acc + (selectedAnswers?.length > 0 ? 1 : 0);
  }, 0);

  const progress = (totalAnsweredQuizzes / quizzes.length) * 100 || 10;

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLE NAVIGATE BACKWARD
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleNavigateBackward = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
    }
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLE NAVIGATE FORWARD
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleNavigateForward = () => {
    setCurrentQuizIndex(currentQuizIndex + 1);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLE SELECT
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleSelect = (choice: string) => {
    const updatedQuizzes = quizzes.map((quiz, index) => {
      const selectedAnswers = quiz.selectedAnswers ?? [];
      const correctAnswers = quiz.correctAnswers ?? [];

      if (index !== currentQuizIndex) return quiz;

      // single response
      if (correctAnswers.length === 1) return { ...quiz, selectedAnswers: [choice] };

      // multiple response
      if (correctAnswers.length > 1)
        return selectedAnswers?.includes(choice)
          ? { ...quiz, selectedAnswers: selectedAnswers.filter(item => item !== choice) }
          : { ...quiz, selectedAnswers: [...selectedAnswers, choice] };

      return quiz;
    });

    setQuizzes(updatedQuizzes);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLE RESET
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleReset = () => {
    setScore(0);
    setCurrentQuizIndex(0);
    setQuizzes(quizzes.map(quiz => ({ ...quiz, selectedAnswers: [] })));
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLE SUBMIT
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleSubmit = async () => {
    setIsLoading(true);

    await delay(2000);

    let score = 0;
    quizzes.forEach(quiz => {
      const selectedAnswers = quiz.selectedAnswers ?? [];
      const correctAnswers = quiz.correctAnswers ?? [];

      // single response
      if (correctAnswers.length === 1) {
        selectedAnswers[0] === correctAnswers[0] && score++;
      }
      // multiple response
      else if (selectedAnswers.length >= 1 && correctAnswers.length > 1) {
        if (correctAnswers.every((value, index) => value === selectedAnswers[index])) {
          score++;
        }
      }
    });

    setScore(score);
    setCurrentQuizIndex(quizzes.length + 1);
    setIsLoading(false);
  };

  return {
    quizzes,
    currentQuizIndex,
    setCurrentQuizIndex,
    progress,
    score,
    isLoading,
    handleNavigateBackward,
    handleNavigateForward,
    handleSelect,
    handleReset,
    handleSubmit,
  };
};

export default useQuiz;
