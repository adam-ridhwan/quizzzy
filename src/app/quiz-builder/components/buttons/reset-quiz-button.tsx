'use client';

import React, { useState } from 'react';
import { ThreeDotsVertical } from '@/icons/three-dots-vertical';

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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export const ResetQuizButton = () => {
  const { resetDraftQuiz } = useQuizBuilder();

  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  return (
    <>
      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to reset your quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete ALL questions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild className=''>
              <Button variant='destructive' onClick={resetDraftQuiz}>
                Confirm
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button variant='ghost' size='icon' onClick={() => setIsResetDialogOpen(true)} className=''>
        <ThreeDotsVertical />
      </Button>
    </>
  );
};
