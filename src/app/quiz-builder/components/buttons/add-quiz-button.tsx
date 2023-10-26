'use client';

import React from 'react';
import { Plus } from '@/icons/plus';

import { useQuizBuilder } from '@/hooks/use-quiz-builder';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const AddQuizButton = () => {
  const { addDraftQuiz } = useQuizBuilder();
  return (
    <>
      <div className='grid grid-cols-8 flex-row items-center gap-2 '>
        <Separator className='col-start-3' />
        <Button variant='secondary' onClick={addDraftQuiz} className='col-span-2 gap-1 text-sm text-primary'>
          <Plus />
          Add
        </Button>
        <Separator />
      </div>
    </>
  );
};
