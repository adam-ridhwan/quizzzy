import { useState } from 'react';
import ArrowLeft from '@/icons/arrow-left';
import ArrowRight from '@/icons/arrow-right';
import CheckboxChecked from '@/icons/checkbox-checked';
import CheckboxEmpty from '@/icons/checkbox-empty';
import CheckboxMultiple from '@/icons/checkbox-multiple';
import LoadingSpinner from '@/icons/spinner';
import H2 from '@/typography/h2';
import { useEffectOnce } from 'usehooks-ts';

import { Choices, Question } from '@/types/quiz-types';
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
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select';

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
  let choices: Choices = [];
  let selectedAnswers: string[] | undefined = [];

  const currentQuestion = quizzes.quizzes[currentQuizIndex];
  const isFirstQuestion = currentQuizIndex === 0;
  const isLastQuestion = currentQuizIndex === quizzes.quizzes.length - 1;
  const isQuizFinished = quizzes.quizzes.every(quiz => (quiz?.selectedAnswers?.length || 0) > 0);

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (currentQuestion) {
    ({ question, choices, selectedAnswers } = quizzes.quizzes[currentQuizIndex]);
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

      <div className={cn(`mb-10 flex w-full max-w-lg flex-col gap-4 pt-4 sm:justify-center`)}>
        <Card
          className={cn(`flex flex-1 flex-col gap-4 p-6 sm:h-[350px] sm:flex-initial`, {
            'pointer-events-none opacity-20': isLoading,
          })}
        >
          <div className='flew-row flex items-center justify-between'>
            <Badge variant='outline' className='flex w-max flex-row gap-1'>
              {choices.filter(choice => choice.isCorrect).length ? 'Multiple responses' : 'Single response'}
              {choices.filter(choice => choice.isCorrect).length ? (
                <CheckboxMultiple />
              ) : (
                <CheckboxChecked className='h-2 w-2' />
              )}
            </Badge>

            <Select open={isSelectOpen} onOpenChange={setIsSelectOpen}>
              <SelectTrigger className='w-max gap-2 text-sm text-muted-foreground shadow-none focus:ring-0'>
                <span className={cn('hidden sm:flex')}>Question</span>
                {` ${currentQuizIndex + 1} / ${quizzes.quizzes.length}`}
              </SelectTrigger>

              <SelectContent align='end'>
                <ScrollArea
                  type='always'
                  className={cn(``, { 'h-[200px] pr-3': quizzes.quizzes.length > 5 })}
                >
                  <div className='flex flex-col'>
                    {quizzes.quizzes.map((quiz, quizIdx) => (
                      <Button
                        key={quizIdx}
                        variant='ghost'
                        onClick={handleJumpToQuestion(quizIdx)}
                        className={cn(`gap-2`, {
                          'text-muted-foreground': (quiz.selectedAnswers?.length ?? 0) > 0,
                        })}
                      >
                        {quiz.selectedAnswers?.length ? <CheckboxChecked /> : <CheckboxEmpty />}
                        <span className='w-full text-left'>Question {quizIdx + 1}</span>
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
        </Card>

        <div className={cn(`flex flex-col gap-4`, { 'pointer-events-none opacity-20': isLoading })}>
          {choices.map(choice => (
            <Button
              key={choice.id}
              variant='secondary'
              onClick={() => handleSelect(currentQuizIndex, choice.id)}
              className={cn(`h-max min-h-[33px] gap-2 sm:min-h-[52px]`, {
                'ring-offset ring-2 ring-primary/50': selectedAnswers?.includes(choice.id),
              })}
            >
              {selectedAnswers?.includes(choice.id) ? <CheckboxChecked /> : <CheckboxEmpty />}
              <span className='w-full text-left'>{choice.choice}</span>
            </Button>
          ))}
        </div>

        <div className='mt-4 grid grid-cols-12 gap-4'>
          <Button
            disabled={isLoading || isFirstQuestion}
            onClick={handleNavigateBackward}
            className='col-span-2 col-start-5 bg-primary'
          >
            <ArrowLeft className={cn(``, { 'fill-muted-foreground': isLoading || isFirstQuestion })} />
          </Button>

          <Button
            disabled={isLoading || isLastQuestion}
            onClick={handleNavigateForward}
            className='col-span-2 bg-primary'
          >
            <ArrowRight className={cn(``, { 'fill-muted-foreground': isLoading || isLastQuestion })} />
          </Button>

          <Button
            disabled={isLoading || !isQuizFinished}
            onClick={handleConfirmSubmission}
            className={cn('col-span-3 col-end-13', { hidden: !isQuizFinished })}
          >
            {isLoading ? <LoadingSpinner /> : 'Submit'}
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className='pointer-events-none fixed flex h-[100dvh] w-full items-center justify-center gap-2 bg-secondary/80 pb-20'>
          <LoadingSpinner />
          <span>Submitting</span>
        </div>
      )}
    </>
  );
};

export default DemoPrompt;
