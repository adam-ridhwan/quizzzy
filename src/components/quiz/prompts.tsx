import { Choices, CorrectAnswer, Question } from '@/types/quiz-types';
import { cn } from '@/lib/utils';
import useQuiz from '@/hooks/use-quiz';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CheckboxChecked from '@/components/ui/icons/checkbox-checked';
import CheckboxEmpty from '@/components/ui/icons/checkbox-empty';
import LoadingSpinner from '@/components/ui/icons/spinner';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import H2 from '@/components/ui/typography/h2';

const Prompts = () => {
  const {
    quizzes,
    currentQuizIndex,
    progress,
    isLoading,
    handleNavigateBackward,
    handleNavigateForward,
    handleSelect,
    handleSubmit,
  } = useQuiz();

  let question: Question = '';
  let correctAnswers: CorrectAnswer = [];
  let choices: Choices = [];
  let selectedAnswers: Choices | undefined = [];

  const currentQuestion = quizzes[currentQuizIndex];

  if (currentQuestion) {
    ({ question, correctAnswers, choices, selectedAnswers } = quizzes[currentQuizIndex]);
  }

  return (
    <>
      <>
        <Badge variant='outline' className='w-max'>
          {correctAnswers.length > 1 ? 'Multiple response' : 'Single response'}
        </Badge>

        <H2>{question}</H2>

        <Progress value={progress} />

        <Separator className='my-2' />

        {choices.map(choice => (
          <Button
            key={choice}
            variant='secondary'
            onClick={() => handleSelect(choice)}
            className={cn(`gap-2`, {
              'ring-offset ring-2 ring-primary/30': selectedAnswers?.includes(choice),
            })}
          >
            {selectedAnswers?.includes(choice) ? <CheckboxChecked /> : <CheckboxEmpty />}
            <span className='w-full text-left'>{choice}</span>
          </Button>
        ))}

        <div className='mt-5 flex flex-row justify-between'>
          <Button disabled={isLoading || currentQuizIndex === 0} onClick={handleNavigateBackward}>
            Previous
          </Button>

          {currentQuizIndex === quizzes.length - 1 ? (
            <Button
              disabled={isLoading || quizzes[currentQuizIndex]?.selectedAnswers?.length === 0}
              onClick={handleSubmit}
              className='w-20'
            >
              {isLoading ? <LoadingSpinner /> : 'Submit'}
            </Button>
          ) : (
            <Button
              disabled={quizzes[currentQuizIndex]?.selectedAnswers?.length === 0}
              onClick={handleNavigateForward}
            >
              Next
            </Button>
          )}
        </div>
      </>
    </>
  );
};

export default Prompts;
