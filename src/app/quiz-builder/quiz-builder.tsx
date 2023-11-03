'use client';

import React from 'react';
import Image from 'next/image';
import CheckboxChecked from '@/icons/checkbox-checked';
import CheckboxEmpty from '@/icons/checkbox-empty';
import { Copy } from '@/icons/copy';
import { Plus } from '@/icons/plus';
import H3 from '@/typography/h3';
import { useAtomValue } from 'jotai';
import ContentEditable from 'react-contenteditable';

import { cn } from '@/lib/utils';
import { useQuizBuilder } from '@/hooks/use-quiz-builder';
import { widthAtom } from '@/hooks/use-sortable-width';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { AddQuizButton } from '@/app/quiz-builder/components/buttons/add-quiz-button';
import { DeleteQuestionButton } from '@/app/quiz-builder/components/buttons/delete-question-button';
import { activeAtom, SortableList } from '@/app/quiz-builder/components/sortable-list/sortable-list';

const PADDING = 50;

export default function QuizBuilder() {
  const active = useAtomValue(activeAtom);
  const width = useAtomValue(widthAtom);

  const {
    draftQuizzes,
    setDraftQuizzes,
    handleQuestionChange,
    handleCheckBoxChange,
    handleChoiceChange,
    duplicateDraftQuiz,
  } = useQuizBuilder();

  const isDraftQuizzesEmpty = draftQuizzes?.quizzes?.length === 0;

  console.log(draftQuizzes);

  const renderCheckboxLabel = (isCorrect: boolean) => {
    return isCorrect ? <CheckboxChecked className='h-5 w-5' /> : <CheckboxEmpty className='h-5 w-5' />;
  };

  if (isDraftQuizzesEmpty) {
    return (
      <div className='flex w-full items-center justify-center'>
        <Image
          priority
          src='/bear-empty.png'
          alt='empty'
          width={500}
          height={500}
          className='rounded-lg border-4 border-muted-foreground'
        />
      </div>
    );
  }

  if (!draftQuizzes || !draftQuizzes.quizzes) return;

  const setNewDraftQuizzes = (newQuizzes: []) => {
    setDraftQuizzes({
      ...draftQuizzes,
      quizzes: newQuizzes,
    });
  };

  return (
    <>
      <SortableList
        items={draftQuizzes.quizzes}
        onChange={setNewDraftQuizzes}
        renderItem={draftQuiz => {
          const { id, question, choices } = draftQuiz;

          return (
            <SortableList.Item id={id}>
              <Card className={cn('flex w-full', { 'shadow-2xl': id === active?.id })}>
                <div className='flex flex-1 flex-col'>
                  <CardHeader className='flex-row items-center justify-between gap-2 space-y-0 py-3'>
                    <span className='text-lg text-muted-foreground'>{`Question ${
                      draftQuizzes?.quizzes.indexOf(draftQuiz) + 1
                    }`}</span>

                    <div className='flex flex-row items-center gap-2'>
                      <Button variant='outline' size='icon' onClick={() => duplicateDraftQuiz(id)}>
                        <span className='sr-only'>Copy</span>
                        <Copy />
                      </Button>
                      <DeleteQuestionButton quizId={id} />
                      <SortableList.DragHandle />
                    </div>
                  </CardHeader>

                  <CardContent className='flex flex-col gap-4'>
                    <ContentEditable
                      html={question}
                      data-placeholder='Enter a question'
                      onChange={e => handleQuestionChange(e, id)}
                      tagName='p'
                      style={{ maxWidth: `${width - PADDING}px` }}
                      className='editable h-max break-words rounded-sm px-1 text-xl font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                    />

                    {choices.map((choice, choiceIdx) => {
                      return (
                        <div
                          key={choiceIdx}
                          className={cn(
                            `flex flex-row items-center gap-2 rounded-md bg-secondary px-4 py-2
                            text-secondary-foreground shadow-sm hover:bg-secondary/80`
                          )}
                        >
                          <button onClick={() => handleCheckBoxChange(id, choice.id)}>
                            {renderCheckboxLabel(choice.isCorrect)}
                          </button>

                          <ContentEditable
                            html={choice.choice}
                            data-placeholder={`Choice ${choiceIdx + 1}`}
                            onChange={e => handleChoiceChange(e, id, choice.id)}
                            style={{ maxWidth: `${width - PADDING - 32 - 20 - 8}px` }}
                            className='editable w-full break-words rounded-sm px-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                          />
                        </div>
                      );
                    })}
                  </CardContent>
                </div>
              </Card>
            </SortableList.Item>
          );
        }}
      />
    </>
  );
}
