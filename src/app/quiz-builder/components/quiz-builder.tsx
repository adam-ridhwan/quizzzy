'use client';

import type { PropsWithChildren } from 'react';
import React, { useState } from 'react';
import type { DropAnimation } from '@dnd-kit/core';
import { defaultDropAnimationSideEffects, DragOverlay } from '@dnd-kit/core';

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
import { SortableQuestionList } from '@/app/quiz-builder/components/sortable-question-list';

const QuizBuilder = () => {
  const { resetDraftQuiz, addDraftQuiz } = useQuizBuilder();

  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const openResetDialog = () => setIsResetDialogOpen(true);

  return (
    <>
      <SortableQuestionList />

      <div>
        <Button onClick={openResetDialog}>Reset</Button>
        <Button onClick={addDraftQuiz}>Add a question</Button>
      </div>

      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-balance'>
              Are you sure you want to reset your quiz?
            </AlertDialogTitle>
            <AlertDialogDescription className='text-balance'>
              This action cannot be undone. All questions will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={resetDraftQuiz} className='bg-tc-destructive text-white'>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default QuizBuilder;

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
};

interface Props {}

export function SortableOverlay({ children }: PropsWithChildren<Props>) {
  return <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>;
}
