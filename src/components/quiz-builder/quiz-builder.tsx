'use client';

import { useEffect, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import { Quiz } from '@/types/quiz-types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CheckboxChecked from '@/components/ui/icons/checkbox-checked';
import CheckboxEmpty from '@/components/ui/icons/checkbox-empty';
import H3 from '@/components/ui/typography/h3';

const DEFAULT_QUIZ: Quiz = {
  question: 'Write your question here',
  correctAnswers: ['Choice 1'],
  choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
};

const QuizBuilder = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([structuredClone(DEFAULT_QUIZ)]);

  const handleChange = (e: ContentEditableEvent, quizIdx: number, choiceIdx: number) => {
    const quizzesCopy = [...quizzes];
    quizzesCopy[quizIdx].choices[choiceIdx] = e.currentTarget.innerText;
    setQuizzes(quizzesCopy);
  };

  return (
    <>
      <div className='mb-10 flex flex-col gap-12'>
        {quizzes.map((quiz, quizIdx) => {
          const { question, correctAnswers, choices } = quiz;
          return (
            <div key={quizIdx} className='flex flex-col gap-4'>
              <Card>
                <CardHeader className='flex-row gap-2 space-y-0'>
                  <div className='flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                    {quizIdx + 1}
                  </div>
                  <H3 className='text-left'>{question}</H3>
                </CardHeader>

                <CardContent>
                  <div className={cn(`flex flex-col  gap-4`)}>
                    {choices.map((choice, choiceIdx) => (
                      <div
                        key={choiceIdx}
                        className={cn(
                          `flex flex-row items-center gap-2 rounded-md
                          bg-secondary px-4 py-2 text-secondary-foreground shadow-sm hover:bg-secondary/80`
                        )}
                      >
                        <button>
                          {correctAnswers?.includes(choice) ? (
                            <CheckboxChecked className='h-5 w-5' />
                          ) : (
                            <CheckboxEmpty className='h-5 w-5' />
                          )}
                        </button>

                        <ContentEditable
                          html={choice}
                          onChange={e => handleChange(e, quizIdx, choiceIdx)}
                          className='w-full break-all rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring '
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}

        <div className='flex justify-end'>
          <Button
            onClick={() => {
              setQuizzes([...quizzes, structuredClone(DEFAULT_QUIZ)]);
            }}
          >
            Add a question
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuizBuilder;
