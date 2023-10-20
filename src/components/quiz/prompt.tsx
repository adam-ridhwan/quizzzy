import { Fragment, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Choices, CorrectAnswer, Question } from '@/types/quiz-types';
import { cn } from '@/lib/utils';
import useQuiz from '@/hooks/use-quiz';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CheckboxChecked from '@/components/ui/icons/checkbox-checked';
import CheckboxEmpty from '@/components/ui/icons/checkbox-empty';
import CheckboxMultiple from '@/components/ui/icons/checkbox-multiple';
import LoadingSpinner from '@/components/ui/icons/spinner';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import H2 from '@/components/ui/typography/h2';

const Prompt = () => {
  const {
    quizzes,
    currentQuizIndex,
    setCurrentQuizIndex,
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
  const isLastQuestion = currentQuizIndex === quizzes.length - 1;
  const isQuizFinished = isLastQuestion && !quizzes.every(quiz => (quiz?.selectedAnswers?.length || 0) > 0);

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  if (currentQuestion) {
    ({ question, correctAnswers, choices, selectedAnswers } = quizzes[currentQuizIndex]);
  }

  const getButtonLabel = () => {
    if (isLoading) return <LoadingSpinner />;
    if (isLastQuestion) return 'Submit';
    return 'Next';
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <Badge variant='outline' className='w-max gap-1'>
          {correctAnswers.length > 1 ? 'Multiple response' : 'Single response'}
          {correctAnswers.length > 1 ? <CheckboxMultiple /> : <CheckboxChecked className='h-2 w-2' />}
        </Badge>

        <Select open={isSelectOpen} onOpenChange={setIsSelectOpen}>
          <SelectTrigger className='focus:ring-none w-max gap-2 border-none text-muted-foreground focus:ring-0'>
            {`Question ${currentQuizIndex + 1} of ${quizzes.length}`}
          </SelectTrigger>
          <SelectContent className='min-w-max'>
            <div className='flex flex-col'>
              {quizzes.map((_, index) => (
                <Button
                  key={index}
                  variant='ghost'
                  onClick={() => {
                    setCurrentQuizIndex(index);
                    setIsSelectOpen(false);
                  }}
                >
                  Question {index + 1}
                </Button>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>

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

      <div className={cn('mt-auto grid grid-cols-2 gap-4 md:mt-5')}>
        <Button
          variant='outline'
          disabled={isLoading}
          onClick={handleNavigateBackward}
          className={cn('col-span-1', { hidden: currentQuizIndex === 0 })}
        >
          Back
        </Button>

        <Button
          disabled={isLoading || isQuizFinished}
          onClick={isLastQuestion ? handleSubmit : handleNavigateForward}
          className='col-span-1 col-end-3'
        >
          {getButtonLabel()}
        </Button>
      </div>
    </>
  );
};

export default Prompt;
