import { useRef } from 'react';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { ContentEditableEvent } from 'react-contenteditable';
import { v4 as uuidv4 } from 'uuid';

import { Quiz } from '@/types/quiz-types';

const NEW_QUIZ: Quiz = {
  _id: uuidv4(),
  question: 'What is the best programming language?',
  choices: [
    { id: uuidv4(), choice: 'Java', isCorrect: false },
    { id: uuidv4(), choice: 'TypeScript', isCorrect: false },
    { id: uuidv4(), choice: 'Python', isCorrect: false },
    { id: uuidv4(), choice: 'C3', isCorrect: false },
  ],
};

const draftQuizzesAtom = atomWithStorage<Quiz[]>('new quiz', [structuredClone(NEW_QUIZ)]);

export const useQuizBuilder = () => {
  const [draftQuizzes, setDraftQuizzes] = useAtom(draftQuizzesAtom);

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   *  ADD DRAFT QUIZ
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const addDraftQuiz = () => {
    setDraftQuizzes([...draftQuizzes, structuredClone(NEW_QUIZ)]);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * RESET DRAFT QUIZ
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const resetDraftQuiz = () => {
    setDraftQuizzes([structuredClone(NEW_QUIZ)]);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * DELETE DRAFT QUIZ
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const deleteDraftQuiz = (index: number | null) => {
    const newQuizzes = [...draftQuizzes];
    if (index === null) return;

    newQuizzes.splice(index, 1);
    setDraftQuizzes(newQuizzes);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * DUPLICATE DRAFT QUIZ
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const duplicateDraftQuiz = (index: number) => {
    setDraftQuizzes(prev => [
      ...prev.slice(0, index + 1),
      structuredClone(draftQuizzes[index]),
      ...prev.slice(index + 1),
    ]);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLES QUESTION CHANGE
   * @param e - Content editable event.
   * @param quizIdx - The index of the quiz.
   * @summary
   * Handles the change of the choice text.
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleQuestionChange = (e: ContentEditableEvent, quizIdx: number) => {
    const quizzesCopy = [...draftQuizzes];
    quizzesCopy[quizIdx].question = e.currentTarget.innerText;
    setDraftQuizzes(quizzesCopy);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLES CHOICE CHANGE
   * @param e - Content editable event.
   * @param quizIdx - The index of the quiz.
   * @param choiceIdx - The index of the choice.
   * @summary
   * Handles the change of the choice text.
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleChoiceChange = (e: ContentEditableEvent, quizIdx: number, choiceIdx: number) => {
    const draftQuizzesCopy = [...draftQuizzes];

    const currentQuiz = draftQuizzesCopy[quizIdx];
    const currentChoice = currentQuiz.choices[choiceIdx];
    currentChoice.choice = e.currentTarget.innerText;

    setDraftQuizzes(draftQuizzesCopy);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLES CHECKBOX CHANGE
   * @param quizIdx - The index of the quiz.
   * @param choiceIdx - The index of the choice.
   * @summary
   * Handles the change of the checkbox.
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleCheckBoxChange = (quizIdx: number, choiceIdx: number) => {
    const draftQuizzesCopy = [...draftQuizzes];

    const currentQuiz = draftQuizzesCopy[quizIdx];
    const currentChoice = currentQuiz.choices[choiceIdx];
    currentChoice.isCorrect = !currentChoice.isCorrect;

    setDraftQuizzes(draftQuizzesCopy);
  };

  return {
    draftQuizzes,
    setDraftQuizzes,
    addDraftQuiz,
    resetDraftQuiz,
    deleteDraftQuiz,
    duplicateDraftQuiz,
    handleQuestionChange,
    handleChoiceChange,
    handleCheckBoxChange,
  };
};
