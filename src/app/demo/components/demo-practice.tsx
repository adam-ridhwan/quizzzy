'use client';

import useQuiz from '@/hooks/use-quiz';
import DemoPrompt from '@/app/demo/components/demo-prompt';
import DemoResults from '@/app/demo/components/demo-results';

const DemoPractice = () => {
  const { quizzes, currentQuizIndex } = useQuiz();

  return (
    <>
      <main className='flex flex-1 justify-center gap-4'>
        {currentQuizIndex >= quizzes.quizzes.length ? <DemoResults /> : <DemoPrompt />}
      </main>
    </>
  );
};

export default DemoPractice;
