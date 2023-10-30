'use client';

import React, { useState } from 'react';
import ArrowCircle from '@/icons/arrow-circle';
import { ThreeDotsVertical } from '@/icons/three-dots-vertical';
import { Trash } from '@/icons/trash';

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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const ResetQuizButton = () => {
  const { draftQuizzes, resetDraftQuiz } = useQuizBuilder();

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

      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' size='icon' disabled={draftQuizzes.length === 0}>
            <ThreeDotsVertical />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-max'>
          <Button onClick={() => setIsResetDialogOpen(true)} className='gap-1'>
            <ArrowCircle className='h-4 w-4 fill-primary-foreground' />
            Reset quiz
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
};
