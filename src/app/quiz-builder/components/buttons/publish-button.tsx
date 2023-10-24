'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Rocket } from '@/icons/rocket';
import { toast } from 'sonner';

import useQuiz from '@/hooks/use-quiz';
import { useQuizBuilder } from '@/hooks/use-quiz-builder';
import { Button } from '@/components/ui/button';

export const PublishQuizButton = () => {
  const router = useRouter();

  const { setQuizzes } = useQuiz();
  const { draftQuizzes } = useQuizBuilder();

  const isDraftQuizzesEmpty = draftQuizzes.length === 0;

  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);

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
      <Button disabled={isDraftQuizzesEmpty} className='flex gap-2'>
        <span>Publish</span>
        <Rocket />
      </Button>
    </>
  );
};
