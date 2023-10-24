import React, { useRef, useState } from 'react';
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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type Props = {
  quizId: string;
};

export const DeleteQuestionButton = ({ quizId }: Props) => {
  const { deleteDraftQuiz } = useQuizBuilder();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const questionToDelete = useRef<string>('');

  const handleOpenDeleteDialog = (quizId: string) => {
    setIsDeleteDialogOpen(true);
    questionToDelete.current = quizId;
  };

  return (
    <>
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this question?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the question.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant='destructive' onClick={() => deleteDraftQuiz(questionToDelete.current)}>
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button variant='outline' size='icon' onClick={() => handleOpenDeleteDialog(quizId)}>
        <span className='sr-only'>Delete</span>
        <Trash />
      </Button>
    </>
  );
};
