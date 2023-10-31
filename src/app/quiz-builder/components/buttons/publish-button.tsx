'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Rocket } from '@/icons/rocket';
import { toast } from 'sonner';

import useQuiz from '@/hooks/use-quiz';
import { useQuizBuilder } from '@/hooks/use-quiz-builder';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export const PublishQuizButton = () => {
  const router = useRouter();

  const { setQuizzes } = useQuiz();
  const { draftQuizzes } = useQuizBuilder();

  const isDraftQuizzesEmpty = draftQuizzes.length === 0;

  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const openPublishDialog = () => setIsPublishDialogOpen(true);

  const handleSetNewQuiz = () => {
    const doAllQuestionsHaveAtLeastOneCorrectAnswer = draftQuizzes.every(quiz =>
      quiz.choices.some(choice => choice.isCorrect)
    );

    if (!doAllQuestionsHaveAtLeastOneCorrectAnswer)
      return toast.error('All questions must have at least one correct answer.');

    const newQuizzes = draftQuizzes.map(quiz => ({ ...quiz, selectedAnswers: [] }));

    // setQuizzes(newQuizzes);
    // router.push('/demo'); // TODO: change to /quiz/[id]
  };

  return (
    <>
      <AlertDialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you ready to publish your quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              Once you publish your quiz, everyone will be able to see it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSetNewQuiz} className='flex gap-2'>
              <span>Publish</span>
              <Rocket />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button disabled={isDraftQuizzesEmpty} onClick={openPublishDialog} className='flex gap-2'>
        <span>Publish</span>
        <Rocket />
      </Button>
    </>
  );
};
