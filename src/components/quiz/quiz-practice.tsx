'use client';

import useQuiz from '@/hooks/use-quiz';
import H1 from '@/components/ui/typography/h1';
import Prompt from '@/components/quiz/prompt';
import Results from '@/components/quiz/results';

const QuizPractice = () => {
  const { quizzes, currentQuizIndex } = useQuiz();

  return (
    <>
      <main className='flex flex-1 justify-center gap-4'>
        {currentQuizIndex >= quizzes.length ? <Results /> : <Prompt />}
      </main>
    </>
  );
};

export default QuizPractice;
