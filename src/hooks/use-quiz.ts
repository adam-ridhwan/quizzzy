import { QUIZZES } from '@/constants/development';
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { QuizzesWithSelectedAnswers } from '@/types/quiz-types';
import { delay } from '@/lib/utils';

const scoreAtom = atom(0);
const quizzesAtom = atomWithStorage<QuizzesWithSelectedAnswers>('quiz', {
  ...QUIZZES,
  quizzes: QUIZZES.quizzes.map(quiz => ({ ...quiz, selectedAnswers: [] })),
});

const currentQuizAtom = atom(0);
const loadingAtom = atom(false);

const useQuiz = () => {
  const [score, setScore] = useAtom(scoreAtom);
  const [quizzes, setQuizzes] = useAtom(quizzesAtom);
  const [currentQuizIndex, setCurrentQuizIndex] = useAtom(currentQuizAtom);

  const [isLoading, setIsLoading] = useAtom(loadingAtom);

  const totalAnsweredQuizzes = quizzes.quizzes.reduce<number>((acc, quiz) => {
    const selectedAnswers = quiz.selectedAnswers ?? [];

    return acc + (selectedAnswers?.length > 0 ? 1 : 0);
  }, 0);

  const progress = (totalAnsweredQuizzes / quizzes.quizzes.length) * 100 || 10;

  // useEffectOnce(() => {
  //   const quiz = localStorage.getItem('quiz');
  //   const value = quiz ? JSON.parse(quiz) : null;
  //
  //   if (value === 0) {
  //     setQuizzes();
  //   }
  // });

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLE NAVIGATION
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleNavigateBackward = () => currentQuizIndex > 0 && setCurrentQuizIndex(currentQuizIndex - 1);
  const handleNavigateForward = () => setCurrentQuizIndex(currentQuizIndex + 1);

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLE SELECT
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleSelect = (currentQuizIndex: number, choice: string) => {
    const quizCopy = { ...quizzes };

    const currentQuiz = quizCopy.quizzes[currentQuizIndex];
    const selectedAnswers = currentQuiz.selectedAnswers ?? [];
    const correctAnswers = currentQuiz.choices.filter(item => item.isCorrect).map(item => item.choice);

    // single response
    if (correctAnswers.length === 1) {
      currentQuiz.selectedAnswers = [choice];
    }

    // multiple response
    if (correctAnswers.length > 1) {
      currentQuiz.selectedAnswers = selectedAnswers.includes(choice)
        ? selectedAnswers.filter((item: string) => item !== choice)
        : [...selectedAnswers, choice];
    }

    setQuizzes(quizCopy);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLE RESET
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleReset = () => {
    setScore(0);
    setCurrentQuizIndex(0);
    setQuizzes({
      ...QUIZZES,
      quizzes: QUIZZES.quizzes.map(quiz => ({ ...quiz, selectedAnswers: [] })),
    });
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLE SUBMIT
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleSubmit = async () => {
    setIsLoading(true);

    await delay(2000);

    let score = 0;
    quizzes.quizzes.forEach(quiz => {
      const selectedAnswers = quiz.selectedAnswers ?? [];
      const correctAnswers = quiz.choices.filter(choice => choice.isCorrect).map(c => c.choice) ?? [];

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
    setCurrentQuizIndex(quizzes.quizzes.length + 1);
    setIsLoading(false);
  };

  return {
    quizzes,
    setQuizzes,
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
