'use client';

import useQuiz from '@/hooks/use-quiz';
import Prompt from '@/components/quiz/prompt';
import Results from '@/components/quiz/results';

const Quiz = () => {
  const { quizzes, currentQuizIndex } = useQuiz();

  return (
    <>
      <div className='mb-20 flex w-full max-w-lg flex-col gap-4 pt-10 '>
        {currentQuizIndex >= quizzes.length ? <Results /> : <Prompt />}
      </div>
    </>
  );
};

export default Quiz;
