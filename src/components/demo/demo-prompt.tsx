import { useEffect, useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';

import { Choices, CorrectAnswer, Question } from '@/types/quiz-types';
import { cn } from '@/lib/utils';
import useQuiz from '@/hooks/use-quiz';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select';
import H2 from '@/components/ui/typography/h2';

const DemoPrompt = () => {
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
    handleReset,
  } = useQuiz();

  let question: Question = '';
  let correctAnswers: CorrectAnswer = [];
  let choices: Choices = [];
  let selectedAnswers: Choices | undefined = [];

  const currentQuestion = quizzes[currentQuizIndex];
  const isFirstQuestion = currentQuizIndex === 0;
  const isLastQuestion = currentQuizIndex === quizzes.length - 1;
  const isQuizFinished = quizzes.every(quiz => (quiz?.selectedAnswers?.length || 0) > 0);

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (currentQuestion) {
    ({ question, correctAnswers, choices, selectedAnswers } = quizzes[currentQuizIndex]);
  }

  const handleJumpToQuestion = (index: number) => () => setCurrentQuizIndex(index);

  const handleConfirmSubmission = () => setIsDialogOpen(true);

  useEffectOnce(() => handleReset());

  return (
    <>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ready to submit?</AlertDialogTitle>
            <AlertDialogDescription>
              Once submitted, you won&apos;t be able to change your answers
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className='mb-10 flex w-full max-w-lg flex-col gap-4 pt-4 sm:justify-center'>
        <Card className='flex flex-1 flex-col gap-4 p-6 sm:h-[350px] sm:flex-initial'>
          <div className='flew-row flex items-center justify-between'>
            <Badge variant='outline' className='w-max gap-1'>
              {correctAnswers.length > 1 ? 'Multiple responses' : 'Single response'}
              {correctAnswers.length > 1 ? <CheckboxMultiple /> : <CheckboxChecked className='h-2 w-2' />}
            </Badge>

            <Select open={isSelectOpen} onOpenChange={setIsSelectOpen}>
              <SelectTrigger className='focus:ring-none h-[22px] w-max gap-2 border-none p-0 text-sm text-muted-foreground shadow-none focus:ring-0'>
                {`Question ${currentQuizIndex + 1} of ${quizzes.length}`}
              </SelectTrigger>

              <SelectContent align='end'>
                <ScrollArea type='always' className={cn(``, { 'h-[200px] pr-3': quizzes.length > 5 })}>
                  <div className='flex flex-col'>
                    {quizzes.map((quiz, index) => (
                      <Button
                        key={index}
                        variant='ghost'
                        onClick={handleJumpToQuestion(index)}
                        className={cn(`gap-2`, {
                          'text-muted-foreground': (quiz.selectedAnswers?.length ?? 0) > 0,
                        })}
                      >
                        {quiz.selectedAnswers?.length ? <CheckboxChecked /> : <CheckboxEmpty />}
                        <span className='w-full text-left'>Question {index + 1}</span>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>

          <Progress value={progress} />

          <div className='flex flex-1 items-center'>
            <H2>{question}</H2>
          </div>

          <div className={cn('flex justify-end gap-4')}>
            <button disabled={isLoading || isFirstQuestion} onClick={handleNavigateBackward}>
              <ArrowSquareLeft
                className={cn(`h-9 w-9`, { 'fill-muted-foreground': isLoading || isFirstQuestion })}
              />
            </button>

            <button disabled={isLoading || isLastQuestion} onClick={handleNavigateForward}>
              <ArrowSquareRight
                className={cn(`h-9 w-9`, { 'fill-muted-foreground': isLoading || isLastQuestion })}
              />
            </button>
          </div>
        </Card>

        <div className='flex flex-col gap-4'>
          {choices.map(choice => (
            <Button
              key={choice}
              variant='secondary'
              onClick={() => handleSelect(choice)}
              className={cn(`h-12 gap-2 sm:h-20`, {
                'ring-offset ring-2 ring-primary/50': selectedAnswers?.includes(choice),
              })}
            >
              {selectedAnswers?.includes(choice) ? <CheckboxChecked /> : <CheckboxEmpty />}
              <span className='w-full text-left'>{choice}</span>
            </Button>
          ))}
        </div>

        <div className='mt-4 h-9'>
          <Button
            disabled={isLoading || !isQuizFinished}
            onClick={handleConfirmSubmission}
            className={cn('w-full')}
          >
            {isLoading ? <LoadingSpinner /> : 'Submit'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default DemoPrompt;
