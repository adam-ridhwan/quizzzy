import React, { useState } from 'react';
import CheckboxChecked from '@/icons/checkbox-checked';
import CheckboxEmpty from '@/icons/checkbox-empty';
import { Copy } from '@/icons/copy';
import { DragHandle } from '@/icons/drag-handle';
import { Trash } from '@/icons/trash';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ContentEditable from 'react-contenteditable';

import { Quiz } from '@/types/quiz-types';
import { cn } from '@/lib/utils';
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

type Props = {
  draftQuiz: Quiz;
  draftQuizIdx: number;
  className?: string;
};

export const SortableQuestionItem = ({ draftQuiz, draftQuizIdx, className }: Props) => {
  const { question, choices } = draftQuiz;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: draftQuiz._id });
  const {
    duplicateDraftQuiz,
    deleteDraftQuiz,
    handleQuestionChange,
    handleChoiceChange,
    handleCheckBoxChange,
  } = useQuizBuilder();

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const [deleteQuizIndex, setDeleteQuizIndex] = useState<number | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const openDeleteDialog = (index: number) => {
    setDeleteQuizIndex(index);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <div
        key={draftQuiz._id}
        ref={setNodeRef}
        style={style}
        className={cn(`flex flex-col gap-4`, className)}
      >
        <Card>
          <CardHeader className='flex-row gap-2 space-y-0'>
            <div className='flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground'>
              {draftQuizIdx + 1}
            </div>

            <ContentEditable
              html={question}
              data-placeholder='Enter a question'
              onChange={e => handleQuestionChange(e, draftQuizIdx)}
              className='editable w-full break-all rounded-sm text-xl font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
            />

            <Button variant='ghost' size='icon' {...attributes} {...listeners}>
              <DragHandle />
            </Button>
          </CardHeader>

          <CardContent>
            <div className={cn(`flex flex-col  gap-4`)}>
              {choices.map((choice, choiceIdx) => {
                return (
                  <div
                    key={choiceIdx}
                    className={cn(
                      `flex flex-row items-center gap-2 rounded-md
                    bg-secondary px-4 py-2 text-secondary-foreground shadow-sm hover:bg-secondary/80`
                    )}
                  >
                    <button onClick={() => handleCheckBoxChange(draftQuizIdx, choiceIdx)}>
                      {choice.isCorrect ? (
                        <CheckboxChecked className='h-5 w-5' />
                      ) : (
                        <CheckboxEmpty className='h-5 w-5' />
                      )}
                    </button>

                    <ContentEditable
                      html={choice.choice}
                      data-placeholder={`Choice ${choiceIdx + 1}`}
                      onChange={e => handleChoiceChange(e, draftQuizIdx, choiceIdx)}
                      className='editable w-full break-all rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>

          <CardFooter className='justify-end gap-2'>
            <Button variant='outline' size='icon' onClick={() => duplicateDraftQuiz(draftQuizIdx)}>
              <span className='sr-only'>Copy</span>
              <Copy />
            </Button>
            <Button variant='outline' size='icon' onClick={() => openDeleteDialog(draftQuizIdx)}>
              <span className='sr-only'>Delete</span>
              <Trash />
            </Button>
          </CardFooter>
        </Card>
      </div>
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
              className='bg-tc-destructive text-white'
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
