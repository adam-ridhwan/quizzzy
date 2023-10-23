import { Fragment } from 'react';
import { useEffectOnce } from 'usehooks-ts';

import { Choices } from '@/types/quiz-types';
import { cn } from '@/lib/utils';
import useQuiz from '@/hooks/use-quiz';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import ArrowCircle from '@/components/ui/icons/arrow-circle';
import CheckboxChecked from '@/components/ui/icons/checkbox-checked';
import CheckboxEmpty from '@/components/ui/icons/checkbox-empty';
import CircleError from '@/components/ui/icons/circle-error';
import CircleSuccess from '@/components/ui/icons/circle-success';
import { Separator } from '@/components/ui/separator';
import H1 from '@/components/ui/typography/h1';
import H2 from '@/components/ui/typography/h2';
import H3 from '@/components/ui/typography/h3';

const CORRECT_ANSWER = true;
const WRONG_ANSWER = false;

type Evaluation = typeof CORRECT_ANSWER | typeof WRONG_ANSWER;

const DemoResults = () => {
  const { quizzes, score, handleReset } = useQuiz();

  const checkAnswers = (correctAnswers: Choices, selectedAnswers: Choices) => {
    const renderEvaluation = (evaluation: Evaluation, message: string) => {
      const Icon = evaluation ? CircleSuccess : CircleError;
      const textColor = evaluation ? 'text-tc-success' : 'text-tc-destructive';

      return (
        <div className='flex flex-row items-center gap-2'>
          <Icon />
          <span className={`${textColor} text-md`}>{message}</span>
        </div>
      );
    };

    const correctAnswersCount = selectedAnswers.filter(answer => correctAnswers.includes(answer)).length;

    // multiple response
    if (correctAnswers.length > 1) {
      if (correctAnswersCount === 0) {
        return renderEvaluation(WRONG_ANSWER, 'Wrong');
      }

      if (correctAnswersCount < correctAnswers.length) {
        return renderEvaluation(
          WRONG_ANSWER,
          `Only ${correctAnswersCount} out of ${correctAnswers.length} correct`
        );
      }

      if (selectedAnswers.length > correctAnswers.length) {
        return renderEvaluation(WRONG_ANSWER, `There were only ${correctAnswers.length} correct answers`);
      }
    }

    // single response
    if (correctAnswers[0] !== selectedAnswers[0]) {
      return renderEvaluation(WRONG_ANSWER, 'Wrong');
    }

    return renderEvaluation(CORRECT_ANSWER, 'Correct');
  };

  return (
    <>
      <div className='mb-20 flex w-full max-w-lg flex-col gap-4 pt-10 '>
        <Card>
          <CardHeader>
            <H1>Quiz complete!</H1>
            <H3 className='font-medium text-muted-foreground'>
              {`You answered ${score} out of ${quizzes.length} correct`}
            </H3>
          </CardHeader>

          <CardContent className='flex justify-center'>
            <div className='flex aspect-square w-32 items-center justify-center rounded-lg border-4 border-border'>
              <span className='text-4xl'>{Math.floor((score / quizzes.length) * 100)}%</span>
            </div>
          </CardContent>

          <CardFooter className='flex justify-end'>
            <Button onClick={handleReset} className='flex flex-row gap-1 text-primary-foreground'>
              <ArrowCircle className='fill-primary-foreground' />
              <span>Try again</span>
            </Button>
          </CardFooter>
        </Card>

        <div className='flex flex-col gap-4'>
          {quizzes.map(quiz => {
            const { question, correctAnswers, choices } = quiz;
            const selectedAnswers = quiz.selectedAnswers ?? [];

            return (
              <Fragment key={quiz._id}>
                <Separator className='my-8' />

                <div className='flex flex-col gap-4'>
                  <Badge variant='outline' className='w-max'>
                    {correctAnswers.length > 1 ? 'Multiple response' : 'Single response'}
                  </Badge>

                  <H2>{question}</H2>

                  {checkAnswers(correctAnswers, selectedAnswers)}

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
                          { 'bg-destructive': isSelected && !isCorrect }
                        )}
                      >
                        {selectedAnswers.includes(choice) ? <CheckboxChecked /> : <CheckboxEmpty />}
                        <span className='w-full text-left'>{choice}</span>
                      </div>
                    );
                  })}
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DemoResults;
