'use client';

import React from 'react';
import { Plus } from '@/icons/plus';

import { useQuizBuilder } from '@/hooks/use-quiz-builder';
import { Button } from '@/components/ui/button';

export const AddQuizButton = () => {
  const { addDraftQuiz } = useQuizBuilder();
  return (
    <>
      <Button variant='outline' onClick={addDraftQuiz} className='gap-1 text-lg text-muted-foreground'>
        <Plus />
        Add
      </Button>
    </>
  );
};
