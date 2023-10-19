import { Fragment } from 'react';

import { Choices } from '@/types/quiz-types';
import { cn } from '@/lib/utils';
import useQuiz from '@/hooks/use-quiz';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CheckboxChecked from '@/components/ui/icons/checkbox-checked';
import CheckboxEmpty from '@/components/ui/icons/checkbox-empty';
import CircleError from '@/components/ui/icons/circle-error';
import CircleSuccess from '@/components/ui/icons/circle-success';
import { Separator } from '@/components/ui/separator';
import H2 from '@/components/ui/typography/h2';

const CORRECT_ANSWER = true;
const WRONG_ANSWER = false;

type Evaluation = typeof CORRECT_ANSWER | typeof WRONG_ANSWER;

const Results = () => {
  const { quizzes, score, handleReset } = useQuiz();

  const checkAnswers = (correctAnswers: Choices, selectedAnswers: Choices) => {
    const renderEvaluation = (evaluation: Evaluation, message: string) => {
      const Icon = evaluation ? CircleSuccess : CircleError;
      const textColor = evaluation ? 'text-tc-success' : 'text-tc-destructive';

      return (
        <div className='flex flex-row items-center gap-1'>
          <Icon />
          <span className={`${textColor} text-md`}>{message}</span>
        </div>
      );
    };

    const correctAnswersCount = selectedAnswers.filter(answer => correctAnswers.includes(answer)).length;

    // multiple response
    if (correctAnswers.length > 1) {
      if (correctAnswersCount < correctAnswers.length) {
        return renderEvaluation(
          WRONG_ANSWER,
          `Only ${correctAnswersCount} out of ${correctAnswers.length} correct.`
        );
      }

      if (selectedAnswers.length > correctAnswers.length) {
        return renderEvaluation(WRONG_ANSWER, `There were only ${correctAnswers.length} correct answers.`);
      }
    }

    // single response
    if (correctAnswers[0] !== selectedAnswers[0]) {
      return renderEvaluation(WRONG_ANSWER, 'Wrong answer.');
    }

    return renderEvaluation(CORRECT_ANSWER, 'Correct answer.');
  };

  return (
    <>
      <H2>Quiz complete!</H2>
      <span>Your score is {score}</span>

      <Button onClick={handleReset}>Try again</Button>

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
    </>
  );
};

export default Results;
