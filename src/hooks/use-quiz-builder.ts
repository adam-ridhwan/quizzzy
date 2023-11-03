import { useRef } from 'react';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { ContentEditableEvent } from 'react-contenteditable';
import { v4 as uuidv4 } from 'uuid';

import { Quiz, QuizWithNoSelectedAnswers, QuizzesWithSelectedAnswers } from '@/types/quiz-types';

const NEW_QUIZ = (quiz?: Quiz) => {
  return {
    id: uuidv4(),
    question: quiz?.question || '',
    choices: Array.from({ length: 4 }, (_, index) => ({
      id: uuidv4(),
      choice: quiz?.choices[index].choice || '',
      isCorrect: quiz?.choices[index].isCorrect || false,
    })),
  };
};

const draftQuizzesAtom = atomWithStorage<QuizWithNoSelectedAnswers>('new quiz', {
  id: uuidv4(),
  quizzes: [],
});

export const useQuizBuilder = () => {
  const [draftQuizzes, setDraftQuizzes] = useAtom(draftQuizzesAtom);

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   *  ADD DRAFT QUIZ
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const addDraftQuiz = () => {
    const draftQuizCopy = { ...draftQuizzes };
    if (!draftQuizCopy || !draftQuizCopy.quizzes) return;

    draftQuizCopy.quizzes.push(NEW_QUIZ());

    setDraftQuizzes({
      ...draftQuizzes,
      quizzes: draftQuizCopy.quizzes,
    });
  };

  // const addDraftQuizBelowId = (quizId: string) => {
  //   const newQuizzes = [...draftQuizzes];
  //   if (quizId === null) return;
  //
  //   const quizIndex = newQuizzes.findIndex(quiz => quiz.id === quizId);
  //
  //   const newQuiz = structuredClone(NEW_QUIZ());
  //
  //   setDraftQuizzes(prev => [...prev.slice(0, quizIndex + 1), newQuiz, ...prev.slice(quizIndex + 1)]);
  // };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * RESET DRAFT QUIZ
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const resetDraftQuiz = () =>
    setDraftQuizzes({
      ...draftQuizzes,
      quizzes: [],
    });

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * DELETE DRAFT QUIZ
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const deleteDraftQuiz = (quizId: string | null) => {
    const draftQuizzesCopy = { ...draftQuizzes };
    if (quizId === null) return;

    const quizIndex = draftQuizzesCopy.quizzes.findIndex(quiz => quiz.id === quizId);

    draftQuizzesCopy.quizzes.splice(quizIndex, 1);
    setDraftQuizzes(draftQuizzesCopy);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * DUPLICATE DRAFT QUIZ
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const duplicateDraftQuiz = (id: string) => {
    const draftQuizCopy = { ...draftQuizzes };
    if (!draftQuizCopy || !draftQuizCopy.quizzes) return;

    const quizIndex = draftQuizCopy.quizzes.findIndex(quiz => quiz.id === id);

    const duplicatedQuiz = structuredClone(NEW_QUIZ(draftQuizCopy.quizzes[quizIndex]));

    setDraftQuizzes({
      ...draftQuizzes,
      quizzes: [
        ...draftQuizzes.quizzes.slice(0, quizIndex + 1),
        duplicatedQuiz,
        ...draftQuizzes.quizzes.slice(quizIndex + 1),
      ],
    });
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLES QUESTION CHANGE
   * @param e - Content editable event.
   * @param id - The index of the quiz.
   * @summary
   * Handles the change of the choice text.
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleQuestionChange = (e: ContentEditableEvent, id: string) => {
    const draftQuizCopy = { ...draftQuizzes };
    if (!draftQuizCopy || !draftQuizCopy.quizzes) return;

    const quizIndex = draftQuizCopy.quizzes.findIndex(quiz => quiz.id === id);

    if (quizIndex === -1) return;

    draftQuizCopy.quizzes[quizIndex].question = e.currentTarget.innerText;
    setDraftQuizzes(draftQuizCopy);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLES CHOICE CHANGE
   * @param e - Content editable event.
   * @param quizId - The index of the quiz.
   * @param choiceId - The index of the choice.
   * @summary
   * Handles the change of the choice text.
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleChoiceChange = (e: ContentEditableEvent, quizId: string, choiceId: string) => {
    const draftQuizCopy = { ...draftQuizzes };
    if (!draftQuizCopy || !draftQuizCopy.quizzes) return;

    const quizIndex = draftQuizCopy.quizzes.findIndex(quiz => quiz.id === quizId);
    if (quizIndex === -1) return;

    const currentQuiz = draftQuizCopy.quizzes[quizIndex];
    const choiceIndex = currentQuiz.choices.findIndex(choice => choice.id === choiceId);
    if (choiceIndex === -1) return;

    const currentChoice = currentQuiz.choices[choiceIndex];
    currentChoice.choice = e.currentTarget.innerText;

    setDraftQuizzes(draftQuizCopy);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLES CHECKBOX CHANGE
   * @param quizId - The id of the quiz.
   * @param choiceId - The id of the choice.
   * @summary
   * Handles the change of the checkbox.
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleCheckBoxChange = (quizId: string, choiceId: string) => {
    const draftQuizzesCopy = { ...draftQuizzes };
    if (!draftQuizzesCopy || !draftQuizzesCopy.quizzes) return;

    const quizIndex = draftQuizzesCopy.quizzes.findIndex(quiz => quiz.id === quizId);

    if (quizIndex === -1) return;

    const currentQuiz = draftQuizzesCopy.quizzes[quizIndex];

    // Find the index of the choice with the specified choiceId
    const choiceIndex = currentQuiz.choices.findIndex(choice => choice.id === choiceId);

    // Check if the choice with the specified choiceId was found
    if (choiceIndex === -1) return;

    const currentChoice = currentQuiz.choices[choiceIndex];
    currentChoice.isCorrect = !currentChoice.isCorrect;

    setDraftQuizzes(draftQuizzesCopy);
  };

  return {
    draftQuizzes,
    setDraftQuizzes,
    addDraftQuiz,
    // addDraftQuizBelowId,
    resetDraftQuiz,
    deleteDraftQuiz,
    duplicateDraftQuiz,
    handleQuestionChange,
    handleChoiceChange,
    handleCheckBoxChange,
  };
};
