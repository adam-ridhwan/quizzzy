'use client';

import useQuiz from '@/hooks/use-quiz';
import Prompts from '@/components/quiz/prompts';
import Results from '@/components/quiz/results';

const Quiz = () => {
  const { quizzes, currentQuizIndex } = useQuiz();

  return (
    <>
      <div className='my-10 flex w-full max-w-lg flex-col gap-4'>
        {currentQuizIndex >= quizzes.length ? <Results /> : <Prompts />}
      </div>
    </>
  );
};

export default Quiz;
