'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArrowCircle from '@/icons/arrow-circle';
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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const QuizBuilderSettings = () => {
  const router = useRouter();

  const { setQuizzes } = useQuiz();
  const { draftQuizzes } = useQuizBuilder();

  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const openPublishDialog = () => setIsPublishDialogOpen(true);

  const handleSetNewQuiz = () => {
    const doAllQuestionsHaveAtLeastOneCorrectAnswer = draftQuizzes.every(quiz =>
      quiz.choices.some(choice => choice.isCorrect)
    );

    if (!doAllQuestionsHaveAtLeastOneCorrectAnswer)
      return toast.error('All questions must have at least one correct answer.');

    const newQuizzes = draftQuizzes.map(quiz => ({ ...quiz, selectedAnswers: [] }));
    setQuizzes(newQuizzes);
    router.push('/demo'); // TODO: change to /quiz/[id]
  };

  return (
    <>
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
        <Button onClick={openPublishDialog} className='gap-1'>
          Publish
          <Rocket />
        </Button>
      </div>
    </>
  );
};

export default QuizBuilderSettings;
