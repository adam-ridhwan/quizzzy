'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import CheckboxChecked from '@/icons/checkbox-checked';
import CheckboxEmpty from '@/icons/checkbox-empty';
import { Copy } from '@/icons/copy';
import { useAtomValue } from 'jotai';
import ContentEditable from 'react-contenteditable';
import { useEffectOnce } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { useQuizBuilder } from '@/hooks/use-quiz-builder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DeleteQuestionButton } from '@/app/quiz-builder/components/buttons/delete-question-button';
import { activeAtom, SortableList } from '@/app/quiz-builder/components/sortable-list/sortable-list';

export default function QuizBuilder() {
  const active = useAtomValue(activeAtom);
  const {
    draftQuizzes,
    setDraftQuizzes,
    handleQuestionChange,
    handleCheckBoxChange,
    handleChoiceChange,
    duplicateDraftQuiz,
  } = useQuizBuilder();

  const isDraftQuizzesEmpty = draftQuizzes.length === 0;

  const renderCheckboxLabel = (isCorrect: boolean) => {
    return isCorrect ? <CheckboxChecked className='h-5 w-5' /> : <CheckboxEmpty className='h-5 w-5' />;
  };

  return (
    <>
      <SortableList
        items={draftQuizzes}
        onChange={setDraftQuizzes}
        renderItem={draftQuiz => {
          const { question, choices } = draftQuiz;

          return (
            <>
              <SortableList.Item id={draftQuiz.id}>
                <Card
                  className={cn('flex min-h-fit w-full flex-row', {
                    'shadow-lg': draftQuiz.id === active?.id,
                  })}
                >
                  <div className='flex flex-1 flex-col'>
                    <CardHeader className='flex-row items-center gap-2 space-y-0'>
                      <div className='flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                        {draftQuizzes.indexOf(draftQuiz) + 1}
                      </div>

                      <ContentEditable
                        html={question}
                        data-placeholder='Enter a question'
                        onChange={e => handleQuestionChange(e, draftQuiz.id)}
                        className='editable h-max w-full break-all rounded-sm text-xl font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                      />

                      <SortableList.DragHandle />
                    </CardHeader>

                    <CardContent className='flex flex-col gap-4 '>
                      {choices.map((choice, choiceIdx) => {
                        return (
                          <div
                            key={choiceIdx}
                            className={cn(
                              `flex flex-row items-center gap-2 rounded-md bg-secondary px-4 py-2 
                              text-secondary-foreground shadow-sm hover:bg-secondary/80`
                            )}
                          >
                            <button onClick={() => handleCheckBoxChange(draftQuiz.id, choice.id)}>
                              {renderCheckboxLabel(choice.isCorrect)}
                            </button>

                            <ContentEditable
                              html={choice.choice}
                              data-placeholder={`Choice ${choiceIdx + 1}`}
                              onChange={e => handleChoiceChange(e, draftQuiz.id, choice.id)}
                              className='editable w-full break-all rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                            />
                          </div>
                        );
                      })}
                    </CardContent>

                    <CardFooter className='justify-end gap-2'>
                      <Button variant='outline' size='icon' onClick={() => duplicateDraftQuiz(draftQuiz.id)}>
                        <span className='sr-only'>Copy</span>
                        <Copy />
                      </Button>
                      <DeleteQuestionButton quizId={draftQuiz.id} />
                    </CardFooter>
                  </div>
                </Card>
              </SortableList.Item>
            </>
          );
        }}
      />

      <div className='flex w-full items-center justify-center'>
        {isDraftQuizzesEmpty && (
          <Image
            src='/bear-empty.png'
            alt='empty'
            width={500}
            height={500}
            className='rounded-lg border-4 border-muted-foreground'
          />
        )}
      </div>
    </>
  );
}
