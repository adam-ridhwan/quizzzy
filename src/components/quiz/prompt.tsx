import { Fragment, useState } from 'react';

import { Choices, CorrectAnswer, Question } from '@/types/quiz-types';
import { cn } from '@/lib/utils';
import useQuiz from '@/hooks/use-quiz';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ArrowSquareLeft from '@/components/ui/icons/arrow-square-left';
import ArrowSquareRight from '@/components/ui/icons/arrow-square-right';
import CheckboxChecked from '@/components/ui/icons/checkbox-checked';
import CheckboxEmpty from '@/components/ui/icons/checkbox-empty';
import CheckboxMultiple from '@/components/ui/icons/checkbox-multiple';
import LoadingSpinner from '@/components/ui/icons/spinner';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select';
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
  const isFirstQuestion = currentQuizIndex === 0;
  const isLastQuestion = currentQuizIndex === quizzes.length - 1;
  const isQuizFinished = isLastQuestion && quizzes.every(quiz => (quiz?.selectedAnswers?.length || 0) > 0);

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  if (currentQuestion) {
    ({ question, correctAnswers, choices, selectedAnswers } = quizzes[currentQuizIndex]);
  }

  const handleJumpToQuestion = (index: number) => () => {
    setCurrentQuizIndex(index);
    setIsSelectOpen(false);
  };

  return (
    <>
      <div className='mb-20 flex w-full max-w-lg flex-col gap-4 pt-10 '>
        <Card className='flex flex-1 flex-col gap-4 p-6'>
          <div className='flew-row flex items-center justify-between'>
            <Select open={isSelectOpen} onOpenChange={setIsSelectOpen}>
              <SelectTrigger className='focus:ring-none h-[22px] w-max gap-2 border-none p-0 text-sm text-muted-foreground shadow-none focus:ring-0'>
                {`Question ${currentQuizIndex + 1} of ${quizzes.length}`}
              </SelectTrigger>
              <SelectContent className='min-w-max p-0'>
                <div className='flex flex-col'>
                  {quizzes.map((_, index) => (
                    <Button key={index} variant='ghost' onClick={handleJumpToQuestion(index)}>
                      Question {index + 1}
                    </Button>
                  ))}
                </div>
              </SelectContent>
            </Select>

            <Badge variant='outline' className='w-max gap-1'>
              {correctAnswers.length > 1 ? 'Multiple response' : 'Single response'}
              {correctAnswers.length > 1 ? <CheckboxMultiple /> : <CheckboxChecked className='h-2 w-2' />}
            </Badge>
          </div>

          <Progress value={progress} />

          <div className='flex flex-1 items-center'>
            <H2>{question}</H2>
          </div>
        </Card>

        <div className='flex flex-col gap-4'>
          {choices.map(choice => (
            <Button
              key={choice}
              variant='secondary'
              onClick={() => handleSelect(choice)}
              className={cn(`h-12 gap-2`, {
                'ring-offset ring-2 ring-primary/30': selectedAnswers?.includes(choice),
              })}
            >
              {selectedAnswers?.includes(choice) ? <CheckboxChecked /> : <CheckboxEmpty />}
              <span className='w-full text-left'>{choice}</span>
            </Button>
          ))}
        </div>

        <div className='flex justify-between'>
          <div className={cn('flex  gap-4')}>
            <button disabled={isLoading || isFirstQuestion} onClick={handleNavigateBackward}>
              <ArrowSquareLeft className={cn(`h-9 w-9`, { 'fill-muted-foreground': isFirstQuestion })} />
            </button>

            <button disabled={isLoading || isLastQuestion} onClick={handleNavigateForward}>
              <ArrowSquareRight className={cn(`h-9 w-9`, { 'fill-muted-foreground': isLastQuestion })} />
            </button>
          </div>

          <Button
            disabled={!isQuizFinished}
            onClick={handleSubmit}
            className={cn({ hidden: !isQuizFinished })}
          >
            {isLoading ? <LoadingSpinner /> : 'Submit'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Prompt;
