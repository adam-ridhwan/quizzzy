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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
      <Popover open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' size='icon' onClick={() => handleOpenDeleteDialog(quizId)}>
            <span className='sr-only'>Delete</span>
            <Trash />
          </Button>
        </PopoverTrigger>

        <PopoverContent sticky='always' className='mx-2 flex flex-col gap-6'>
          <div className='flex flex-row items-center gap-4'>
            <div className='min-h-16 min-w-16 rounded-full bg-secondary p-3'>
              <Trash className='h-7 w-7' />
            </div>
            <div>
              <span>Are you sure you want to delete this question?</span>
            </div>
          </div>

          <div className='flex flex-row items-center justify-end gap-2'>
            <Button variant='outline' size='sm' onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button size='sm' onClick={() => deleteDraftQuiz(questionToDelete.current)}>
              Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
