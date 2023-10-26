import { useRef } from 'react';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { ContentEditableEvent } from 'react-contenteditable';
import { v4 as uuidv4 } from 'uuid';

import { Quiz } from '@/types/quiz-types';

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

const draftQuizzesAtom = atomWithStorage<Quiz[]>('new quiz', []);

export const useQuizBuilder = () => {
  const [draftQuizzes, setDraftQuizzes] = useAtom(draftQuizzesAtom);

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   *  ADD DRAFT QUIZ
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const addDraftQuiz = () => setDraftQuizzes([...draftQuizzes, NEW_QUIZ()]);
  const addDraftQuizBelowId = (quizId: string) => {
    const newQuizzes = [...draftQuizzes];
    if (quizId === null) return;

    const quizIndex = newQuizzes.findIndex(quiz => quiz.id === quizId);

    const newQuiz = structuredClone(NEW_QUIZ());

    setDraftQuizzes(prev => [...prev.slice(0, quizIndex + 1), newQuiz, ...prev.slice(quizIndex + 1)]);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * RESET DRAFT QUIZ
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const resetDraftQuiz = () => setDraftQuizzes([]);

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * DELETE DRAFT QUIZ
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const deleteDraftQuiz = (quizId: string | null) => {
    const newQuizzes = [...draftQuizzes];
    if (quizId === null) return;

    const quizIndex = newQuizzes.findIndex(quiz => quiz.id === quizId);

    newQuizzes.splice(quizIndex, 1);
    setDraftQuizzes(newQuizzes);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * DUPLICATE DRAFT QUIZ
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const duplicateDraftQuiz = (id: string) => {
    const quizzesCopy = [...draftQuizzes];

    const quizIndex = quizzesCopy.findIndex(quiz => quiz.id === id);

    const duplicatedQuiz = structuredClone(NEW_QUIZ(quizzesCopy[quizIndex]));

    setDraftQuizzes(prev => [...prev.slice(0, quizIndex + 1), duplicatedQuiz, ...prev.slice(quizIndex + 1)]);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLES QUESTION CHANGE
   * @param e - Content editable event.
   * @param id - The index of the quiz.
   * @summary
   * Handles the change of the choice text.
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleQuestionChange = (e: ContentEditableEvent, id: string) => {
    const quizzesCopy = [...draftQuizzes];

    const quizIndex = quizzesCopy.findIndex(quiz => quiz.id === id);

    if (quizIndex === -1) return;

    quizzesCopy[quizIndex].question = e.currentTarget.innerText;
    setDraftQuizzes(quizzesCopy);
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
    const draftQuizzesCopy = [...draftQuizzes];

    const quizIndex = draftQuizzesCopy.findIndex(quiz => quiz.id === quizId);
    if (quizIndex === -1) return;

    const currentQuiz = draftQuizzesCopy[quizIndex];
    const choiceIndex = currentQuiz.choices.findIndex(choice => choice.id === choiceId);
    if (choiceIndex === -1) return;

    const currentChoice = currentQuiz.choices[choiceIndex];
    currentChoice.choice = e.currentTarget.innerText;

    setDraftQuizzes(draftQuizzesCopy);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLES CHECKBOX CHANGE
   * @param quizId - The id of the quiz.
   * @param choiceId - The id of the choice.
   * @summary
   * Handles the change of the checkbox.
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleCheckBoxChange = (quizId: string, choiceId: string) => {
    const draftQuizzesCopy = [...draftQuizzes];

    const quizIndex = draftQuizzesCopy.findIndex(quiz => quiz.id === quizId);

    if (quizIndex === -1) return;

    const currentQuiz = draftQuizzesCopy[quizIndex];

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
    addDraftQuizBelowId,
    resetDraftQuiz,
    deleteDraftQuiz,
    duplicateDraftQuiz,
    handleQuestionChange,
    handleChoiceChange,
    handleCheckBoxChange,
  };
};
