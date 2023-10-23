'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import ArrowCircle from '@/components/ui/icons/arrow-circle';
import { Rocket } from '@/components/ui/icons/rocket';

const QuizBuilderSettings = () => {
  const router = useRouter();
  const { setQuizzes } = useQuiz();
  const { draftQuizzes, resetDraftQuiz } = useQuizBuilder();

  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);

  const openResetDialog = () => setIsResetDialogOpen(true);
  const openPublishDialog = () => setIsPublishDialogOpen(true);

  const handleSetNewQuiz = () => {
    const newQuizzes = draftQuizzes.map(quiz => ({ ...quiz, selectedAnswers: [] }));
    setQuizzes(newQuizzes);
    router.push('/demo'); // TODO: change to /quiz/[id]
  };

  return (
    <>
      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-balance'>
              Are you sure you want to reset your quiz?
            </AlertDialogTitle>
            <AlertDialogDescription className='text-balance'>
              This action cannot be undone. All questions will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={resetDraftQuiz}
              className='bg-tc-destructive text-secondary-foreground'
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ready to publish?</AlertDialogTitle>
            <AlertDialogDescription>
              This will be published to the public. You can still edit your quiz after publishing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSetNewQuiz}>Publish</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div>
        <Button variant='outline' onClick={openResetDialog} className='gap-1'>
          Reset
          <ArrowCircle className='h-4 w-4' />
        </Button>
        <Button onClick={openPublishDialog} className='gap-1'>
          Publish
          <Rocket />
        </Button>
      </div>
    </>
  );
};

export default QuizBuilderSettings;
