import { Fragment } from 'react';

import { cn } from '@/lib/utils';
import useQuiz from '@/hooks/use-quiz';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CheckboxChecked from '@/components/ui/icons/checkbox-checked';
import CheckboxEmpty from '@/components/ui/icons/checkbox-empty';
import ErrorCircle from '@/components/ui/icons/error-circle';
import { Separator } from '@/components/ui/separator';
import H2 from '@/components/ui/typography/h2';
import H3 from '@/components/ui/typography/h3';
import H4 from '@/components/ui/typography/h4';

const Results = () => {
  const { quizzes, score, handleReset } = useQuiz();

  return (
    <>
      <H2>Quiz complete!</H2>
      <span>Your score is {score}</span>

      <Button onClick={handleReset}>Try again</Button>

      <div className='flex flex-col gap-4'>
        {quizzes.map(quiz => {
          const { question, correctAnswers, choices } = quiz;
          const selectedAnswers = quiz.selectedAnswers ?? [];

          const correctSelectedCount = selectedAnswers.filter(answer =>
            correctAnswers.includes(answer)
          ).length;

          const isSingleResponseCorrect = correctAnswers[0] === selectedAnswers[0];

          return (
            <Fragment key={quiz._id}>
              <Separator className='my-8' />

              <div className='flex flex-col gap-4'>
                <div className='flex flex-col justify-center'>
                  <Badge variant='outline' className='w-max'>
                    {correctAnswers.length > 1 ? 'Multiple response' : 'Single response'}
                  </Badge>

                  {correctAnswers.length > 1 && correctSelectedCount !== correctAnswers.length && (
                    <div className='mt-4 flex flex-row items-center gap-2'>
                      <ErrorCircle />
                      <span className='text-sm text-red-500'>
                        {`${correctSelectedCount} out of ${correctAnswers.length} correct`}
                      </span>
                    </div>
                  )}

                  {correctAnswers.length === 1 && !isSingleResponseCorrect && (
                    <div className='mt-4 flex flex-row items-center gap-2'>
                      <ErrorCircle />
                      <span className='text-sm text-red-500'>{`Wrong`}</span>
                    </div>
                  )}
                </div>

                <H2>{question}</H2>
                {choices.map(choice => {
                  const isSelected = selectedAnswers.includes(choice);
                  const isCorrect = correctAnswers.includes(choice);

                  return (
                    <div
                      key={choice}
                      className={cn(
                        `inline-flex h-9 items-center justify-center gap-2 rounded-md bg-secondary px-4 
                        py-2 text-sm font-medium text-secondary-foreground shadow-sm`,
                        { 'bg-success': isSelected && isCorrect },
                        { 'bg-destructive/50': isSelected && !isCorrect }
                      )}
                    >
                      {selectedAnswers.includes(choice) ? <CheckboxChecked /> : <CheckboxEmpty />}
                      <span className='w-full text-left'>{choice}</span>
                    </div>
                  );
                })}
              </div>

              <div className='mt-4 '></div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Results;
