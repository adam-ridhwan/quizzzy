'use client';

import { useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import { cn } from '@/lib/utils';
import useQuiz from '@/hooks/use-quiz';
import { useQuizBuilder } from '@/hooks/use-quiz-builder';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import CheckboxChecked from '@/components/ui/icons/checkbox-checked';
import CheckboxEmpty from '@/components/ui/icons/checkbox-empty';
import { Copy } from '@/components/ui/icons/copy';
import { Trash } from '@/components/ui/icons/trash';

const QuizBuilder = () => {
  const { draftQuizzes, setDraftQuizzes, addDraftQuiz, deleteDraftQuiz, duplicateDraftQuiz } =
    useQuizBuilder();

  const [deleteQuizIndex, setDeleteQuizIndex] = useState<number | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const openDeleteDialog = (index: number) => {
    setDeleteQuizIndex(index);
    setIsDeleteDialogOpen(true);
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
    const quizzesCopy = [...draftQuizzes];
    quizzesCopy[quizIdx].choices[choiceIdx] = e.currentTarget.innerText;
    setDraftQuizzes(quizzesCopy);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLES CHECKBOX CHANGE
   * @param quizIdx - The index of the quiz.
   * @param choiceIdx - The index of the choice.
   * @summary
   * Handles the change of the checkbox.
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleCheckBoxChange = (quizIdx: number, choiceIdx: number) => {
    const quizzesCopy = [...draftQuizzes];
    const { correctAnswers } = quizzesCopy[quizIdx];

    quizzesCopy[quizIdx].correctAnswers = correctAnswers.includes(quizzesCopy[quizIdx].choices[choiceIdx])
      ? correctAnswers.filter(answer => answer !== quizzesCopy[quizIdx].choices[choiceIdx])
      : [...correctAnswers, quizzesCopy[quizIdx].choices[choiceIdx]];

    setDraftQuizzes(quizzesCopy);
  };

  return (
    <>
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete question?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your question.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteDraftQuiz(deleteQuizIndex)}
              className='text-secondary-foreground-foreground bg-tc-destructive'
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className='mb-10 flex flex-col gap-12'>
        {draftQuizzes.map((quiz, quizIdx) => {
          const { question, correctAnswers, choices } = quiz;
          return (
            <div key={quizIdx} className='flex flex-col gap-4'>
              <Card>
                <CardHeader className='flex-row gap-2 space-y-0'>
                  <div className='flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                    {quizIdx + 1}
                  </div>

                  <ContentEditable
                    html={question}
                    onChange={e => handleQuestionChange(e, quizIdx)}
                    className='w-full break-all rounded-sm text-xl font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                  />
                </CardHeader>

                <CardContent>
                  <div className={cn(`flex flex-col  gap-4`)}>
                    {choices.map((choice, choiceIdx) => (
                      <div
                        key={choiceIdx}
                        className={cn(
                          `flex flex-row items-center gap-2 rounded-md
                          bg-secondary px-4 py-2 text-secondary-foreground shadow-sm hover:bg-secondary/80`
                        )}
                      >
                        <button onClick={() => handleCheckBoxChange(quizIdx, choiceIdx)}>
                          {correctAnswers?.includes(choice) ? (
                            <CheckboxChecked className='h-5 w-5' />
                          ) : (
                            <CheckboxEmpty className='h-5 w-5' />
                          )}
                        </button>

                        <ContentEditable
                          html={choice}
                          onChange={e => handleChoiceChange(e, quizIdx, choiceIdx)}
                          className='w-full break-all rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className='justify-end gap-2'>
                  <Button variant='outline' size='icon' onClick={() => duplicateDraftQuiz(quizIdx)}>
                    <span className='sr-only'>Copy</span>
                    <Copy />
                  </Button>
                  <Button variant='outline' size='icon' onClick={() => openDeleteDialog(quizIdx)}>
                    <span className='sr-only'>Delete</span>
                    <Trash />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        })}

        <div className='flex justify-end'>
          <Button onClick={addDraftQuiz}>Add a question</Button>
        </div>
      </div>
    </>
  );
};

export default QuizBuilder;
